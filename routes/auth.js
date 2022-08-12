const express = require('express')
const router = express.Router()

const signUser = require('../controllers/auth')

router.post("/sign", signUser);

module.exports = router