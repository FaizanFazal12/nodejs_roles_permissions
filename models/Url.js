const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        required: true,
        unique: true,
        type: String
    },
    RedirectURL: {
        type: String,
        required: true
    },
    vistHistory: [{
        timestamp: { type: Number }
    }],
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users"
    }
}, { timestamps: true })


const Url = mongoose.model("Url", urlSchema);

module.exports = Url