# TODO List Backend
This project is REST api that performs CRUD operations on Todo List data stored in mongoDB database.

# Technologies used
The backend is built using node.js and express.js. In this project mongoDB is use as a database and Mongoose is use for ODM.

# Installation
before installing this project , make sure that you have [node.js](https://nodejs.dev/en/download/) in your machine. Fork or Clone this repository and then run following commands in the terminal at root directory to run application
```
npm install
npm run start
```
`npm install` will install all dependencies required for project and `npm run start` will run the application.

# Feutures
- Get Tasks
- Get Task by ID
- Update Task
- Delete Task

# API Endpoint

## `GET /todos`
get request to this endpoint will returns a response with 10 todos.

## `GET /todos?`
get request to this endpoint will return a response with specified queries in request.
for example. `GET /todos?isComplete=true&description=Task 1` will return a response with task having **description** *Task 1* and **isComplete** *true*

