const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token = req.headers['authorization'];;
    console.log(token);
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token is missing"
      })
    }
    const stringArray = token.split(" ");
    actualToken = stringArray[1];
    if (!actualToken) {
      return res.status(404).json({
        success: false,
        message: "No token provided.",
      });
    }
    try {
      const payload = jwt.verify(actualToken, process.env.JWT_SECRET);
      req.user = payload;
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        actualToken,
        message: "Token is not valid.",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
