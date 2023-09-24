const express = require("express");
const router = express.Router();
const authController = require("../Controller/auth")
const UrlController = require("../Controller/Url")
const { getAllRoles } = require("../Controller/rolesAndPermissionsController.js")
const Url = require("../models/Url")


//user Router
//Login
router.post("/user/login", authController.HandleLogin);
//Signup
router.post("/user/signup", authController.HandleSignup)

//Url
router.post("/url", UrlController.HandleGenerateUrl);
router.get("/url/:shortid", UrlController.redirecttoshortId);
router.get("/url/analytic/:shortid", UrlController.handleGetAnalytic);
router.delete("/url/analytic/:shortid", UrlController.deleteUrl);




//Permission Route
router.get('/getAllRoles', getAllRoles);

//Static Routes
router.get("/", async (req, res) => {
    if (!req.user) return res.redirect("/login")

    const allUsers = await Url.find({ createdBy: req.user._id })
    return res.render("Home", {
        urls: allUsers,
        // Access permissions here
    })
})

router.get("/getallurl", async (req, res) => {

    const allUsers = await Url.find({})
    return res.render("Home", {
        urls: allUsers,

    })
})

//get all url


router.get("/signup", (req, res) => {
    return res.render("Signup")
})
router.get("/login", (req, res) => {
    return res.render("Login")
})
module.exports = router