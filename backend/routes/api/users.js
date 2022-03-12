const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");
const validateSignupInput = require("../../validation/signupUser");
const validateLoginInput = require("../../validation/loginUser");
const usersController = require('../../controllers/usersController')

const User = require("../../models/users");

router.post('/signupUser', usersController.postSignup);

router.post('/loginUser',usersController.postLogin )


module.exports = router