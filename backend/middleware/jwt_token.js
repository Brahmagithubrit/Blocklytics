const jwt = require("jsonwebtoken");
function generateToken(payload) {
  const jwtToken = jwt.sign(payload, secretKey, { expiresIn: "24h" });

  return jwtToken;
}


function validateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).send("No token provided. Please sign in.");
  }

  jwt.verify(token, "brahma", (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized! Invalid or expired token.");
    }

    req.user = decoded;
    next();
  });
}


module.exports = {
  generateToken,
  validateToken,
};