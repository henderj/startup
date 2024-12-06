const DB = require('./database.js');
const { WebSocketServer } = require('ws');
const { calculateVoteResult } = require('./calculateVoteResult.js')
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
      const dataParsed = JSON.parse(data)
      console.log(`Recieved ws message from ${connection.user}: ${JSON.stringify(dataParsed, undefined, 4)}`)
      if (dataParsed.type == 'new_option') {
        handleNewOption(dataParsed, connection, connections)
      } else if (dataParsed.type == 'lock_in') {
        handleLockIn(dataParsed, connection, connections)
      } else if (dataParsed.type == 'close_room') {
        handleCloseRoom(dataParsed, connection, connections)
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

async function handleNewOption(event, connection, connections) {
  const room = await DB.getRoomById(event.room)
  if (!room) {
    console.warn(`no room with id ${event.room}`)
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

  const newOption = event.option
  if (room.options.map(opt => opt.toLowerCase()).includes(newOption.toLowerCase())) {
    console.warn('room already includes option')
    return
  }

  if (await DB.addOptionToRoom(event.room, newOption)) {
    connections.filter(c => room.participants.includes(c.user)).forEach((c) => {
      c.ws.send(JSON.stringify({ type: 'options', options: [...room.options, newOption] }));
    });
  }
}

async function handleLockIn(event, connection, connections) {
  const user = connection.user
  const roomId = event.room
  const room = await DB.getRoomById(roomId)

  if (!room) {
    console.warn(`no room with id ${event.room}`)
    return
  }

  if (!room.state === 'open') {
    console.warn('room is closed')
    return
  }

  if (!room.participants.includes(user)) {
    console.warn(`room does not include user ${connection.user}`)
    return
  }

  await DB.submitUserVotes(roomId, user, event.votes)

  const new_room = await DB.getRoomById(roomId)
  if (new_room.votes.length == new_room.participants.length) {
    // all users have voted
    await DB.closeRoom(roomId)

    const sortedOptions = calculateVoteResult(new_room.votes)
    const result = await DB.createResult(user, sortedOptions)
    connections.filter(c => new_room.participants.includes(c.user)).forEach((c) => {
      c.ws.send(JSON.stringify({ type: 'results-available', id: result._id }));
    });
  }
}

async function handleCloseRoom(event, connection, connections) {
  const user = connection.user
  const roomId = event.room
  const room = await DB.getRoomById(roomId)

  if (!room) {
    console.warn(`no room with id ${event.room}`)
    return
  }

  if (!room.state === 'open') {
    console.warn('room is closed')
    return
  }

  if (room.owner !== user) {
    console.warn('user is not owner of room')
    return
  }

  await DB.closeRoom(roomId)

  const sortedOptions = calculateVoteResult(room.votes)
  const result = await DB.createResult(user, sortedOptions)
  connections.filter(c => room.participants.includes(c.user)).forEach((c) => {
    c.ws.send(JSON.stringify({ type: 'results-available', id: result._id }));
  });
}

module.exports = { peerProxy };
