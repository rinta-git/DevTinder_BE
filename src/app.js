const express = require('express');

const app = express();



app.get("/users", (req, res) => {
    res.send({firstName: "John", lastName: "Doe"});
})


//works with efg and xfff...+nc. Meaning + makes f can
// be multiple but it can be zero also and then ends with g
app.get(/ef*g/, (req, res) => {   
    res.send("Hello, World!");
})


//works with xyc and xyyyy...+nc. Meaning + makes y can
// be multiple but it should be there atleast once and then ends with c
app.get(/xy+c/, (req, res) => {
    res.send("Hello, World!");
})

app.get(/ab?c/, (req, res) => {   //works with ac and abc. Meaning ? makes b optional
    res.send("Hello, World!");
})


app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});