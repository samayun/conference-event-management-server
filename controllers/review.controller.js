const Review = require('../models/Review.model.js');

// POST https://conference-events.herokuapp.com/reviews { name: "Salman", email : 'samayunmc99@gmail.com }
exports.create = async (req, res, next) => {
    try {
        // const { name, designation, description,image, rating } = req.body;
        let review = new Review(req.body);
        let response = await review.save();
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
}
// GET https://conference-events.herokuapp.com/reviews/read
exports.read = async (req, res, next) => {
    try {
        let reviews = await Review.find({});
        res.json(reviews);
    } catch (error) {
        next(error);
    }
}

// GET https://conference-events.herokuapp.com/myreviews
exports.myreviews = async (req, res, next) => {
    try {
        console.log(req.user.email)
        let reviews = await Review.find({email: req.user.email});
        res.json(reviews);
    } catch (error) {
        next(error);
    }
}


// GET https://conference-events.herokuapp.com/reviews/show/69788abc545454
exports.show = async (req, res, next) => {
    try {
        let review = await Review.findOne({ _id: req.params.id }).exec();
        if (review) {
            res.json(review);
        } else {
            next(new Error(`${req.params.id} review is not availavle`));
        }
    } catch (error) {
        next(new Error(`${req.params.id} review is not available`));
    }
}
// PUT https://conference-events.herokuapp.com/reviews/update/69788abc545454 { name: "Samayun", email : 'samayunmc99@gmail.com }
exports.update = async (req, res, next) => {
    try {
        let updatedResource = await Review.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedResource);
    } catch (error) {
        next(error);
    }
}
// DELETE https://conference-events.herokuapp.com/reviews/delete/69788abc545454
exports.deleteReview = async (req, res, next) => {
    try {
        let review = await Review.findByIdAndDelete(req.params.id);
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
}
