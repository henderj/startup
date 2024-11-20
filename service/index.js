const express = require('express');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const DB = require('./database.js');

const app = express();

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/register', async (req, res) => {
  if (!req.body.username) {
    res.status(400).send({ msg: 'Missing username' })
    return
  }
  if (!req.body.password) {
    res.status(400).send({ msg: 'Missing password' })
    return
  }

  let user = await DB.getUser(req.body.username)
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
    return
  }

  user = await DB.createUser(req.body.username, req.body.password)
  setAuthCookie(res, user.token);

  res.status(201).send({ username: user.username });
});

apiRouter.post('/login', async (req, res) => {
  if (!req.body.username) {
    res.status(400).send({ msg: 'Missing username' })
    return
  }
  if (!req.body.password) {
    res.status(400).send({ msg: 'Missing password' })
    return
  }

  const user = await DB.getUser(req.body.username)

  if (user && await bcrypt.compare(req.body.password, user.password)) {
    setAuthCookie(res, user.token);
    res.status(200).send({ username: user.username });
  } else {
    res.status(400).send({ msg: 'Invalid username and/or password' })
  }
});

apiRouter.delete('/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
})

async function getUserFromRequest(req) {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  return user
}

apiRouter.get('/me', async (req, res) => {
  const user = await getUserFromRequest(req)
  if (user) {
    res.status(200).send({ username: user.username })
  } else {
    res.status(204).end()
  }
})

const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const user = await getUserFromRequest(req)
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

secureApiRouter.post('/room', async (req, res) => {
  const user = await getUserFromRequest(req)

  const newRoomCode = await DB.createRoom(user.username)

  res.status(201).send({ code: newRoomCode })
})

secureApiRouter.get('/room/:code', async (req, res) => {
  const roomCode = req.params.code
  const room = await DB.getRoom(roomCode)

  if (!room) {
    res.status(404).send({ msg: `Room ${roomCode} does not exist` })
    return
  }

  if (!room.state === 'open') {
    res.status(409).send({ msg: 'Room is not open' })
    return
  }

  res.status(200).send(room)
})

secureApiRouter.post('/room/:code/join', async (req, res) => {
  const user = await getUserFromRequest(req)
  const roomCode = req.params.code
  const room = await DB.getRoom(roomCode)

  if (!room) {
    res.status(404).send({ msg: `Room ${roomCode} does not exist` })
    return
  }

  if (!room.state === 'open') {
    res.status(409).send({ msg: 'Room is not open' })
    return
  }

  const success = await DB.addParticipantToRoom(roomCode, user.username)

  if (success) {
    res.status(200).send()
  } else {
    res.status(500).send({ msg: 'error adding participant' })
  }
})

secureApiRouter.post('/room/:code/options', async (req, res) => {
  if (!req.body.option) {
    res.status(400).send({ msg: 'Missing option' })
    return
  }

  const user = await getUserFromRequest(req)
  const roomCode = req.params.code
  const room = await DB.getRoom(roomCode)

  if (!room) {
    res.status(404).send({ msg: `Room ${roomCode} does not exist` })
    return
  }

  if (!room.state === 'open') {
    res.status(409).send({ msg: 'Room is not open' })
    return
  }

  if (!room.participants.includes(user.username)) {
    res.status(403).send({ msg: 'User is not allowed to add options to room' })
    return
  }

  const newOption = req.body.option
  if (room.options.map(opt => opt.toLowerCase()).includes(newOption.toLowerCase())) {
    res.status(409).send({ msg: 'Option already exists' })
    return
  }

  await DB.addOptionToRoom(roomCode, newOption)
  const newOptions = (await DB.getRoom(roomCode)).options

  res.status(201).send({ options: newOptions })
})

secureApiRouter.post('/room/:code/lockin', async (req, res) => {
  if (!req.body.votes) {
    res.status(400).send({ msg: 'Missing votes' })
    return
  }

  const user = await getUserFromRequest(req)
  const roomCode = req.params.code
  const room = await DB.getRoom(roomCode)

  if (!room) {
    res.status(404).send({ msg: `Room ${roomCode} does not exist` })
    return
  }

  if (!room.state === 'open') {
    res.status(409).send({ msg: 'Room is not open' })
    return
  }

  if (!room.participants.includes(user.username)) {
    res.status(403).send({ msg: 'User is not allowed to participate in room' })
    return
  }

  const success = await DB.submitUserVotes(roomCode, user.username, req.body.votes)

  const isOwner = room.owner === user.username

  if (success) {
    res.status(200).send({ resultsReady: false, isOwner })
  } else {
    res.status(400).send({ msg: 'User has already voted' })
  }
})

secureApiRouter.post('/room/:code/close', async (req, res) => {
  const user = await getUserFromRequest(req)
  const roomCode = req.params.code
  const room = rooms.get(roomCode)

  if (!room) {
    res.status(404).send({ msg: `Room ${roomCode} does not exist` })
    return
  }
  const isOwner = room.owner === user.username

  if (!isOwner) {
    res.status(403).send({ msg: 'User is not owner of room' })
    return
  }

  if (!room.state === 'open') {
    res.status(409).send({ msg: 'Room is not open' })
    return
  }

  room.state = 'closed'

  const totals = Array.from(room.votes)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key)
  const resultObj = {
    results: totals,
    timestamp: Date.now()
  }
  if (results.has(room.owner)) {
    results.get(room.owner).push(resultObj)
  } else {
    results.set(room.owner, [resultObj])
  }

  res.status(200).send({ resultsReady: true })
})

secureApiRouter.get('/room/:code/results', async (req, res) => {
  const roomCode = req.params.code
  const room = rooms.get(roomCode)

  if (!room) {
    res.status(404).send({ msg: `Room ${roomCode} does not exist` })
    return
  }

  if (!room.state === 'closed') {
    res.status(409).send({ msg: 'Room must be closed' })
    return
  }

  const results = Array.from(room.votes)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key)


  res.status(200).send({ results })
})

secureApiRouter.get('/history', async (req, res) => {
  const user = await getUserFromRequest(req)

  const history = results.get(user.username)
    .sort((a, b) => b.timestamp - a.timestamp)

  res.status(200).send({ history })
})

app.use(function(err, _req, res, _next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
