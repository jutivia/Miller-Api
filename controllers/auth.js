const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const signUser = async (req, res) => {
    const { address } = req.body
    let user = await User.findOne({ address });
    if (!user) user = await User.create({ address });
    return res.status(StatusCodes.CREATED).json({ token: user.getToken(), UserId: user._id })
}


module.exports = signUser