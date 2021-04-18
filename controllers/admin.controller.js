const Admin = require("../models/Admin.model");

exports.create = async (req, res, next) => {
    try {

        // const { name, email, image } = req.body;
        let checkIsAlreadyExists = await Admin.findOne({email: req.body.email});
        if (checkIsAlreadyExists) {
           return next(new Error(`${ req.body.email} is already  Admin. Please login now`));
        }else{
        let admin = new Admin(req.body);
        console.log({admin})
        let response = await admin.save();
        res.status(201).json(response);
    }
        
    } catch (error) {
        next(error);
    }
};

exports.read = async (req, res, next) => {
    try {
        const { email } = req.query;
        if (!email) {
            let allAdmins = await Admin.find({}).sort({createdAt: -1});
            return res.json(allAdmins);
        } else {
            let admin = await Admin.findOne({ email }).exec();
            if (admin) {
                return res.json(admin);
            } else {
                return next(new Error(`${email} Admin is not availavle`));
            }
        }
    } catch (error) {
        next(error);
    }
};

exports.show = async (req, res, next) => {
    try {

    } catch (error) {
        next(new Error(`${req.params.id} Admin is not available`));
    }
};

exports.update = async (req, res, next) => {
    try {
        const { email } = req.query;
        if (!email) {
            next(new Error(`Please Provide email of admin`));
        }

        let updatedservice = await Admin.findOneAndUpdate(
            { email },
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedservice);
    } catch (error) {
        next(error);
    }
};

exports.deleteAdmin = async (req, res, next) => {
    try {
        const { email } = req.query;
        if (!email) {
            next(new Error(`${email} Not found`));
        }
        let admin = await Admin.findOneAndDelete({ email });
        if (admin) {
            res.status(200).json(admin);
        } else {
            next(new Error(`${req.query.email} deleted failed`));
        }
    } catch (error) {
        next(error);
    }
};
