const Service = require("../models/Service.model");

exports.create = async (req, res, next) => {
    try {
        // const { name, price, description, image } = req.body;
        let service = new Service(req.body);
        let response = await service.save();
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};


exports.read = async (req, res, next) => {
    try {
        let services = await Service.find({});
        res.json(services);
    } catch (error) {
        next(error);
    }
};

exports.show = async (req, res, next) => {
    try {
        let service = await Service.findOne({ _id: req.params.id }).exec();
        if (service) {
            res.json(service);
        } else {
            next(new Error(`${req.params.id} Service is not availavle`));
        }
    } catch (error) {
        next(new Error(`${req.params.id} Service is not available`));
    }
};

exports.update = async (req, res, next) => {
    try {

        let updatedservice = await Service.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: req.body
            },
            { new: true, useFindAndModify: false }
        );
        res.status(200).json(updatedservice);
    } catch (error) {
        next(error);
    }
};

exports.deleteservice = async (req, res, next) => {
    try {
        let service = await Service.findByIdAndDelete(req.params.id);
        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
};
