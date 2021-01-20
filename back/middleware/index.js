module.exports = (app) => {
  const express = require('express');
  const morgan = require('morgan');
  const cors = require('cors');
  const dbConnection = require('./db-connect');

  app.use(cors());
  app.use(morgan('dev'));

  // Body POST запросов
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};
