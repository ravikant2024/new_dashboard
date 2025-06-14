// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/Auth");
const productRoutes = require("./routes/Product");
const orderRoutes = require("./routes/Order");
const cartRoutes = require("./routes/Cart");
const brandRoutes = require("./routes/Brand");
const categoryRoutes = require("./routes/Category");
const userRoutes = require("./routes/User");
const addressRoutes = require('./routes/Address');
const reviewRoutes = require("./routes/Review");
const wishlistRoutes = require("./routes/Wishlist");
const deviceRoutes = require("./routes/Device");
const subadminRoutes=require('./routes/SubAdmin');
const otaRoutes=require('./routes/Ota');
const opsRoutes=require('./routes/Ops');
const saleRoutes=require('./routes/Sale'); 
const chatRoutes=require('./routes/Chat'); 
const messageRoutes=require('./routes/Message'); 
const waRoutes=require('./routes/Wahandler');
const PostgressManager = require('./database/postgressDb');
const {connectToDB} = require('./database/db');
const { initializeDeviceModel } = require('./models/Devices');
const SubAdmin = require('./models/SubAdmin');
const fs=require('fs');
var http = require('http');
const https = require('https');
const NatsManager = require('./classes/natsConnectionManager');
const { faker } = require('@faker-js/faker');
const SearchManager  = require('./classes/searchManager');
const couponRoutes = require('./routes/coupon');
const blogRoutes = require('./routes/Blog');
const commentRoutes = require('./routes/Comment');
const contactRoutes= require('./routes/ContactUs');
const bulkEnquiryRoutes = require('./routes/BulkEnquiry');
(async () => {
    const server = express();
    connectToDB()
    await SearchManager.init();
    try {
        await PostgressManager.connectToPostgressDB(); 
        await initializeDeviceModel();
    } catch (error) {
        console.error('Database connection failed:', error);
    }

    let natsConnectionStatus = await NatsManager.initialize();
    if (natsConnectionStatus) {
        console.log("NATS connection established successfully");
    } else {
        console.log("NATS connection failed");
    }

    server.use('/uploads', express.static('uploads'));
    
    server.use(cors({
        origin: '*',
        credentials: true,
        exposedHeaders: ['X-Total-Count'],
        methods: ['GET', 'POST', 'PATCH', 'DELETE']
    }));
    server.use((req, res, next) => {
        const suspiciousPatterns = [
            /\$\(.*\)/,  // Detects shell command injection pattern
            /`.*`/,      // Detects backticks used for command execution
            /;.*=/,      // Detects suspicious query strings like ;stok=
            /wget/,      // Detects use of 'wget' command
            /sh\b/,      // Detects 'sh' command for shell execution
            /\|.*\bsh\b/ // Detects piping commands to 'sh'
        ];
    
        const isSuspicious = suspiciousPatterns.some((pattern) => pattern.test(req.url));
    
        if (isSuspicious) {
            console.warn(`Blocked a suspicious request: ${req.url}`);
            return res.status(400).json({ error: 'Suspicious request detected and blocked.' });
        }
    
        next(); 
    });
    server.use(express.json());
    server.use(cookieParser());
    server.use(morgan("tiny"));
    const requestLogger = (req, res, next) => {
        console.log(`Method: ${req.method}`);
        console.log(`Path: ${req.path}`);
        console.log(`Query Params:`, req.query);
        console.log(`Request Body:`, req.body);
        const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('Client IP:', clientIp);
        next(); 
    };
    
    server.use(requestLogger);
    server.use("/auth", authRoutes);
    server.use("/users", userRoutes);
    server.use("/products", productRoutes);
    server.use("/orders", orderRoutes);
    server.use("/cart", cartRoutes);
    server.use("/brands", brandRoutes);
    server.use("/categories", categoryRoutes);
    server.use("/address", addressRoutes);
    server.use("/reviews", reviewRoutes);
    server.use("/wishlist", wishlistRoutes);
    server.use("/device", deviceRoutes);
    server.use("/subadmin",subadminRoutes);
    server.use("/ota",otaRoutes);
    server.use("/ops",opsRoutes);
    server.use("/sales",saleRoutes);
    server.use("/chat",chatRoutes);
    server.use("/message",messageRoutes);
    server.use("/wa",waRoutes);
    server.use('/coupon', couponRoutes);
    server.use('/blogs', blogRoutes);
    server.use("/comments",commentRoutes)
    server.use("/contactus",contactRoutes)
    server.use("/bulk-enquiry", bulkEnquiryRoutes);
    server.get("/", async (req, res) => {

        res.status(200).json({ message: 'Running' });
    });
    const sslOptions = {
        key: fs.readFileSync('./ssl/privkey.pem'),  // Path to your private key
        cert: fs.readFileSync('./ssl/cert.pem'), 
        ca:fs.readFileSync('./ssl/fullchain.pem')   // Path to your certificate
    };
    var httpServer = http.createServer(server);
    var httpsServer = https.createServer(sslOptions, server);
    
    httpServer.listen(8081);
    httpsServer.listen(8443);
})();
