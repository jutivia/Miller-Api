const Publication = require('../models/publication')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, UnauthenticatedError } = require("../errors");
const createPublication = async (req, res) => {
    req.body.createdBy = req.user.userId;
    await Publication.create({ ...req.body })
    res.status(StatusCodes.CREATED)
      .json({ msg:"publication created successfully" });
};

const getAllPublications = async (req, res) => {
    const publications = await Publication.find({})
      .select("-cid")
      .sort("-updatedAt");
    res
      .status(StatusCodes.OK)
      .json({ count: publications.length, publications });
}
const getPublicationsByUser = async (req, res) => {
    const publications = await Publication.find({ createdBy: req.user.userId })
      .select("-cid")
      .sort("-updatedAt");
    res.status(StatusCodes.OK).json({
      msg: `All ${req.user.address}'s Publication retrieved successfully`,
      count: publications.length,
      publications,
    });
};
const getPublication = async (req, res) => {
    const publication = await Publication.findOne({ _id: req.params.id })
    if (!publication) {
      throw new NotFoundError(
        `Publication with id: ${req.params.id} not found`
      );
    }
    const num = publication.views
    req.body.views = num + 1 
    const updatedCount = await Publication.findOneAndUpdate(
       {
         _id: req.params.id,
       },
       req.body,
       {
         new: true,
         runValidators: true,
       }
    );
    
    res
      .status(StatusCodes.OK)
      .json({ msg: "Publication retrieved successfully", updatedCount });
};
const updatePublication = async (req, res) => {
    const publication = await Publication.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!publication) {
      throw new UnauthenticatedError(
        'Unauthorized User'
      );
    }
    res.status(StatusCodes.CREATED).json({ msg:"Publication updated succesfully", publication });
};
const deletePublication = async (req, res) => {
    const publication = await Publication.findOneAndDelete(
      {
        _id: req.params.id,
        createdBy: req.user.userId,
      }
    );
    if (!publication) {
      throw new UnauthenticatedError("Unauthorized User");
    }
    res.status(StatusCodes.OK).json({ msg: 'publication deleted successfully' });
};


module.exports = {
  getAllPublications,
  getPublicationsByUser,
  getPublication,
  updatePublication,
  deletePublication,
  createPublication,
};