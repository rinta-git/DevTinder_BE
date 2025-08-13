const express = require('express');

const { authAdmin, authUser } = require('./middlewares/auth');

const app = express();

app.use("/admin", authAdmin)

app.get("/admin/getAllData", (req, res) => {
  res.send("All admin data");
});

app.delete("/admin/deleteData", (req, res) => {
  res.send("Admin data deleted");
});

app.get("/users/getUsers", authUser, (req, res) => {
  res.send({ firstName: "John", lastName: "Doe" });
})

app.get("/users", (req, res) => {
    throw new Error("Test error");
})

app.use("/", (err, req, res) => {
  if(err){
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});