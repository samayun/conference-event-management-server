const Order = require("../models/Order.model");
const Admin = require("../models/Admin.model");

// POST https://conference-events.herokuapp.com/orders
exports.create = async (req, res, next) => {
    try {
        // paymentId,service , shipment : {name , email , phone, address } , status , paymentdata: { card, type}
        let order = new Order(req.body);
        let response = await order.save();
        res.status(201).json(response);
    } catch (error) {
        next(error.message);
    }
};
// GET https://conference-events.herokuapp.com/orders
exports.read = async (req, res, next) => {
    try {
        let { email } = req.user;
        let admin = await Admin.findOne({ email });

        // If user is admin fetch all orders 
        if (admin) {
            req.user.isAdmin = true
            let orders = await Order.find({}).populate({
                path: 'service',
                select: "serviceId name image price"
            }).sort({ createdAt: -1 })
            return res.json(orders);

        } else {
            // otherwise fetch only users orders
            let orders = await Order.find({ "shipment.email": email })
                .populate({
                    path: 'service',
                    select: "serviceId name image price"
                }).sort({ createdAt: -1 })
            return res.json(orders);
        }

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
        let updatedorder = await Order.findOneAndUpdate(
            { _id: req.params.orderId },
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
        let order = await Order.findOneAndDelete({ _id: req.params.orderId });
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};
