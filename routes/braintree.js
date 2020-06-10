const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/authClient");
const { userById } = require("../controllers/user");
const { generateToken, processPayment } = require("../controllers/braintree");

//router.param("userId", userById);

router.get("/getToken/:userId", generateToken);
router.post(
    "/payment/:userId",
    processPayment
);

//router.param("userId", userById);

module.exports = router;
