const mongoose = require('mongoose');
const PublicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Kindly enter the publication name"],
    },
    description: {
      type: String,
      required: [true, "Kindly enter a short description of the publication "],
    },
    cid: {
        type: String,
        required: [true, "Kindly pass the application CID"]
    },
    category: {
        type: String,
        enums: {
            values: ['premium', 'free'],
            message: '{VALUE} is not supported'
        },
        default: 'free'
    },
    views: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Kindly provide the user']
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Publication", PublicationSchema);