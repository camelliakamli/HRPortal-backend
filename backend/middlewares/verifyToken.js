const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

// Middleware to verify roles
const verifyRole = (...requiredRoles) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return next(createError(401, "No token provided"));
  }

  const token = authHeader.split(" ")[1];
  try {
    // Verify JWT token
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the user has one of the required roles
    if (!requiredRoles.includes(payload.role)) {
      return next(createError(403, "Forbidden: Access denied"));
    }

    // Attach user info to the request object
    req.user = payload;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return next(createError(401, "Invalid token"));
  }
};

// Define separate middleware functions for specific roles
const verifyAdmin = verifyRole("admin");
const verifyEmployee = verifyRole("employee");

module.exports = { verifyAdmin, verifyEmployee, verifyRole };
