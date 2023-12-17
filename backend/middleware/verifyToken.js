import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = await req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id };
      next();
    }

    if (!token)
      return res.status(401).json({ error: "Unauthorized, invalid token" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};
