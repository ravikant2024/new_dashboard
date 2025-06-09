const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
require("dotenv/config");

class AIHandler {

    
    static model = new ChatGoogleGenerativeAI({
        model: "gemini-pro",
        maxOutputTokens: 2048,
        apiKey: process.env.GOOGLE_GENAI_API_KEY || "AIzaSyAjmy-YUcKTahH022XMGpeci4XlcP7BznI" // Avoid hardcoding sensitive data
    });

    static async generateResponse(query) {
        console.log("query is ",query);
        const prompt = `
        You are an expert help center assistant named Kalyan for switch-related products for Original Innovation LLP company. 
        Answer the query concisely and decide whether it requires tracking a support ticket. 
        Provide your response in the following JSON format:
        {
          "answer": "Your answer to the query here.",
          "track_ticket": true/false
        }
        
        Query: ${query}
        `;

        try {
            const response = await AIHandler.model.invoke(prompt); // Generate response
            console.log(response.content);
            const result = JSON.parse(response.content); // Parse JSON output
            return result;
        } catch (error) {
            console.error("AI Error: ", error.message);
            return {
                error: error.message,
                answer: "Sorry, I could not process your request.",
                track_ticket: false
            };
        }
    }
    static async askOrderIdResponse(query) {
        const prompt = `
        You are an expert help center assistant named Kalyan for switch-related products for Original Innovation LLP company. 
        Answer the query concisely and ask user for orderId. 
        Provide your response in the following JSON format:
        {
          "answer": "Your answer to the query here.",
          "track_ticket": false
        }
        
        Query: ${query}
        `;

        try {
            const response = await AIHandler.model.invoke(prompt); // Generate response
            const result = JSON.parse(response.content); // Parse JSON output
            return result;
        } catch (error) {
            console.error("AI Error: ", error.message);
            return {
                error: error.message,
                answer: "Sorry, I could not process your request.",
                track_ticket: false
            };
        }
    }
    static async fetchOrderIdFromQuery(query) {
        const prompt = `
        parse orderId from given query and return  it or else return null in json format
         Provide your response in one word:
    
        Query: ${query}
        `;

        try {
            const response = await AIHandler.model.invoke(prompt); // Generate 
            console.log("---->>  ai response is ",response.content);
            let cleanedResponse = response.content;

            // Remove any markdown formatting or extra characters that aren't part of the JSON
            cleanedResponse = cleanedResponse.replace(/```json|\n|\`/g, '').trim();
    
            const result = JSON.parse(cleanedResponse); // Parse JSON output
            return result;
        } catch (error) {
            console.error("AI Error: ", error.message);
            return {
                error: error.message,
                answer: "Sorry, I could not process your request.",
                track_ticket: false
            };
        }
    }
}

module.exports = AIHandler;
