import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    console.log("========== ADMIN AUTH ==========");
    console.log("HEADERS:", req.headers);

    // =========================
    // GET AUTH HEADER
    // =========================
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
      console.log("❌ No Authorization Header");

      return res.status(401).json({
        success: false,
        message: "Not Authorized - No Token Provided",
      });
    }

    // =========================
    // EXTRACT TOKEN
    // =========================
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    console.log("TOKEN:", token);

    // =========================
    // VERIFY TOKEN
    // =========================
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED TOKEN:", decoded);

    // =========================
    // CHECK ROLE
    // =========================
    if (decoded.role !== "admin") {
      console.log("❌ ROLE CHECK FAILED");
      console.log("ROLE FOUND:", decoded.role);

      return res.status(403).json({
        success: false,
        message: "Not Authorized - Admin Only",
      });
    }

    console.log("✅ ADMIN AUTH PASSED");

    req.admin = decoded;

    next();
  } catch (error) {
    console.log("❌ ADMIN AUTH ERROR");
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

export default adminAuth;
