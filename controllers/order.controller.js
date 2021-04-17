const Order = require("../models/Order.model");

// POST https://conference-events.herokuapp.com/orders
exports.create = async (req, res, next) => {
    try {
        //  serviceId , serviceName , name , email , price , status
        let order = new Order(req.body);
        let response = await order.save();
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};
// GET https://conference-events.herokuapp.com/orders
exports.read = async (req, res, next) => {
    try {
        let orders = await Order.find({});
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

exports.findByEmail = async (req, res, next) => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions

        let orders = await Order.find({ email: req.query.email });
        if (orders) {
            res.json(orders);
        } else {
            next(new Error(`${email} has no order`));
        }
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { email } = req.query;
        if (!email) {
            next(new Error(`Please login with your email address`));
        }
        let updatedorder = await Order.findOneAndUpdate(
            { email },
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedorder);
    } catch (error) {
        next(error);
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        let order = await Order.findOneAndDelete({ email: req.query.email });
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};
