const jwt = require("jsonwebtoken");
const SECRET = "mysecret";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader); // 🔥 DEBUG

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    const token = authHeader.split(" ")[1]; // ✅ extract token

    const decoded = jwt.verify(token, SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Invalid token" });
  }
};