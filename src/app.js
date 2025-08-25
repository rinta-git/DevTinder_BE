const express = require("express");
const devTinderDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signUp", async (req, res) => {
  const user = new User({
    email: "xxxx@gmail.com",
    password: "xxxpassword",
    firstName: "xxx",
    lastName: "xxxUser",
    gender: "Male",
  });

  try {
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(500).send("Error signing up user");
  }
});

devTinderDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000...");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
