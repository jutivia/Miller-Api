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
      required: [true, "Kindly pass the publication CID"],
    },
    categories: {
      type: Array,
      of: String,
      required: [true, "Kindly pass the publication's categories"],
    },
    type: {
      type: String,
      enums: {
        values: ["premium", "free"],
        message: "{VALUE} is not supported",
      },
      default: "free",
    },
    views: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Kindly provide the user"],
    },
    userAddress: {
      type: String,
      required: [true, "Kindly provide user's address"],
      match: [/^0x[a-fA-F0-9]{40}$/, "Kindly provide a valid wallet address"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Publication", PublicationSchema);