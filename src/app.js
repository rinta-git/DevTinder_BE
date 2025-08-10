const express = require('express');

const app = express();


app.get("/users/", (req, res) => {
    console.log(req.query) //results what you passed in url. It makes you to pass query param
    res.send({ firstName: "John", lastName: "Doe", userId });
})

app.get("/users/:userId", (req, res) => {
    const { userId } = req.params;
    console.log(userId) //results what you passed in url. It makes route dynamic
    res.send({ firstName: "John", lastName: "Doe", userId });
})


app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});