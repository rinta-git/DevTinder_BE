const isUpdateAllowed = (userId, req) => {
    const allowedToUpdate = ["gender", "age", "lastName", "skill"];
    return Object.keys(req.body).every(key => allowedToUpdate.includes(key));
}

module.exports = { isUpdateAllowed }