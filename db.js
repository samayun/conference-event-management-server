const mongoose = require('mongoose');
const config = require('config');
const DB_URI = config.get('db-uri');

async function connectDB() {
    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        return Promise.resolve((`${DB_URI} DB Connected`))
    } catch (error) {
        return Promise.reject(error.message);
    }
}

module.exports = connectDB
