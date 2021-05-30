const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI || 'mongodb://localhost/test2';

mongoose.connect( DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', () => {
    console.log("Error in connecting to the database");
    return;
});

db.once('open', function() {
    console.log("Connected successfully to the database");
});

module.exports = { db };