const {
	myreviews,
    create,
    read,
    update,
    deleteReview
} = require("../controllers/review.controller");

const bindAuthUser = require('../middlewares/bindUserRequest.middleware');

const router = require("express").Router();



router.post("/", bindAuthUser(), create);

router.get("/", read);

router.get("/myreviews", bindAuthUser(), myreviews);
router.put("/:id", bindAuthUser(), update);

router.delete("/:id", bindAuthUser(), deleteReview);

module.exports = router;
