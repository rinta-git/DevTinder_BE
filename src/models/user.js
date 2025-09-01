const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 55,
    },
    age: {
      type: Number,
      min: 18,
      default: 18,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: function (value) {
        if(!validator.isEmail(value)) {
            throw new Error("Invalid email format");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      validate: function (value) {
        if(!validator.isStrongPassword(value)) {
            throw new Error("Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.");
        }
      },
    },
    skill: {
      type: [String],
      default: ['html'],
      validate: {
        validator: function (value) {
          return value && value.length > 0 && value.length <= 5;
        },
        message: "Skill must be an array of 1 to 5 strings.",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWTToken = async function() {
  const user =  this;
  const token = await jwt.sign({ userId:user._id}, "devTinder#RR$2025", {expiresIn:"7d"})
  return token;
}

userSchema.methods.validatePassword = async function (userPassword) {
  const user = this;
  const hashPassword = user.password;
  return await bcrypt.compare(userPassword, hashPassword);
}
  

const User = mongoose.model("User", userSchema);
module.exports = User;
