const express = require("express");

const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");

const server = express();

server.use(express.json(), logger)
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`
  ${req.method} from ${req.originalUrl} at ${Date()}
  `)
  next();
};

module.exports = server;
