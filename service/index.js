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
    options: []
  }

  rooms.set(roomCode, newRoom)

  res.status(201).send(newRoom)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
