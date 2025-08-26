const express = require("express");
const devTinderDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json()); //middleware to convert json body to javascript object. It runs for all incoming requests.

app.post("/signUp", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(500).send("Error signing up user");
  }
});

app.get("/user", async(req, res) => {
  const userName = req.body.firstName;
  try{
    const resp = await User.findOne({firstName:userName}) //To get one user that has common name
    if(!resp){
      return res.status(404).send("Users not found")
    }
    res.send(resp)
  }catch (err){
    res.status(400).send("Something went wrong!");
  }
})

app.get("/user", async(req, res) => {
  const userEmail = req.body.email
  try{
    const resp = await User.find({email: userEmail}) //To get one specific user
    if(resp.length === 0){
      return res.status(404).send("User not found")
    }
    res.send(resp)
  }catch (err){
    res.status(400).send("Something went wrong!");
  }
})

app.get("/users", async(req, res) => {
  try{
    const resp = await User.find({}) //To get all users
    if(resp.length === 0){
      return res.status(404).send("Users not found")
    }
    res.send(resp)
  }catch (err){
    res.status(400).send("Something went wrong!");
  }
})



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
