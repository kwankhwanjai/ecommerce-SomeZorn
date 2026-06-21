import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    // =========================
    // GET AUTH HEADER
    // =========================
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized - No Token Provided",
      });
    }

    // =========================
    // EXTRACT TOKEN
    // Expect: "Bearer <token>"
    // =========================
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // =========================
    // VERIFY TOKEN
    // =========================
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // =========================
    // CHECK ROLE
    // =========================
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not Authorized - Admin Only",
      });
    }

    // =========================
    // ATTACH ADMIN DATA
    // =========================
    req.admin = decoded;

    next();
  } catch (error) {
    console.log("ADMIN AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

export default adminAuth;
