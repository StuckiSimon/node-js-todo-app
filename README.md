# Todo App
This Node.js application runs on heroku.

## Workflow
`npm install` to install dependencies.

`node run start` to run the app locally.

`git push heroku master` to sync the master branch on heroku instance.

`heroku ps:scale web=1` to start the application.

`heroku ps:scale web=0` to stop the application.

The app runs on `https://node-js-todo-app.herokuapp.com/todos`