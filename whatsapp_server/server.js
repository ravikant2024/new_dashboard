/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import express from "express";
import axios from "axios";
import fs from 'fs';
import https from 'https'
import http from 'http';

const app = express();
//const macIdRegex = "[0-9A-F]{2}:[0-9A-F]{2}:[0-9A-F]{2}:[0-9A-F]{2}:[0-9A-F]{2}:[0-9A-F]{2}";
const deviceHandleRegex = new RegExp(
  `^Hi, I have activated my device\. Please provide me support for this device [0-9]+$`
);
app.use(express.json());

const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT } = process.env;

app.post("/webhook", async (req, res) => {
  // log incoming messages
  //console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));

  // check if the webhook request contains a message
  // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

  // check if the incoming message contains text
  if (message?.type === "text") {
    // extract the business number to send the reply from it
    const business_phone_number_id =
      req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
    const messageUrl = `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`;
    // Replace &nbsp with spaces
    message.text.body = message.text.body.replace(/\u00a0/g, " ");

    // if (["hi", "hola", "hello"].includes(message.text.body.toLowerCase())){
    if (["@@@@"].includes(message.text.body.toLowerCase())) {
      await axios({
        method: "POST",
        url: messageUrl,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: message.from,
          type: "template",
          template: {
            name: "hello_world",
            language: {
              code: "en_US",
            },
          },
        },
      });
    } else if (deviceHandleRegex.test(message.text.body)) {
      let deviceId = message.text.body.substring(74);
      console.log(deviceId);
      let deviceData = [];
      await axios({
        method: "GET",
        url: `http://node_server:8081/device/fetchDeviceById/?id=${deviceId}`,
      })
        .then(async function (response) {
          console.log(response);
          deviceData = response?.data;
          if (response.status === 200) {
            const deviceName = deviceData["deviceName"] || "PoE_Switch";
            const documentId = deviceData["documentId"] || "1137731938006130";
            await axios({
              method: "POST",
              url: `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`,
              headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
              },
              data: {
                messaging_product: "whatsapp",
                to: message.from,
                type: "template",
                template: {
                  name: "purchase_receipt_1",
                  language: {
                    code: "en_US",
                  },
                  components: [
                    {
                      type: "header",
                      parameters: [
                        {
                          type: "document",
                          document: {
                            filename: `${deviceName}_Quick_Start_Guide.pdf`,
                            id: "1137731938006130",
                          },
                        },
                      ],
                    },
                    {
                      type: "body",
                      parameters: [
                        {
                          type: "text",
                          text: deviceName,
                        },
                        {
                          type: "text",
                          text: deviceId,
                        },
                      ],
                    },
                  ],
                },
                context: {
                  message_id: message.id, // shows the message as a reply to the original user message
                },
              },
            });
          } else {
            await axios({
              method: "POST",
              url: `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`,
              headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
              },
              data: {
                messaging_product: "whatsapp",
                to: message.from,
                text: {
                  body: `Device with ID:${deviceId} has not been registered on our system. Please check device ID and try again later.`,
                },
                context: {
                  message_id: message.id, // shows the message as a reply to the original user message
                },
              },
            });
          }
        })
        .catch(function (error) {
          console.log("error: " + JSON.stringify(error));
        });
    } else {
      await axios({
        method: "POST",
        url: "http://node_server:8081/wa/processMessage",
        data: {
          phoneNumber: message.from,
          message: message.text.body,
        },
      });
    }

    // mark incoming message as read
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        status: "read",
        message_id: message.id,
      },
    });
  }

  res.sendStatus(200);
});

app.post("/sendMessage", async (req, res) => {
  try {
    const data = req.body;
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v21.0/${data.businessPhoneNumberId}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        to: data.phoneNumber,
        text: { body: data.message },
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    // respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
});

app.get("/", (req, res) => {
  console.log(`Server is recieving data on port: ${PORT}`);
  res.send(`<pre>Nothing to see here.
Checkout README.md to start.</pre>`);
});

// app.listen(PORT, () => {
//   console.log(`Server is listening on port: ${PORT}`);
// });
 
const sslOptions = {
  key: fs.readFileSync('./ssl/privkey.pem'),  // Path to your private key
  cert: fs.readFileSync('./ssl/cert.pem'), 
  ca:fs.readFileSync('./ssl/fullchain.pem')   // Path to your certificate
};
var httpServer = http.createServer(app);
var httpsServer = https.createServer(sslOptions, app);
 
httpServer.listen(6163);
httpsServer.listen(6162);
console.log("http and https ports are 6163,6162",)