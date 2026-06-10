import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ ใช้ role check แทน
    if (decoded.role !== "admin") {
      return res.json({
        success: false,
        message: "Not Authorized - Admin Only",
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;
