const express = require('express');
const uuid = require('uuid');
const app = express();

const users = {};

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

  let user = users[req.body.username];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
    return
  }
  user = {
    username: req.body.username,
    password: req.body.password,
    token: uuid.v4()
  };
  users[user.username] = user;

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

  let user = users[req.body.username];
  if (user && user.password === req.body.password) {
    user.token = uuid.v4()
    res.send({ token: user.token });
  } else {
    res.status(400).send({ msg: 'Invalid username and/or password' })
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
