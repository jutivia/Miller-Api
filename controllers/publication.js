const Publication = require('../models/publication')
const {StatusCodes} = require('http-status-codes')
const createPublication = async (req, res) => {
    req.body.createdBy = req.user.userId;
    await Publication.create({ ...req.body })
    res.status(StatusCodes.CREATED)
      .json({ msg:"publication created successfully" });
};

const getAllPublications = async (req, res) => {
    const publications = await Publication.find({})
      .select("-cid")
      .sort("-createdAt");
    res
      .status(StatusCodes.OK)
      .json({ count: publications.length, publications });
}
const getPublicationsByUser = async (req, res) => {
    const publications = await Publication.find({ createdBy: req.user.userId })
      .select("-cid")
      .sort("-createdAt");
    res
      .status(StatusCodes.OK)
      .json({ count: publications.length, publications });
};
const getPublication = async (req, res) => {
    res.send("publication");
};
const updatePublication = async (req, res) => {
    res.send("update publication");
};
const deletePublication = async (req, res) => {
    res.send("delete publication");
};


module.exports = {
  getAllPublications,
  getPublicationsByUser,
  getPublication,
  updatePublication,
  deletePublication,
  createPublication,
};