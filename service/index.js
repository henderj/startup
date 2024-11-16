const express = require('express');
const uuid = require('uuid');
const app = express();

const users = new Map()
const tokens = new Map()
const rooms = new Map()
const results = new Map()

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

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

  let user = users.get(req.body.username);
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
    return
  }
  user = {
    username: req.body.username,
    password: req.body.password,
    token: uuid.v4()
  };
  users.set(user.username, user)
  tokens.set(user.token, user)

  res.send({ token: user.token });
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

  let user = users.get(req.body.username);
  if (user && user.password === req.body.password) {
    if (user.token) {
      tokens.delete(user.token)
    }
    user.token = uuid.v4()
    tokens.set(user.token, user)
    res.send({ token: user.token });
  } else {
    res.status(400).send({ msg: 'Invalid username and/or password' })
  }
});

function generateRandomRoomCode() {
  const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  const numeric = ['2', '3', '4', '5', '6', '7', '8', '9']
  const alphanumeric = alpha.concat(numeric)

  let code = ''
  let numChars = 4

  for (let i = 0; i < numChars; i++) {
    const rand = Math.floor(Math.random() * alphanumeric.length)
    code += alphanumeric[rand]
  }
  return code
}

apiRouter.post('/room', async (req, res) => {
  const token = req.get('Authorization')?.split('Bearer ')[1]
  if (!token || !tokens.has(token)) {
    res.status(401).send({ msg: 'Must be logged in' })
    return
  }

  const user = tokens.get(token)
  const roomCode = generateRandomRoomCode()

  const newRoom = {
    code: roomCode,
    owner: user.username,
    participants: new Set([user.username]),
    options: [],
    votes: new Map(),
    state: 'open'
  }

  rooms.set(roomCode, newRoom)

  res.status(201).send(newRoom)
})

apiRouter.get('/room/:code', async (req, res) => {
  const token = req.get('Authorization')?.split('Bearer ')[1]
  if (!token || !tokens.has(token)) {
    res.status(401).send({ msg: 'Must be logged in' })
    return
  }

  const roomCode = req.params.code
  const room = rooms.get(roomCode)

  if (!room) {
    res.status(404).send({ msg: `Room ${roomCode} does not exist` })
    return
  }

  if (!room.state === 'open') {
    res.status(409).send({ msg: 'Room is not open' })
    return
  }

  res.status(200).send()
})

apiRouter.post('/room/:code/join', async (req, res) => {
  const token = req.get('Authorization')?.split('Bearer ')[1]
  if (!token || !tokens.has(token)) {
    res.status(401).send({ msg: 'Must be logged in' })
    return
  }

  const user = tokens.get(token)
  const roomCode = req.params.code
  const room = rooms.get(roomCode)

  if (!room) {
    res.status(404).send({ msg: `Room ${roomCode} does not exist` })
    return
  }

  if (!room.state === 'open') {
    res.status(409).send({ msg: 'Room is not open' })
    return
  }

  room.participants.add(user.username)

  res.status(200).send()
})

apiRouter.post('/room/:code/options', async (req, res) => {
  const token = req.get('Authorization')?.split('Bearer ')[1]
  if (!token || !tokens.has(token)) {
    res.status(401).send({ msg: 'Must be logged in' })
    return
  }
  if (!req.body.option) {
    res.status(400).send({ msg: 'Missing option' })
    return
  }

  const user = tokens.get(token)
  const roomCode = req.params.code
  const room = rooms.get(roomCode)

  if (!room) {
    res.status(404).send({ msg: `Room ${roomCode} does not exist` })
    return
  }

  if (!room.state === 'open') {
    res.status(409).send({ msg: 'Room is not open' })
    return
  }

  if (!room.participants.has(user.username)) {
    res.status(403).send({ msg: 'User is not allowed to add options to room' })
    return
  }

  const newOption = req.body.option
  if (room.options.map(opt => opt.toLowerCase()).includes(newOption.toLowerCase())) {
    res.status(409).send({ msg: 'Option already exists' })
    return
  }

  room.options.push(req.body.option)

  res.status(201).send({ options: room.options })
})

apiRouter.post('/room/:code/lockin', async (req, res) => {
  const token = req.get('Authorization')?.split('Bearer ')[1]
  if (!token || !tokens.has(token)) {
    res.status(401).send({ msg: 'Must be logged in' })
    return
  }

  if (!req.body.votes) {
    res.status(400).send({ msg: 'Missing votes' })
    return
  }

  const user = tokens.get(token)
  const roomCode = req.params.code
  const room = rooms.get(roomCode)

  if (!room) {
    res.status(404).send({ msg: `Room ${roomCode} does not exist` })
    return
  }

  if (!room.state === 'open') {
    res.status(409).send({ msg: 'Room is not open' })
    return
  }

  if (!room.participants.has(user.username)) {
    res.status(403).send({ msg: 'User is not allowed to participate in room' })
    return
  }

  const votes = new Map(Object.entries(req.body.votes))
  for (const key of votes.keys()) {
    room.votes.set(key, (room.votes.get(key) ?? 0) + votes.get(key))
  }

  const isOwner = room.owner === user.username
  res.status(200).send({ resultsReady: false, isOwner })
})

apiRouter.post('/room/:code/close', async (req, res) => {
  const token = req.get('Authorization')?.split('Bearer ')[1]
  if (!token || !tokens.has(token)) {
    res.status(401).send({ msg: 'Must be logged in' })
    return
  }

  const user = tokens.get(token)
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

apiRouter.get('/room/:code/results', async (req, res) => {
  const token = req.get('Authorization')?.split('Bearer ')[1]
  if (!token || !tokens.has(token)) {
    res.status(401).send({ msg: 'Must be logged in' })
    return
  }

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

apiRouter.get('/history', async (req, res) => {
  const token = req.get('Authorization')?.split('Bearer ')[1]
  if (!token || !tokens.has(token)) {
    res.status(401).send({ msg: 'Must be logged in' })
    return
  }

  const user = tokens.get(token)

  const history = results.get(user.username)
    .sort((a, b) => b.timestamp - a.timestamp)

  res.status(200).send({ history })
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
