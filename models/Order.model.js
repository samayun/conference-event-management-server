const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
        serviceId: {
            type: Schema.Types.ObjectId,
            ref: "Service",
            trim: true,
        },
        serviceName: {
            type: String,
            trim: true,
        },
        name: String,
        email: {
            type: String,
            trim: true,
        },
        price: {
            type: String
        },
        status: String
    },
    { timestamps: true }
);

module.exports = model("Order", orderSchema);