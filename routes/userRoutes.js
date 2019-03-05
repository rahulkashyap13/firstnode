const express = require("express");
const router = express.Router();
const validations = require("../common/validation");
const user = require("../controllers/apiController/authController");



/* ----------------------------------------User API------------------------------------ */

router.post("/signup", validations.signupValidation, user.signUp);
router.post("/login", validations.loginValidation, user.userLogin);



module.exports = router;
