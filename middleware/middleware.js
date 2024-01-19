const jwt = require("jsonwebtoken");
const ResponseFormater = require("../helpers/ResponseFormater");

const { JWT_SECRET } = process.env;

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    const response = new ResponseFormater(
      401,
      "Unauthorized - Missing token",
      null
    ).getResponse();

    return res.status(401).json(response);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      const response = new ResponseFormater(
        403,
        "Forbidden - Invalid token",
        null
      ).getResponse();

      return res.status(403).json(response);
    }

    // Token is valid, you can access user information in `user` variable
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
