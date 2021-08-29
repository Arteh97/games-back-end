const { invalidPath, customErrors, psqlErrors, error500} = require('./errors/error-handling');
const cors = require('cors');
const express = require('express');
const apiRouter = require('./routers/api-router');

const app = express(); 

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);
app.all("/*", invalidPath);
app.use(customErrors);
app.use(psqlErrors);
app.use(error500);

module.exports = app;