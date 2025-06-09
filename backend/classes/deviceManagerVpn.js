// classes/deviceManager.js
const nacl = require('tweetnacl'); // Make sure to install tweetnacl
const { Buffer } = require('buffer');
const { getDeviceModel } = require('../models/Devices');
const SubAdminManager = require('./subAdminManager');
const axios = require('axios');
const Credentails = require('../constants/config');
// Function to generate WireGuard keys
const generateWireGuardKeys = () => {
    const keyPair = nacl.box.keyPair();
    const privateKey = Buffer.from(keyPair.secretKey).toString('base64');
    const publicKey = Buffer.from(keyPair.publicKey).toString('base64');

    return {
        privateKey,
        publicKey
    };
};

const generateUniqueIp = (existingIps) => {
    let ip;
    const baseIp = '10.0.'; // Base IP prefix

    // Loop through 256 subnets, each containing 256 IP addresses (10.0.0.x to 10.0.255.x)
    for (let subnet = 0; subnet < 256; subnet++) {
        for (let i = 2; i < 255; i++) {  // 10.0.x.0 and 10.0.x.1 are typically reserved
            ip = `${baseIp}${subnet}.${i}`;
            if (!existingIps.includes(ip)) {
                return ip; // Return the first available unique IP
            }
        }
    }

    throw new Error('No available IP addresses');
};


class DeviceManagerVpn {
    static async addDevice(macId, deviceModelno, availableCapabilities) {
        const Device = await getDeviceModel();
        let subAdminResponse = await SubAdminManager.checkSubAdminDevice(macId);

        if (subAdminResponse.success) {
            let subAdminId = subAdminResponse.id;

            // Generate WireGuard keys
            const { privateKey, publicKey } = generateWireGuardKeys();

            // Get existing IPs from the database
            const existingDevices = await Device.findAll({ attributes: ['vpnIp'] });
console.log(existingDevices);
            const existingIps = existingDevices.map(device => device.vpnIp);

            // Generate a unique IP address for this device
            const vpnIp = generateUniqueIp(existingIps);
            console.log(publicKey, privateKey)
            const newDevice = await Device.create({
                macId,
                deviceModelno,
                vpnIp, // Store the unique IP
                subAdminId,
                availableCapabilities, // Include available capabilities
                selectedCapabilities: availableCapabilities,
                clientPublicKey: publicKey,
                clientPrivateKey: privateKey, // Store the private key
            });
            try {
                const vpnServerResponse = await axios.post(`http://10.0.0.1:3000/add-peer`, {
                    publicKey: publicKey,
                    privateKey: privateKey,
                    vpnIp: vpnIp,
                }, {
    headers: {
        'Content-Type': 'application/json'
    }
});

                if (vpnServerResponse.status === 200) {
                    console.log('Device successfully added to WireGuard VPN.');
                } else {
                    console.log('Failed to add device to WireGuard VPN:', vpnServerResponse.data);
                }
            } catch (error) {
                console.error('Error while adding device to VPN server:', error);
                throw new Error('Failed to communicate with VPN server');
            }
            return {
                statusCode: 200,
                message: "Device added successfully",
                device: newDevice
            };
        } else {
            return {
                statusCode: 203,
                message: "Unable to find linked subadmin"
            };
        }
    }
}

module.exports = DeviceManager; // Ensure this line exports DeviceManager
