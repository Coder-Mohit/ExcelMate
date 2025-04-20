import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "access denied, no token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    next();
  } catch (e) {
    console.log(e.message);

    return res.status(403).json({ message: "token invalid" });
  }
};
