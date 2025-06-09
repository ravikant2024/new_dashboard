const waChat = require("../models/waChat");
const Message = require("../models/Message");
const Order = require("../models/Order");
const mongoose = require("mongoose");
const AIHandler = require("./aiManager");
const NatsManager = require("./natsConnectionManager");
const axios=require('axios');
class ChatManager {
    static async handleMessage(phoneNumber, message,) {
        try {
            console.log("recieved data is ",phoneNumber,message);
            const orderId = await this.extractOrderId(message);
            // if (!orderId) {
            //     console.error("No valid orderId found in the message.");
            //     return;
            // }

            const isNewChat = await this.checkNew(phoneNumber);
            if (isNewChat && !orderId) {
                console.log("-------> 1 ",isNewChat,orderId);
                await this.askOrderId(phoneNumber, message);
            }
            else if (isNewChat && orderId) {
                console.log("-------> 2 ",isNewChat,orderId);
                await this.createNewChat(phoneNumber, orderId, message);
                await this.sendAiResponse(phoneNumber, orderId, message);
            } else {
                console.log("-------> 3 ",isNewChat,orderId,message);
                await this.processExistingChat(phoneNumber, message);
            }
        } catch (e) {
            console.error("Error handling message:", e);
        }
    }

    static async extractOrderId(message) {
       let aiResponse=await AIHandler.fetchOrderIdFromQuery(message);
        console.log("---->>> returning null since there is no order Id ",aiResponse);
        if(aiResponse){
        return aiResponse.orderId;
        }else{
            return null;
        }
        // const match = message.match(/orderId:\s*(\w+)/i);
        // return match ? match[1] : null;
    }

    static async checkNew(phoneNumber) {
        try {
            const chat = await waChat.findOne({ phoneNumber });
            return !chat;
        } catch (e) {
            console.error("Error checking chat:", e);
            throw e;
        }
    }

    static async createNewChat(phoneNumber, orderId, message) {
        try {
            
            const orderDetails = await this.extractOrderDetails(orderId);

            const newChat = new waChat({
                _id: new mongoose.Types.ObjectId().toString(),
                phoneNumber,
                orderDetails: orderDetails,
                customerData: { firstMessage: message },
                activeFlag: false,
            });
            await newChat.save();
        } catch (e) {
            console.error("Error creating new chat:", e);
            throw e;
        }
    }

    static async processExistingChat(phoneNumber, message) {
        try {
            const chat = await waChat.findOne({ phoneNumber });
            if (chat.activeFlag) {
             console.log("active chat");
                await this.forwardToOps(phoneNumber, message, chat.orderDetails._id); // Pass orderId to forwardToOps
            } else {
                console.log("normal chat ",message) ;
                await this.sendAiResponse(phoneNumber, chat.orderDetails._id, message);
            }
        } catch (e) {
            console.error("Error processing existing chat:", e);
            throw e;
        }
    }

    static async sendAiResponse(phoneNumber, orderId, message) {
        try {

            const aiResponse = await AIHandler.generateResponse(message);
            if (aiResponse.error) {
                console.error("AI Response Error:", aiResponse.error);
                return;
            }

            if (aiResponse.track_ticket) {
                console.log("---->> track ticket");
                await this.forwardToOps(phoneNumber, aiResponse.answer, orderId);
                await this.updateChatTrackFlag(phoneNumber, true);
            } else {
                console.log("---->> don't track ticket");
                await this.sendResponseToUser(phoneNumber, aiResponse.answer);
            }

        } catch (e) {
            console.error("Error sending AI response:", e);
        }
    }

    static async askOrderId(phoneNumber, message) {
        try {

            const aiResponse = await AIHandler.askOrderIdResponse(message);
            if (aiResponse.error) {
                console.error("AI Response Error:", aiResponse.error);
                return;
            }


            await this.sendResponseToUser(phoneNumber, aiResponse.answer);


        } catch (e) {
            console.error("Error sending AI response:", e);
        }
    }


    static async forwardToOps(phoneNumber, message, orderId) {
        try {
            console.log(`Forwarding message from ${phoneNumber} to ops: ${message}`);
await this.sendResponseToUser(phoneNumber,messgae);
            // Fetch the order details using the extracted orderId
            const orderDetails = await this.extractOrderDetails(orderId);

            // Assuming orderDetails is a valid object, forward message and order to ops
            const opsMessage = {
                message: message,
                orderDetails: orderDetails, // Attach the full order details
                phoneNumber: phoneNumber,
            };

            // Save the forwarded message to the Message collection
            const newMessage = new Message({
                _id: new mongoose.Types.ObjectId().toString(),
                orderId,
                messageType: "text", // Assuming it's a text message
                messageData: message,
                isOps: true, // This is forwarded to ops
                iswa: true,
            });

            await newMessage.save();
            console.log('Message forwarded to ops and saved:', newMessage);
        } catch (e) {
            console.error("Error forwarding message to ops:", e);
            throw e;
        }
    }

    static async extractOrderDetails(orderId) {
        try {
            let orderData = await Order.findById(orderId);
            if (orderData) {
                console.log("---->>> order data is ",orderData); // Log order data for debugging purposes
               return orderData; // Return order details
               //return null;
            } else {
                console.error("Order not found:", orderId);
                return null;
            }
        } catch (e) {
            console.log("Error extracting order details:", e);
            return null;
        }
    }

    static async sendResponseToUser(phoneNumber, response) {
        try {
            await NatsManager.publish("chat.messages",response);
            let axiosResponse=await axios.post("https://working-aware-cheshire.glitch.me/sendMessage",{
                phoneNumber:phoneNumber,
                message:response,
                businessPhoneNumberId:"533563069831841"
            })
            // let axiosResponse=await axios.post(`https://graph.facebook.com/v21.0/533563069831841/messages`,{
            //     messaging_product: "whatsapp",
            //     to: phoneNumber,
            //     text: { body: response }
            //   },
            //   {
            //      headers: {
            //       Authorization: "Bearer EAAPCwLok8ZCgBO3Ba8WVrUeE84gKtF5bEP1KFptRfUsGV8lk3sEFeZCw5FdbWOhAVdFQbOVbejZBTpa9V3m606J0nlqsluiYzL8oAzZCD24oAi2lAQ9xeHxHnsQ4maMkrXd5RT1TAsZBD4VQzKDJgg3VvSpSzWQsy2qPAzVp1pCtSblhVZBiwQsGB9U2z928ZBTiAZDZD",
            //     }
            // }
            
            // );
               
            //     url: https://graph.facebook.com/v21.0/${data.businessPhoneNumberId}/messages,
            //     headers: {
            //       Authorization: Bearer ${GRAPH_API_TOKEN},
            //     },
            //     data: {
            //       messaging_product: "whatsapp",
            //       to: data.phoneNumber,
            //       text: { body: data.message }
            //     },
            //   });
            console.log(`Sending response to user ${phoneNumber}: ${response}`,);
        } catch (e) {
            console.error("Error sending response to user:", );
            throw e;
        }
    }

    static async updateChatTrackFlag(phoneNumber, trackFlag) {
        try {
            await waChat.updateOne({ phoneNumber }, { activeFlag: trackFlag });
        } catch (e) {
            console.error("Error updating tracking flag:", e);
            throw e;
        }
    }
}

module.exports = ChatManager;
