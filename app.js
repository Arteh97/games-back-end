const express = require('express');
const apiRouter = require('./routers/api-router');
const app = express(); 
const { error500, invalidPath, customErrors, psqlErrors} = require('./error-handlng');

app.use(express.json());

app.use("/api", apiRouter);
app.all("/*", invalidPath);

app.use(error500);
app.use(customErrors);
app.use(psqlErrors);
// app.use(serverError);



module.exports = app;