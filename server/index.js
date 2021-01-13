// Importing necessary modules
const express = require('express');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

// Importing necessary routes
// tdb

// Invoking modules and defining port
const app = express();
const port = process.env.PORT || 3000;
app.use(helmet());

// Basic Flow Test
app.use((req, res, next) => {
  console.log(`
    ****** FLOW TEST ******
    METHOD: ${req.method}
    PATH: ${req.path}
  `);
  return next();
});

// Parsing incoming data
app.use(express.json());
app.use(express.urlencoded());

// Hosting static files
app.use(express.static(path.join(__dirname, 'public')));

// Setting up Routers
// app.use(path, variable based on import)
app.get('/', (req, res) => {
  console.log(path.join(__dirname, '../index.html'));
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// Route to handle 404 errors
app.use((req, res) => {
  res.status(404).send("Sorry can't find the webpage your looking for");
});

// Error hander
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listener
app.listen(port, () => {
  console.log('Post is listening');
});
