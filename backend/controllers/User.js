const bcrypt = require('bcryptjs');
const User=require("../models/User")

exports.getById=async(req,res)=>{
    try {
        const {id}=req.params
        const result=(await User.findById(id)).toObject()
        delete result.password
        console.log(result);
        res.status(200).json(result)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting your details, please try again later'})
    }
}

// exports.updateById=async(req,res)=>{
//     try {
//         const {id}=req.params
//         const updated=(await User.findByIdAndUpdate(id,req.body,{new:true})).toObject()
//         delete updated.password
//         res.status(200).json(updated)

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:'Error getting your details, please try again later'})
//     }
// }
exports.updateById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if password is being updated
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);  
            req.body.password = await bcrypt.hash(req.body.password, salt);  
        }

        // Update the user data
        const updated = (await User.findByIdAndUpdate(id, req.body, { new: true })).toObject();
        delete updated.password; 
        res.status(200).json(updated);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating your details, please try again later' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find(); 
      res.status(200).json(users); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  };

 // Update User Role by ID
exports.updateUserRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;  

        // Ensure role is one of the valid roles
        const validRoles = ['Admin', 'Subadmin', 'Ops', 'Normal User'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Reset all roles to false
        const roleUpdate = {
            isAdmin: false,
            isSubAdmin: false,
            isOps: false
        };

        // Set the respective role to true
        if (role === 'Admin') {
            roleUpdate.isAdmin = true;
        } else if (role === 'Subadmin') {
            roleUpdate.isSubAdmin = true;
        } else if (role === 'Ops') {
            roleUpdate.isOps = true;
        }

        // Find the user by ID and update their role
        const user = await User.findByIdAndUpdate(id, roleUpdate, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user role' });
    }
};
