const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
        paymentId: String,
        service: {
            type: Schema.Types.ObjectId,
            ref: "Service",
            trim: true,
        },
        payment: {
            id: {
                type: String,
                index: {
                    unique: true,
                    dropDups: true
                }
            },
            type: {
                type: String
            },
            card: String
        },
        shipment: {
            name: { type: String, trim: true },
            email: String,
            phone: String,
            address: String
        },
        amount: {
            type: Number
        },
        status: String
    },
    { timestamps: true }
);

module.exports = model("Order", orderSchema);