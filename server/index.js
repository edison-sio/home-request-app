const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const mongoose = require('mongoose');

const { createUser } = require('./functions/utils');

// Initialize database server connection before the server starts
// const uri = 'mongodb://edisonsio:edisonsio@localhost:27017';
const uri = 'mongodb://root:example@127.0.0.1:27017';
mongoose.connect(uri)
    .then((req, res) => {
        console.log('Connected to database server');
    })
    .catch((e) => {
        console.log(e);
    })

// MongoDB schema model
const UserModel = require('./models/User');

// Create an admin user for the server
adminUsername = 'admin';
adminPassword = 'password';
createUser(adminUsername, adminPassword, 0);

// Main app API server
const app = express();

app.use(bodyParser.json());
// app.use(cors);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const authRouter = require('./routers/auth.js');
app.use('/auth', authRouter);

const userRouter = require('./routers/user.js');
app.use('/user', userRouter);

port = 5001;
app.listen(port, () => {
    console.log('Server started');
});
