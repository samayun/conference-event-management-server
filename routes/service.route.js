const {
    create,
    read,
    show,
    update,
    deleteservice
} = require("../controllers/service.controller");
const bindAuthUser = require('../middlewares/bindUserRequest.middleware');

const router = require("express").Router();

router.post("/", bindAuthUser(), create);

router.get("/", read);

router.get("/:id", show);

router.put("/:id", bindAuthUser(), update);

router.delete("/:id", bindAuthUser(), deleteservice);

module.exports = router;
