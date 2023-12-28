const express = require("express");
const router = express.Router();
const packagesController = require("../../controllers/packagesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .post(verifyRoles(ROLES_LIST.Admin), packagesController.createPackage)
  .get(packagesController.getAllPackages)
  .put(verifyRoles(ROLES_LIST.Admin), packagesController.updatePackage);

router.route("/:id").get(packagesController.getPackage);
router.route("/:id").put(packagesController.selectPackage);
router
  .route("/:id")
  .delete(verifyRoles(ROLES_LIST.Admin), packagesController.deletePackage);

module.exports = router;
