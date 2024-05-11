const express = require('express');
const clientRouter = require('./routes/clientRouter');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, authorization'
    );
    next();
});

app.use('/api/v1/client', clientRouter);

// Handles all undefined routes
app.all('*', (req, res) => {
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on this server`
    });
});

module.exports = app;
