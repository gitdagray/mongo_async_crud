const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // console.log("Auth Header: ", authHeader);
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  // console.log("hey");
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.user;
    req.email = decoded.user.email;
    req.roles = decoded.user.roles;
    next();
  });
};

module.exports = verifyJWT;
