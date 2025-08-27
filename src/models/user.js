const mongoose = require("mongoose");

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
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      validate: function (value) {
        return /^[a-zA-Z0-9!@#$%^&*]{6,}$/.test(value);
      },
    },
    skill: {
      type: [String],
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

const User = mongoose.model("User", userSchema);
module.exports = User;
