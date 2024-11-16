const express = require('express');
const uuid = require('uuid');
const app = express();

const users = new Map()
const tokens = new Map()
const rooms = new Map()

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
  if (!req.body.token || !tokens.has(req.body.token)) {
    res.status(401).send({ msg: 'Must be logged in to create a room' })
    return
  }

  const user = tokens.get(req.body.token)
  const roomCode = generateRandomRoomCode()

  const newRoom = {
    code: roomCode,
    owner: user.username,
    participants: [user.username],
    options: [],
    votes: new Map(),
    state: 'open'
  }

  rooms.set(roomCode, newRoom)

  res.status(201).send(newRoom)
})

apiRouter.post('/room/:code/options', async (req, res) => {
  if (!req.body.token || !tokens.has(req.body.token)) {
    res.status(401).send({ msg: 'Must be logged in to add an option' })
    return
  }
  if (!req.body.option) {
    res.status(400).send({ msg: 'Missing option' })
    return
  }

  const user = tokens.get(req.body.token)
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

  if (!room.participants.includes(user.username)) {
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
  if (!req.body.token || !tokens.has(req.body.token)) {
    res.status(401).send({ msg: 'Must be logged in to lock in vote' })
    return
  }
  if (!req.body.votes) {
    res.status(400).send({ msg: 'Missing votes' })
    return
  }

  const user = tokens.get(req.body.token)
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

  if (!room.participants.includes(user.username)) {
    res.status(403).send({ msg: 'User is not allowed to participate in room' })
    return
  }

  const votes = new Map(Object.entries(req.body.votes))
  for (const key of votes.keys()) {
    room.votes.set(key, (room.votes.get(key) ?? 0) + votes.get(key))
  }
  console.log(`votes: ${JSON.stringify(Object.fromEntries(room.votes))}`)

  const isOwner = room.owner === user.username
  res.status(200).send({ resultsReady: false, isOwner })
})

apiRouter.post('/room/:code/close', async (req, res) => {
  if (!req.body.token || !tokens.has(req.body.token)) {
    res.status(401).send({ msg: 'Must be logged in to lock in vote' })
    return
  }

  const user = tokens.get(req.body.token)
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

  res.status(200).send({ resultsReady: true })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
