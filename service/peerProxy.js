const DB = require('./database.js');
const { WebSocketServer } = require('ws');
const uuid = require('uuid');

const authCookieName = 'token';

function onSocketError(err) {
  console.error(err)
}

async function authenticate(request, next) {
  const authToken = request.rawHeaders.find(h => h.startsWith(authCookieName))?.split('=')[1]
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next(undefined, user);
  } else {
    next('Not Authorized', undefined)
  }
}

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (request, socket, head) => {
    socket.on('error', onSocketError)

    authenticate(request, function next(err, user) {
      if (err || !user) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }

      socket.removeListener('error', onSocketError);

      wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request, user);
      });
    })
  });

  let connections = [];

  wss.on('connection', (ws, _request, user) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws, user: user.username };
    connections.push(connection);

    // Forward messages to everyone except the sender
    ws.on('message', async function message(data) {
      console.log(`Recieved ws message from ${connection.user}: ${data}`)
      const dataParsed = JSON.parse(data)
      const room = await DB.getRoomById(dataParsed.room)
      if (!room) {
        console.warn(`no room with id ${dataParsed.room}`)
        return
      }
      if (!room.state === 'open') {
        console.warn('room is closed')
        return
      }
      if (!room.participants.includes(connection.user)) {
        console.warn(`room does not include user ${connection.user}`)
        return
      }

      const newOption = dataParsed.option
      if (room.options.map(opt => opt.toLowerCase()).includes(newOption.toLowerCase())) {
        console.warn('room already includes option')
        return
      }

      if (await DB.addOptionToRoom(dataParsed.room, newOption)) {
        console.log('added option to room. sending notification...')
        connections.filter(c => room.participants.includes(c.user)).forEach((c) => {
          console.log(`sending to ${c.user}`)
          c.ws.send(JSON.stringify({ options: [...room.options, newOption] }));
        });
      }
    });

    ws.on('close', () => {
      const pos = connections.findIndex((o, i) => o.id === connection.id);

      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  setInterval(() => {
    connections.forEach((c) => {
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}

module.exports = { peerProxy };
