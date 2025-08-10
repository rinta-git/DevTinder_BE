const express = require('express');

const app = express();

app.delete("/users", (req, res) => {
    res.send("deleted successfully");
})

app.patch("/users", (req, res) => {
    res.send("updated successfully");
})

app.put("/users", (req, res) => {
    res.send("replaced successfully");
})

app.post("/users", (req, res) => {
    res.send("successfully added");
})

app.get("/users", (req, res) => {
    res.send({firstName: "John", lastName: "Doe"});
})

app.get("/", (req, res) => {
    res.send("Hello, World!");
})


app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});