const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, "Kindly provide user's address"],
    match: [/^0x[a-fA-F0-9]{40}$/, 'Kindly provide a valid wallet address'],
  },
});

UserSchema.methods.getToken = function () {
    return jwt.sign({ userId: this._id, address: this.address }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFESPAN
    });
}
module.exports = mongoose.model("User", UserSchema);