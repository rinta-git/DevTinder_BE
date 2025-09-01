const express = require("express");
const devTinderDB = require("./config/database");
const User = require("./models/user");
const {
  isUpdateAllowed,
  validateSignUp,
  validateLogin,
} = require("./utils/validations");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use(express.json()); //middleware to convert json body to javascript object. It runs for all incoming requests.
app.use(cookieParser()); //middleware to parse cookies from the request

app.post("/signUp", async (req, res) => {
  const { firstName, email, password } = req.body;

  try {
    validateSignUp(req);

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      email,
      password: encryptedPassword,
    });

    await user.save({ runValidators: true });
    res.send("User signed up successfully");
  } catch (err) {
    res.status(500).send("Error signing up user: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    validateLogin(req);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("Invalid credentials");
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(404).send("Invalid credentials");
    }else{
      //create jwt
      const token = jwt.sign({ userId:user._id}, "devTinder#RR$2025", {expiresIn:"7d"})
      //add the token to cookie
      res.cookie("token", token, {expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), httpOnly:true});
      //send the response
      res.send("User logged in successfully");
    }
  } catch (err) {
    res.status(500).send("Error logging in user: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try{
    res.send(req.user);
  }catch(err){
    res.status(500).send("Error fetching profile: " + err.message);
  }
})

app.get("/sendFriendRequest", userAuth, async(req, res) => {
  try{
    const user = req.user;
    console.log(user);

  }catch(err){
    res.status(500).send("Error sending friend request: " + err.message);
  }
})

//delete one user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting user");
  }
});

//update
app.patch("/updateUser/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    if (!isUpdateAllowed(userId, req)) {
      throw new Error("Update of the field(s) is/are not allowed");
    }
    const data = await User.findByIdAndUpdate(userId, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(data);
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send("Error updating user: " + err.message);
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
