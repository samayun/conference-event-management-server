const {
    create,
    read,
    findByEmail
} = require("../controllers/order.controller");

const {
    findByEmailValidate
} = require("../validator/order.validate");

const { body, validationResult } = require('express-validator');

const router = require("express").Router();

router.post("/", create);

router.get("/", read);

router.get("/find?", findByEmailValidate, findByEmail);


module.exports = router;
