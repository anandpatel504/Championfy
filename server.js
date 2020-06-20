const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const axios = require('axios');
const CircularJSON = require('circular-json');
app.use(express.json());
const verifyToken = require("./auth/jwtVerify");

const Knex = require('knex')
const connection = require('./knexfile')
const knexConnection = Knex(connection["development"])

const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY;

// route to register.js
const register = express.Router();
app.use("/", register);
require("./routes/register")(register, knexConnection);

// route to login.js
const login = express.Router();
app.use("/", login);
require("./routes/login")(login, jwt, knexConnection, SECRET_KEY);

// route to searchUsers.js
const searchUsers = express.Router();
app.use("/", searchUsers);
require("./routes/searchUsers")(searchUsers, axios, CircularJSON);

// route to userProfile.js
const userProfile = express.Router();
app.use("/", userProfile);
require("./routes/userProfile")(userProfile, axios, CircularJSON);

// the port listener
const server = app.listen(PORT, () => {
    console.log("Server is running on port......");
    console.log(PORT);
})