const jwt = require("jsonwebtoken");
const secret = "FaizanFazal"
function SetUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role:user.role,
    }, secret)
}

function getUser(token) {
    try {
        if (!token) return null
        return jwt.verify(token, secret)
    } catch (error) {
        return null
    }

}

module.exports = {
    SetUser,
    getUser
}