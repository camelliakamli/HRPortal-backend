const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { generateToken } = require("../middlewares/generateToken");
const createError = require('../utils/error');
const Department = require('../models/Department');

//FUNCTION TO CREATE USER 
const createUser = async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        date_of_birth,
        email,
        password,
        phone_number,
        position,
        salary,
        department,
        role,
        gender,
        hire_date,
        address,
        hierarchy_level = null, 
      } = req.body;
  
      console.log(req.body);
  
      const parsedDOB = new Date(date_of_birth);
      const parsedHireDate = new Date(hire_date);
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        first_name,
        last_name,
        date_of_birth: parsedDOB,
        email,
        password: hashedPassword,
        phone_number,
        position,
        salary,
        department,
        role,
        gender,
        hire_date: parsedHireDate,
        address,
        hierarchy_level, 
      });
  
      const savedUser = await newUser.save();
      res.status(201).json({
        message: "User created successfully.",
        savedUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };
  
//LOGIN FUNCTION
const login = async (req, res, next) => {
    // retreive user data from req
    const { email, password } = req.body;
    try{
        // find User
        const user = await User.findOne({ email });

        if(!user){
            res.status(404).json({ error: "User not found." });
        }

        //Validate Password
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordValid){
            res.status(400).json({ error: "Invalid password." });
        }
        // Generate and return a JWT Token + Store it in cookie
        const token = await generateToken(user);
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); //STORE TOKEN IN COOKIE USING httpOnly
        res.status(200).json({ token , user, message: "Login successful." });


    }catch(error){
        console.error("Error creating user:", error);
        //res.status(500).json({ error: "Username or password incorrect!" });
        next(error);
    }
};

// LOGOUT FUNCTION 
const logout = (req, res, next) => {
    try {
      // Clear the token cookie
      res.clearCookie('token', { httpOnly: true, path: '/' });
      res.status(200).json({ message: "Logout successful." });
    } catch (error) {
      console.error("Error during logout:", error);
      next(error); 
    }
  };
  


//GET ALL USERS
const getAllUsers = async (req, res , next)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        console.error("Error creating user:", error);
        next(error);    
    }
};

//GET USER BY ID
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id); 
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error retrieving user by ID:", error); 
        next(error);
    }
};

//DELETE USER
const deleteUser = async (req, res, next) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({ error: "User not found." });
        }
            
        res.status(200).json({ message: "User deleted successfully." });
    }catch(error){
        console.error("Error creating user:", error);
        next(error);
    }
};

//UPDATE USER
const updateUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);

        // Validate and parse DATA
        const updateData = req.body;
        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: "No update data provided." });
        }

        //HASHING PWD IF IT IS IN REQUEST
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        // Update the user in D
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
            new: true, 
            runValidators: true, //ensure data is validated before saving
        });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found." });
        }
        res.status(200).json({
            message: "User updated successfully.",
            updatedUser,
        });
    }catch(error){
        console.error("Error creating user:", error);
        next(error);
    }
};

//function to assign roles - Hierarchy Management
const assignRole = async (req, res, next) => {

}

//function to get team members - Hierarchy Management
const viewHierarchyTree = async (req, res, next) => {

}
module.exports = { createUser , login ,logout, getAllUsers , getUserById , deleteUser , updateUser , assignRole, viewHierarchyTree };  