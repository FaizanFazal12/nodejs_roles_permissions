const mongoose=require("mongoose")
const permissionSchema = new mongoose.Schema({
    LinksCreate: { type: Boolean, default: false },
    LinksUpdate: { type: Boolean, default: false },
    LinksDelete: { type: Boolean, default: false },
    UsersCreate: { type: Boolean, default: false },
    UsersDelete: { type: Boolean, default: false },
    UsersUpdate: { type: Boolean, default: false },
});

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;
