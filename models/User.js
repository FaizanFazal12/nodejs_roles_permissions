const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        required: true,
        type: String,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',  // Reference the Role model
        required: true,
    },
    // Associate the User with their permissions
});

const User=mongoose.model("user",UserSchema);

module.exports=User