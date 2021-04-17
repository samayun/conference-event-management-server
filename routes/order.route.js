const {
    create,
    read,
    findByEmail
} = require("../controllers/order.controller");


const router = require("express").Router();
const bindAuthUser = require('../middlewares/bindUserRequest.middleware');
// USER
router.post("/", bindAuthUser(), create);

// ADMIN
router.get("/", bindAuthUser(), read);

// USER 
router.get("/find?", bindAuthUser(), findByEmail);


module.exports = router;
