// Importing necessary modules
const express = require('express');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoute = require('./routes/apiRouter');

// Invoking modules and defining port
const app = express();
const port = process.env.PORT || 3000;
app.use(helmet());
app.use(cors());

// Connect to MongoDB
const db = mongoose.connection;
mongoose.connect('mongodb://localhost/solo_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('We are connect to the DB');
});

// Parsing incoming data
app.use(express.json());
app.use(express.urlencoded());

// Basic Flow Test
app.use((req, res, next) => {
  console.log(`
    ****** FLOW TEST ******
    METHOD: ${req.method}
    PATH: ${req.path}
  `);
  return next();
});

// Hosting static files
app.use('/build', express.static(path.join(__dirname, '../build')));

// Setting up Routers
// app.use(path, variable based on import)
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// Importing necessary routes
app.use('/api', apiRoute);

// Route to handle 404 errors
app.use((req, res) => {
  res.status(404).send("Sorry can't find the webpage your looking for");
});

// Error hander
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!'", err);
});

// Listener
app.listen(port, () => {
  console.log('Port is listening');
});
