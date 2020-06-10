const express = require("express");
const router = express.Router();

const {
    signup,
    signin,
    signout,
    requireSignin,
} = require("../controllers/authClient");
const { userSignupValidator } = require("../validators/userValidator");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
