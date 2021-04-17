const { Schema, model } = require('mongoose');

const ModelSchema = new Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 30
    },
    image: {
        type: String,
        default: "https://blog-node-exp.herokuapp.com/uploads/default.png"
    },
    email: {
        type: String,
        trim: true
    }
})

module.exports = model('Admin', ModelSchema)