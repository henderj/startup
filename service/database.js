const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const dbconfig = require('./dbconfig.json')

const dbUrl = dbconfig.url

const client = new MongoClient(dbUrl)
const db = client.db('quikvote')
const userCollection = db.collection('user')
const roomsCollection = db.collection('room')

async function testConnection() {
  await client.connect()
  await db.command({ ping: 1 })
}
testConnection()
  .then(() => console.log('db connected'))
  .catch(ex => {
    console.log(`Unable to connect to database with ${dbUrl} because ${ex.message}`);
    process.exit(1)
  })

function getUser(username) {
  return userCollection.findOne({ username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token });
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser
};
