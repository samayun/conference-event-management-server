const { Schema, model } = require('mongoose');

const ModelSchema = new Schema(
    {
        email: String
    },
    { timestamps: true });

module.exports = model('Admin', ModelSchema)