// controllers/rolesAndPermissionsController.js

const Role = require('../models/Role'); // Corrected import path
const User = require('../models/User'); // Corrected import path
const Permission= require("../models/Permissions")

// Function to create a new role

// Function to retrieve all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate('permissions');
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function getPermissionsFromDatabase(userId) {
  try {
    const user = await User.findById(userId).populate('role');

    if (!user || !user.role) {
      return null; // Handle the case where user or role is not found
    }

    const permissions = user.role.permissions;
    const permissionsDetails = await Promise.all(permissions.map(permissionId => Permission.findById(permissionId)));

    const mappedPermissions = permissionsDetails.map(permission => ({
      LinksCreate: permission.LinksCreate,
      LinksUpdate: permission.LinksUpdate,
      LinksDelete:permission.LinksDelete

      // Add other permissions as needed
    }));

    console.log('Permissions:', mappedPermissions);

    return mappedPermissions;
  } catch (error) {
    console.error(error);
    return null;
  }
}






module.exports = { getAllRoles, getPermissionsFromDatabase };
