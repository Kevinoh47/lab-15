'use strict';

// 3rd Party Resources
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import https from 'https';
import fs from 'fs';
import path from 'path';

// Esoteric Resources
import errorHandler from './middleware/error.js';
import notFound from './middleware/404.js';
import apiRouter from './api/v1.js';
import authRouter from './auth/router.js';
import auth from './auth/middleware.js';

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use(authRouter);
app.use(apiRouter);

app.get('/', auth(), (req,res) => {
  res.send('home route -- anyone with an auth can access this route.');
});

app.get('/s', auth('create'), (req,res) => {
  res.send('creating/saving something...');
});

app.get('/d', auth('delete'), (req,res) => {
  res.send('deleting something... ');
});

// Catchalls
app.use(notFound);
app.use(errorHandler);

let isRunning = false;

module.exports = {
  server: app,
  start: (port) => {
    if( ! isRunning ) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server Up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  },
};
