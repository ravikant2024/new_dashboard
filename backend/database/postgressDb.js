require('dotenv').config();
const { Sequelize } = require('sequelize');

const { initializeDeviceModel } = require('../models/Devices');
class PostgressManager {
    static sequelize = null;

    static async connectToPostgressDB() {
        try {
            if (!this.sequelize) {
                this.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
                    host: process.env.DB_HOST || 'localhost',
                    dialect: 'postgres',
                });
                await this.sequelize.authenticate();
                console.log('Connection has been established successfully.');
                // await this.sequelize.sync();
                // console.log(' table sync has been done.');
                
            }
            return this.sequelize; // Return the instance when called
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }
    }
    static async getPostgressConnection() {
        try {
            if (!this.sequelize) {
                await this.connectToPostgressDB(); // Reconnect if connection is null
            }
            return this.sequelize;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = PostgressManager;







