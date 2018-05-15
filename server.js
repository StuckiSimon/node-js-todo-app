'use strict';

const Hapi = require('hapi');
const uuid = require('uuid');
const categories = require('./categories');
const todos = require('./todos');
const PORT = process.env.PORT || 8000

// Create a server with a host and port
const server = Hapi.server({
  port: PORT
});

// Add the route
server.route({
  method: 'GET',
  path: '/categories',
  handler: function (request, h) {
    return categories;
  }
});

server.route({
  method: 'GET',
  path: '/todos',
  handler: function (request, h) {
    return todos
  }
})

server.route({
  method: 'POST',
  path: '/todos',
  handler: function (request, h) {
    const payload = JSON.parse(request.payload)
    const {
      categoryId,
      desc,
      dueDate,
      text
    } = payload;

    const id = uuid();
    const todo = {
      id,
      categoryId,
      desc,
      dueDate,
      text
    };
    todos.push(todo)

    return todo;
  }
})

// Start the server
async function start() {

  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

start();