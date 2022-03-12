const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");
const validateSignupInput = require("../../validation/signupDriver");
const validateLoginInput = require("../../validation/loginDriver");
const driversController = require('../../controllers/driversController')

const User = require("../../models/drivers");

router.post('/signupDriver', driversController.postSignup);

router.post('/loginDriver',driversController.postLogin )


module.exports = router