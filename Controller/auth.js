const { SetUser } = require("../services/auth");
const Role = require("../models/Role")
const User = require("../models/User")
const Permission = require("../models/Permissions")
const authController = {
    async HandleLogin(req, res) {
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email, password });

            if (!user) {
                return res.status(400).json({ error: "email or password is not found" })
            }

            // Find the user's role
            const userRole = await Role.findById(user.role);

            if (!userRole) {
                return res.status(400).json({ error: "User role not found" })
            }

            // Find the permissions associated with the user's role
            // const rolePermissions = await Permission.find({ _id: { $in: userRole.permissions } });

            // Check if the user has specific permissions
            // const hasCreateLinksPermission = await rolePermissions.some(permission => permission.LinksCreate === true);
            // const hasUpdateLinksPermission = await rolePermissions.some(permission => permission.LinksUpdate === true);


            const token = SetUser(user);

            res.cookie("token", token);

            // res.locals.hasCreateLinksPermission = hasCreateLinksPermission;
            // res.locals.hasUpdateLinksPermission = hasUpdateLinksPermission;

            return res.redirect("/");
            // Continue with your response handling here
            // For example, you can render a view or send a JSON response
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    },


    async HandleSignup(req, res) {
        const { name, email, password, role } = req.body;

        try {
            // Check if the provided role exists in the database
            const roleExists = await Role.findById(role);

            if (!roleExists) {
                return res.status(400).json({ error: "Invalid role provided" });
            }

            // Create the user with the provided role
            await User.create({
                name,
                email,
                password,
                role  // Assign the role's ID to the user
            });

            return res.status(201).redirect("/login");
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }
};

module.exports = authController;
