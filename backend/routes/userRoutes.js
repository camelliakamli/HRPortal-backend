const express = require("express");
const router = express.Router();
const { createUser , login,logout, getAllUsers, getUserById, updateUser, deleteUser} = require("../controllers/userController"); // Correctly import createUser

// Route to create a new user
router.post("/create-user", createUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/all-users", getAllUsers);
router.get("/:id", getUserById);
router.put("/update-user/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);
module.exports = router;
