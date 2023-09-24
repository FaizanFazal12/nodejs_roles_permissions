const Url = require("../models/Url");
const Permission = require("../models/Permissions");
const shortid = require("shortid");
const User = require("../models/User"); // Import the User model
const Role = require("../models/Role"); // Import the Role model

const UrlController = {
    async HandleGenerateUrl(req, res) {
        try {
            let body = req.body;
            if (!body.url) {
                return res.status(400).json({ msg: "Url is required" });
            }

            // Check if the user has permission to generate a URL
            const user = await User.findById(req.user._id).populate('role');

            const shortId = shortid();
            await Url.create({
                shortId: shortId,
                RedirectURL: body.url,
                vistHistory: [],
                createdBy: req.user._id
            });

            return res.status(201).redirect("/")
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    },

    async redirecttoshortId(req, res) {
        try {
            // Check if the user has permission to redirect to a short URL
            const user = await User.findById(req.user._id).populate('role');
console.log(user, user.role.name)
            if (!user.role.name=="admin") {
                return res.status(403).json({ msg: "You do not have permission to redirect to short URLs" });
            }

            const shortId = req.params.shortid;
            const entry = await Url.findOneAndUpdate({
                shortId
            }, {
                $push: {
                    vistHistory: {
                        timestamp: Date.now()
                    }
                }
            });

            return res.redirect(entry.RedirectURL);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    },

    async handleGetAnalytic(req, res) {
        try {
            // Check if the user has permission to get analytics
            const user = await User.findById(req.user._id).populate('role');

            if (!user.role.name=="admin") {
                return res.status(403).json({ msg: "You do not have permission to view analytics" });
            }

            const shortId = req.params.shortid;
            const result = await Url.findOne({ shortId });
            res.status(200).json({ TotalClicks: result.vistHistory.length, analytics: result.vistHistory });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    },

    async deleteUrl(req, res) {
        try {
            // Check if the user has permission to delete URLs
            const user = await User.findById(req.user._id).populate('role');

            if (!user.role.name=="admin"){
                return res.status(403).json({ msg: "You do not have permission to delete URLs" });
            }

            const shortId = req.params.shortid;
            const url = await Url.findOne({ shortId });

            if (!url) {
                return res.status(404).json({ msg: "URL not found" });
            }

            await Url.deleteOne({ shortId });
            return res.status(200).json({ msg: "URL deleted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Internal server error" });
        }
    }
}    

module.exports = UrlController;
