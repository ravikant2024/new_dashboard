const WebSocket = require('ws');
const { v4: uuidv4, v4 } = require('uuid');
const NatsManager = require('../classes/natsConnectionManager');
const { connectToDB } = require('../database/db');
const Devicenosql = require('../models/Devicenosql')

const { Client } = require('@elastic/elasticsearch');

class DeviceConnectionManager {
    static clients = new Map(); 
    static pendingRequests = new Map();
    static esClient = null;
    static async initialize() {
        connectToDB();
        let natsConnectionStatus = await NatsManager.initialize();
        if (natsConnectionStatus) {
            console.log("NATS connection established successfully");
        } else {
            console.log("NATS connection failed");
        }
        await setTimeout(()=>{},10000);
        this.esClient = new Client({ node: 'http://elastic_search:9200' });
        try {
            await this.esClient.info();
            console.log('Connected to Elasticsearch successfully.');
        } catch (error) {
            console.error('Error connecting to Elasticsearch:', error);
        }

        const wss = new WebSocket.Server({ port: 6060 });
        wss.on('connection', (ws, req) => this.handleConnection(ws, req));
        console.log('WebSocket server is running on ws://localhost:6060');
    }
    static async logToElasticsearch(index, macAddress, level, message, additionalData = {}) {
        try {
            const logEntry = {
                macAddress,
                level,
                message,
                ...additionalData,
                timestamp: new Date().toISOString(),
               
            };

            await this.esClient.index({
                index,
                body: logEntry,
            });

            console.log(`Logged to Elasticsearch:`, logEntry);
        } catch (error) {
            console.error('Error logging to Elasticsearch:', error);
        }
    }
    static async subscribeToDevice(macAddress) {
        const subject = macAddress;

        if (!this.pendingRequests) {
            this.pendingRequests = new Map();
        }


        NatsManager.reply(subject, async (msg) => {
            const requestMessage = JSON.parse(NatsManager.sc.decode(msg.data));
            const client = this.clients.get(macAddress);
            const key = v4();

            const { deviceMessage } = requestMessage;

            if (client) {
                console.log(`Received request on ${subject}: ${JSON.stringify(requestMessage)}  client state ${client.socket.readyState}`);

                // if (deviceMessage.command == 'ping') {
                //     msg.respond(NatsManager.sc.encode(JSON.stringify({ status: 'success', ping: client.socket.readyState,message:client.status })));
                // } else {
                const requestId = key;// Generate unique ID
                deviceMessage.requestId = requestId; 
                console.log("----setting request id is ", requestId);
                return new Promise((resolve, reject) => {
                    if (this.pendingRequests.has(requestId)) {
                        this.pendingRequests.delete(requestId);
                        console.log(`Removed previous pending request for ${requestId}`);
                    }
                    this.pendingRequests.set(requestId, { resolve, reject });
                    client.socket.send(JSON.stringify(deviceMessage)+'\r\n');
                    console.log(`Sent message to ${macAddress}:`, deviceMessage);
                    setTimeout(() => {
                        if (this.pendingRequests.has(requestId)) {
                            console.log(`Timeout for requestId: ${requestId}`);
                            this.pendingRequests.delete(requestId);
                            msg.respond(NatsManager.sc.encode(JSON.stringify({ status: 'failure' })));
                        } else {
                            msg.respond(NatsManager.sc.encode(JSON.stringify({ status: 'success' })));
                        }
                    }, 2000); 
                });
            }
            // } else {
            //     console.error(`Client with MAC ${macAddress} is not connected`,client);
            //     msg.respond(NatsManager.sc.encode(JSON.stringify({ status: 'failure', error: 'Client not connected', ping: 0 ,message:client.status})));
            // }
        });

        console.log(`Listening for requests on subject ${subject}`);
    }
 
    static async updateSelectedCapabilities(macId, { selectedCapabilities }) {
        try {
            if (!macId || !selectedCapabilities || typeof selectedCapabilities !== 'object') {
                throw new Error("Invalid parameters: macId and selectedCapabilities are required.");
            }
            const client = this.clients.get(macId);

            console.log(`Updating capabilities for MAC ID: ${macId}`);
            console.log(`Selected Capabilities: ${JSON.stringify(selectedCapabilities)}`);

            const device = await Devicenosql.findOne({ macId });

            if (!device) {
                throw new Error("Device not found in the database.");
            }

            const newUpdate = {
                update: selectedCapabilities,
                updatedAt: new Date(),
            };
            device.selectedCapabilities.push(newUpdate);

            if (device.selectedCapabilities.length > 50) {
                device.selectedCapabilities = device.selectedCapabilities.slice(-50);
            }

            await device.save();
            await this.logToElasticsearch('device-logs', macId, 'info', 'Capabilities updated', selectedCapabilities);
            console.log("Device updated successfully:");
            //await this.zipLogs(macId); 
            return {
                message: "Selected capabilities updated successfully.",
                device,
            };
        } catch (error) {
            console.error('Error updating selected capabilities:', error);
            throw error;
        }
    }
  
    static handleConnection(ws, req) {
        const macAddress = req.url.split('mac=')[1];

        if (!macAddress) {
            ws.close();
            console.log('Connection closed: MAC address not provided.');
            return;
        }
        if (this.clients.has(macAddress)) {
            this.clients.delete(macAddress);
            console.log(`Removed previous client with MAC ${macAddress}`);
        }
       
        this.clients.set(macAddress, {
            id: uuidv4(),
            socket: ws,
            status: 'connected',
          
            currentDate: new Date().toISOString().split('T')[0], 
        });


        console.log(`Device with MAC ${macAddress} connected---->`, this.clients.size);

        this.subscribeToDevice(macAddress);

        ws.on('message', async (message) => {
            try {
                console.log(`Message from ${macAddress}: ${message}`);
                const parsedMessage = JSON.parse(message);

                const { requestId } = parsedMessage;
                console.log("-----------------request Id is ", requestId, this.pendingRequests.has(requestId));
                if (requestId && this.pendingRequests.has(requestId)) {
                    const { resolve } = this.pendingRequests.get(requestId);
                    this.pendingRequests.delete(requestId);
                    console.log("------------------------deleting key since message recieved");

                } else {

                    const { macId, selectedCapabilities } = parsedMessage;
                    if (!macId || !selectedCapabilities || typeof selectedCapabilities !== 'object') {
                        console.error(`Invalid message format from ${macAddress}:`, parsedMessage);
                        return;
                    }

                    try {
                        await this.updateSelectedCapabilities(macId, parsedMessage);
                        console.log(`Updated capabilities for MAC ${macAddress} successfully.`);
                    } catch (err) {
                        console.error(`Failed to update capabilities for MAC ${macAddress}:`, err);
                    }
                }
            } catch (err) {
                console.error(`Error processing message from ${macAddress}:`, err);
            }
        });

        ws.on('close', () => {
            console.log(`Device with MAC ${macAddress} disconnected`);
            NatsManager.unsubscribe(macAddress);
            //this.clients.delete(macAddress);
        });

        ws.on('error', (error) => {
            console.log(`Error on device with MAC ${macAddress}: ${error.message}`);
        });

        ws.send(JSON.stringify({ message: `Welcome device with MAC ${macAddress}` }));
    }

}

(async () => {
    await DeviceConnectionManager.initialize();
})();
