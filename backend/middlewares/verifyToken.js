const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

// Middleware to verify roles
const verifyRole = (...requiredRoles) => (req, res, next) => {
    // Extract token from headers or cookies
    const authHeader = req.headers.authorization;
    const token = authHeader
        ? authHeader.split(" ")[1] // Get TOKEN from Bearer scheme
        : req.cookies?.token; // OR GET TOKEN from COOKIE

    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

  try {
    // Verify JWT token
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if user has one of the required roles
    if (!requiredRoles.includes(payload.role)) {
      return next(createError(403, "Forbidden: Access denied"));
    }

    // USER DATA FROM THE PAYLOAD OF TOKEN
    req.user = payload;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return next(createError(401, "Invalid token"));
  }
};

// Define separate middleware functions for EACH ROLE
const verifyAdmin = verifyRole("admin");
const verifyEmployee = verifyRole("employee");

module.exports = { verifyAdmin, verifyEmployee, verifyRole };
