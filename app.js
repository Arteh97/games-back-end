const express = require('express');
const apiRouter = require('./routers/api-router');
const app = express(); 
const { invalidPath, customErrors, psqlErrors, error500} = require('./error-handlng');

app.use(express.json());

app.use("/api", apiRouter);
app.all("/*", invalidPath);

app.use(customErrors);
app.use(psqlErrors);
app.use(error500);



module.exports = app;