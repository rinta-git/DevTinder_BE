const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    //get token from cookies
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Authentication token is missing");
    }
    //verify token
    const decodedUser = await jwt.verify(token, "devTinder#RR$2025");
    const user = await User.findById(decodedUser.userId);

    if (!user) {
      throw new Error("User does not exist");
    }
    //attach user to request
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized access: " + err.message);
  }
};

module.exports = {
  userAuth,
};
