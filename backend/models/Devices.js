const { DataTypes } = require('sequelize');
const PostgressManager = require('../database/postgressDb');

let Device;

const initializeDeviceModel = async () => {
    const sequelize = await PostgressManager.getPostgressConnection();
    // Define the Device model
    Device = sequelize.define('Device', {
        macId: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        deviceModelno: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subAdminId: {
            type: DataTypes.STRING,
            allowNull: false,
            foreignKey: true, 
        },
        availableCapabilities: {
            type: DataTypes.JSONB,  
            allowNull: false,
        },
        selectedCapabilities: {
            type: DataTypes.JSONB,  
            allowNull: false,
        },

    });

    // Synchronize the model with the database
   // await sequelize.sync({ force: true });
    console.log('Device table has been synchronized.');
};

const getDeviceModel = async () => {
    if (!Device) {
        await initializeDeviceModel();
    }
    return Device;
};

module.exports = {
    initializeDeviceModel,
    getDeviceModel,
};
