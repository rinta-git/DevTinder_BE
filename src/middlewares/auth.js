const authAdmin = (req, res, next) => {
    console.log("Admin authentication middleware called");
    const token = "abc";
    if(token !== "xyz"){
        res.status(403).send("Unauthorized access");
    } else {
        next();
    }
}

const authUser = (req, res, next) => {
    console.log("User authentication middleware called");
    const token = "abc";
    if(token !== "xyz"){
        res.status(403).send("Unauthorized access");
    } else {
        next();
    }
}

module.exports = {
    authAdmin,
    authUser
}