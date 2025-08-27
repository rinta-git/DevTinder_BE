const mongoose =require("mongoose");
const User = require("../models/user");

const devTinderDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://rintaroy:FqEJtmU7J2notDDy@clusterrr.gvs5nif.mongodb.net/DevTinder");
    console.log("Connected to MongoDB");
    await User.init();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = devTinderDB;
