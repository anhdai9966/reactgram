const express = require("express");
const userController = require("./../controllers/userController");

// eslint-disable-next-line new-cap
const router = express.Router();

router.param('id', userController.checkID);

router
    .route("/")
    .get(userController.getAllUser)
    .post(userController.createUser)

router
    .route("/:id")
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
