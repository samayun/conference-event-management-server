const { Schema, model } = require("mongoose");

const serviceSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        price: String,
        description: String,
        events: [Schema.Types.ObjectId],
        image: String,
    },
    { timestamps: true }
);

module.exports = model("Service", serviceSchema);