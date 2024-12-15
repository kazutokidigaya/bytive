import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeadr = req.headers["authorization"];
  const token = authHeadr && authHeadr.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access token missing." });

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });

    req.user = user;
    next();
  });
};

export default authenticateToken;