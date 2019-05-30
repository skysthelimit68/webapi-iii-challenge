const express = require("express");
const cors = require('cors');
const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");

const server = express();

server.use(express.json(), cors(), logger)
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', async (req, res) => {
  try {
    await res.status(200).json({messageOfTheDay: process.env.MOTD})
  }
  catch(error) {
    res.status(500).json(error)
  }
});

//custom middleware

function logger(req, res, next) {
  console.log(`
  ${req.method} from ${req.originalUrl} at ${Date()}
  `)
  next();
};

module.exports = server;
