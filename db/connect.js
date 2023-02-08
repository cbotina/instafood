const mongoose = require('mongoose').set('strictQuery', false);

const connectDB = (url) => mongoose.connect(url, {});

module.exports = connectDB;
