const { MongoClient, ObjectId } = require('mongodb');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const dbconfig = require('./dbconfig.json')

const dbUrl = dbconfig.url

const client = new MongoClient(dbUrl)
const db = client.db('quikvote')
const userCollection = db.collection('user')
const roomsCollection = db.collection('room')
const historyCollection = db.collection('history')

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

async function createRoom(creatorUsername) {
  const newRoom = {
    code: generateRandomRoomCode(),
    owner: creatorUsername,
    participants: [creatorUsername],
    options: [],
    votes: [],
    state: 'open'
  }
  await roomsCollection.insertOne(newRoom)

  return newRoom.code
}

async function getRoom(roomCode) {
  return await roomsCollection.findOne({ code: roomCode })
}

async function addParticipantToRoom(roomCode, username) {
  const result = await roomsCollection.updateOne(
    { code: roomCode, state: 'open' },
    {
      $addToSet: {
        participants: username
      }
    }
  )
  return result.acknowledged && result.matchedCount === 1
}

async function addOptionToRoom(roomCode, option) {
  const result = await roomsCollection.updateOne(
    { code: roomCode, state: 'open' },
    {
      $addToSet: {
        options: option
      }
    }
  )
  return result.acknowledged && result.matchedCount === 1
}

async function submitUserVotes(roomCode, username, votes) {
  const result = await roomsCollection.updateOne(
    { code: roomCode, "votes.username": { $ne: username }},
    {
      $push: {
        votes: {
          username,
          votes
        }
      }
    }
  )
  return result.acknowledged && result.matchedCount === 1
}

async function closeRoom(roomCode) {
  const result = await roomsCollection.updateOne(
    { code: roomCode },
    {
      $set: {
        state: 'closed'
      }
    }
  )
  return result.acknowledged && result.matchedCount === 1
}

async function deleteRoom(roomId) {
  const result = await roomsCollection.deleteOne(new ObjectId(roomId))
  return result.acknowledged && result.deletedCount == 1
}

async function createResult(username, sortedOptions) {
  const result = {
    owner: username,
    sortedOptions,
    timestamp: Date.now()
  }

  const insertResult = await historyCollection.insertOne(result)
  return {
    ...result,
    _id: insertResult.insertedId
  }
}

async function getResult(resultId) {
  return await historyCollection.findOne(new ObjectId(resultId))
}

async function getHistory(username) {
  const cursor = historyCollection.find(
    { owner: username },
    {
      sort: { timestamp: -1 }
    }
  )
  return await cursor.toArray()
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  createRoom,
  getRoom,
  addParticipantToRoom,
  addOptionToRoom,
  submitUserVotes,
  closeRoom,
  deleteRoom,
  createResult,
  getResult,
  getHistory
};
