const express = require("express");
const router = express.Router();
const apiUsersController = require("../../controllers/apiUsersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), apiUsersController.getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), apiUsersController.deleteUser);

router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.Admin), apiUsersController.getUser);

module.exports = router;
