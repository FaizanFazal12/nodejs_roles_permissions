const { getUser } = require("../services/auth");
const { getPermissionsFromDatabase } = require("../Controller/rolesAndPermissionsController.js");

async function checkforauthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if (!tokenCookie) {
        return next();
    }
    const token = tokenCookie;
    const user = getUser(token);
    req.user = user;

    // Retrieve permissions from the database based on user's ID
    const rolePermissions = await getPermissionsFromDatabase(user._id);

    // Check if the user has specific permissions
    const hasCreateLinksPermission = await rolePermissions.some(permission => permission.LinksCreate === true);
    const hasUpdateLinksPermission = await rolePermissions.some(permission => permission.LinksUpdate === true);
    const hasLinksDeletePermission = await rolePermissions.some(permission => permission.LinksDelete === true);
// console.log(hasCreateLinksPermission,hasUpdateLinksPermission)
    res.locals.hasCreateLinksPermission = hasCreateLinksPermission;
    res.locals.hasUpdateLinksPermission = hasUpdateLinksPermission;
    res.locals.hasLinksDeletePermission = hasLinksDeletePermission;

    return next();
}

function restrictToLogin(roles = []) {
    return function (req, res, next) {
        if (!req.user) {
            return res.redirect("/login");
        }
        if (!roles.includes(req.user.role)) {
            return res.status(401).send("Unauthorized");
        }
        return next();
    };
}

module.exports = {
    checkforauthentication,
    restrictToLogin
};
