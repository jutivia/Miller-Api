const express = require('express')
const router = express.Router()
const {
  getAllPublications,
  getPublicationsByUser,
  getPublication,
  updatePublication,
  deletePublication,
  createPublication,
  getCId,
} = require("../controllers/publication");

 
router.route("/")
  .get(getAllPublications)
  .post(createPublication);
router.get('/user', getPublicationsByUser)
router.get("/cid/:id", getCId);
router
  .route("/:id")
  .get(getPublication)
  .patch(updatePublication)
  .delete(deletePublication);

module.exports = router
