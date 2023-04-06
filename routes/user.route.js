const express = require("express");

const userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/", userController.getUsers);

router.get("/:userID", userController.getUsersByID);

router.post("/", userController.addUser);

router.put("/:userID", userController.updateUser);

router.delete("/:userID", userController.deleteUser);

module.exports = router;