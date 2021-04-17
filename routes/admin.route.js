const {
    create,
    read,
    update,
    deleteAdmin
} = require("../controllers/admin.controller");

const bindAuthUser = require('../middlewares/bindUserRequest.middleware');

const router = require("express").Router();

router.post("/", bindAuthUser(), create);

router.get("/", read);

router.put("/", bindAuthUser(), update);

router.delete("/", bindAuthUser(), deleteAdmin);

module.exports = router;
