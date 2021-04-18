const {
    create,
    read,
    findByEmail,
    deleteOrder
} = require("../controllers/order.controller");


const router = require("express").Router();
const bindAuthUser = require('../middlewares/bindUserRequest.middleware');
// USER
router.post("/", bindAuthUser(), create);

// ADMIN
router.get("/", bindAuthUser(), read);

// USER 
router.get("/find?", bindAuthUser(), findByEmail);

// ADMIN
router.delete("/:orderId", bindAuthUser(), deleteOrder);

module.exports = router;
