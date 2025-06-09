const { connect, StringCodec } = require('nats');
const Credentails = require('../constants/config');

 class NatsManager {
    static nc = null;
    static sc = StringCodec();
    static activeSubscriptions = new Map(); 
    static async initialize() {
        try {
            
            this.nc =  await connect({
                servers: `${Credentails.natsIp}:${Credentails.natsPort}`,
                token:`${Credentails.natstoken}`,
                reconnect: true
            });
            console.log("Connected to NATS server");
            return true;
        } catch (e) {
            console.log("Error connecting to NATS server:", e);
            return false;
        }
    }

    static async getNatsConnection() {
        try {
            if (this.nc != null) {
                return this.nc;
            } else {
                await this.initialize();
                return this.nc;
            }
        } catch (e) {
            console.log("Error getting NATS connection:", e);
            return false;
        }
    }

    static async publish(subject, message) {
        try {
            const nc = await this.getNatsConnection();
            if (nc) {
                nc.publish(subject, this.sc.encode(message));
                console.log(`Message published to ${subject}`);
            }
        } catch (e) {
            console.log("Error publishing message:", e);
        }
    }
    static async subscribe(subject, callback) {
        try {

            const nc = await this.getNatsConnection();
            if (nc) {
                console.log("key is ",subject);
                const subscription = nc.subscribe(subject);
               
                    for await (const msg of subscription) {
                        const decodedMessage = this.sc.decode(msg.data);
                        console.log(`Received message: ${decodedMessage} on subject: ${subject}`);
                        callback(decodedMessage);
                    }
                    this.activeSubscriptions.set(subject, subscription);
                console.log(`Subscribed to ${subject}`);
            }
        } catch (e) {
            console.log("Error subscribing to subject:", e);
        }
    }
    static async request(subject, message, timeout = 10000) {
        try {
            const nc = await this.getNatsConnection();
            if (nc) {
                const response = await nc.request(subject, this.sc.encode(message), { timeout });
                const decodedResponse = this.sc.decode(response.data);
                console.log(`Received reply for ${subject}: ${decodedResponse}`);
                return decodedResponse;
            }
        } catch (e) {
            console.log("Error making request:", e);
            return null;
        }
    }

    static async reply(subject, handler) {
        try {
            const nc = await this.getNatsConnection();
            if (nc) {
                const subscription = nc.subscribe(subject);
                (async () => {
                    for await (const msg of subscription) {
                        try {
                            // Call the provided handler and pass the msg for replying
                             handler(msg);
                        } catch (err) {
                            console.error(`Error handling request on ${subject}:`, err.message);
                            if (msg.respond) {
                                msg.respond(NatsManager.sc.encode(JSON.stringify({ status: 'error', error: err.message })));
                            }
                        }
                    }
                })();
                this.activeSubscriptions.set(subject, subscription);
                console.log(`Listening for requests on ${subject}`);
            }
        } catch (e) {
            console.error(`Error replying to request on ${subject}:`, e.message);
        }
    }
    static async unsubscribe(subject) {
        try {
            const subscription = this.activeSubscriptions.get(subject); // Get stored subscription

            if (subscription) {
                subscription.unsubscribe(); // Unsubscribe from the subject
                this.activeSubscriptions.delete(subject); // Remove it from the map
                console.log(`Unsubscribed from ${subject}`);
            } else {
                console.warn(`No active subscription found for ${subject}`);
            }
        } catch (e) {
            console.error(`Error unsubscribing from ${subject}:`, e.message);
        }
    }
}
module.exports=NatsManager;