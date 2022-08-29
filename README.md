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

# Fetch tasks
### `GET /todos`
get request to this endpoint will returns a response with first 10 tasks

### `GET /todos?`
get request to this endpoint will return a response with specified queries in request.
for example `GET /todos?isComplete=true&description=Task 1` will return a response with task having **description** *Task 1* and **isComplete** *true*

### `GET /todos/TaskID`
this endpoint requires a **TaskId** to be passed in URL. If task with a given **TaskId** exits , you will get response containing the task with **TaskId** you passed.
If task does not exists you will get response with `404` status code.

# Post Task

### `POST /todos`
This endpoint requires a body to be passed along with the request. If a valid body is passed with the request, a new task will be created with the body passed.
If not, you get the response with `400 Bad Request` status code.

Sample body
```
"description":"Task description goes here",
"status":"status of task",
"isComplete": true|false
```
it's mandatory to pass description within a body.if you provide only description of task then application will assign **"NotStarted"** to "status" and **false** to "isComplete".

# Delete Task

### DELETE /todos/TaskId
this endpoint requires a **TaskId** to be passed in URL. If task with a given **TaskId** exits , you will get response with a message that `task with id TaskID is deleted`
If task does not exists you will get response with `404` status code.

# Update Task

### PATCH /todos/TaskId
This endpoint requires a **body** to be passed along with **TaskId** the request.First , it will check If task with a given **TaskId** exits ,
If task does not exists you will get response with `404` status code.If task exists , application will check if body contains atleast one of the field specified in sample body show below.If not, you get the response with `400 Bad Request` status code.Else, you will get response with `updatedTask and 200` status code

Sample body
```
"description":"updated Task description goes here",
"status":"status of task",
"isComplete": true|false
```
it's mandatory to pass atleast one property specified in **Sample body**.

# Addition Details
- Uses MVC Architecture
- Validates Request
- Use MongoDB to store tasks

# Project Directory
```
.
├── controller
|   └──todoController.ts
├── dist
├── interfaces
|   └──CustomRequest.ts
|   └──configRequests.ts
├── middlewares
|   └──sendErrorResponse.ts
|   └──sendResponse.ts
|   └──taskValidators.ts
├── migrations
|   └──20220817070214-addTimestamps.js
├── models
|   └──Task.ts
├── routes
|   └──todoRouter.ts
├── utils
|   └──AppError.ts
├── .env
├── .gitignore
├── README.md
├── app.ts
├── migrate-mongo-config.js
├── package-lock.json
├── package.json
├── server.ts
├── tsconfig.json

```
