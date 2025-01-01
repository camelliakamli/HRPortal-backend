const express = require("express");
const router = express.Router();
const { createUser , login,logout, getAllUsers, getUserById, updateUser, deleteUser} = require("../controllers/userController"); // Correctly import createUser
const { verifyAdmin, verifyEmployee } = require("../middlewares/verifyToken");

// Route to create a new user
//Protected route to create user only by admin
router.post("/create-user", createUser);  
//router.post("/create-user", verifyAdmin, createUser);  
router.post("/login", login);
router.post("/logout", logout);
router.get("/all-users", getAllUsers);
router.get("/:id", getUserById);
router.put("/update-user/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);
module.exports = router;
