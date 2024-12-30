const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

async function generateToken(user) {
  // Create a payload with user id, email, and role to be insterted in the token
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  
    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
  
    return token;
  }
  
  module.exports = { generateToken };