const mongoose = require("mongoose");
function ConnectToMongodb(url) {
    return mongoose.connect(url)
}

module.exports=ConnectToMongodb