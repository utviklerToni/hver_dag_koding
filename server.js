const express = require('express');
const connectDB = require('./config/db');

// initializing express
const app = express();

// connecting to Database
connectDB();

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
