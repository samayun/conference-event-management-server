const { Schema, model } = require("mongoose");

const ModelSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        designation: String,
        description: String,
        rating: String
    },
    { timestamps: true }
);

module.exports = model("Review", ModelSchema);