const express = require('express');
const clientRouter = require('./routes/clientRouter');
const app = express();

app.use(express.json());
app.use('/api/v1/client', clientRouter);

// Handles all undefined routes
app.all('*', (req, res) => {
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on this server`
    });
});

module.exports = app;
