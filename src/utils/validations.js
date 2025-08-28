const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, email, password } = req.body;
  if (!firstName || !email || !password) {
    throw new Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Weak password");
  }
};

const validateLogin = (req) => {
    const { email, password } = req.body;

    if(!email || !password) {
        throw new Error("All fields are required");
    }

    if(!validator.isEmail(email)) {
        throw new Error("Invalid email format");
    }
}

const isUpdateAllowed = (userId, req) => {
  const allowedToUpdate = ["gender", "age", "lastName", "skill"];
  return Object.keys(req.body).every((key) => allowedToUpdate.includes(key));
};

module.exports = { validateSignUp, validateLogin, isUpdateAllowed };
