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

const config = {
  cors: {
      origin: ['*']
  }
};

// Add the route
server.route({
  method: 'GET',
  path: '/categories',
  config,
  handler: function (request, h) {
    return categories;
  }
});

server.route({
  method: 'GET',
  path: '/todos',
  config,
  handler: function (request, h) {
    return todos
  }
})

server.route({
  method: 'POST',
  path: '/todos',
  config,
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

server.route({
  method: 'PATCH',
  path: '/todos/{id}',
  config,
  handler: function (request, h) {
    const payload = JSON.parse(request.payload)
    const {
      categoryId,
      desc,
      dueDate,
      text,
      done
    } = payload;
    const id = request.params.id;

    const todo = todos.find(todo => todo.id === id);
    const index = todos.indexOf(todo);
    todos[index] = {
      id,
      categoryId,
      desc,
      dueDate,
      text,
      done
    };

    return todos[index];
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