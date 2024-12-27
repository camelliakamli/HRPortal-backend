const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { generateToken } = require("../middlewares/generateToken");
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
            hire_date
        } = req.body;

        // Validate and parse dates
        const parsedDOB = new Date(date_of_birth);
        const parsedHireDate = new Date(hire_date);

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user instance
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
        });

        // Save user to database
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
const login = async (req, res) => {
    // retreive user data from req
    const { email, password } = req.body;
    try{
        // find User
        const user = await User.findOne({ email });

        if(!user){
            res.status(404).json({ error: "User not found." });
        }

        //Validate Password
        const isPasswordValid = bcrypt.compare(req.body.password, user.password);
        if(!isPasswordValid){
            res.status(400).json({ error: "Invalid password." });
        }
        // Generate and return a JWT Token + Store it in cookie
        const token = await generateToken(user);
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); //STORE TOKEN IN COOKIE USING httpOnly
        res.status(200).json({ token , user, message: "Login successful." });


    }catch(error){
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Username or password incorrect!" });
    }
};

//LOGOUT FUNCTION 
const logout = (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token', { httpOnly: true });
        res.status(200).json({ message: "Logout successful." });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};


//GET ALL USERS
const getAllUsers = async (req, res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

//GET USER BY ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); 
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error retrieving user by ID:", error); 
        res.status(500).json({ error: "Internal server error." });
    }
};

//DELETE USER
const deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({ error: "User not found." });
        }
            
        res.status(200).json({ message: "User deleted successfully." });
    }catch(error){
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error." , user,});
    }
};

//UPDATE USER
const updateUser = async (req, res) => {
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
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = { createUser , login ,logout, getAllUsers , getUserById , deleteUser , updateUser };  