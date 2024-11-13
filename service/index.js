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
  let user = users[req.body.email];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
    return
  }
  if (!req.body.email) {
    res.status(400).send('Bad Request: Missing email')
    return
  }
  if (!req.body.username) {
    res.status(400).send('Bad Request: Missing username')
    return
  }
  if (!req.body.password) {
    res.status(400).send('Bad Request: Missing password')
    return
  }
  user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
  users[user.email] = user;

  res.send({ token: user.token });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
