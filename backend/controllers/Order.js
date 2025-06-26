const Order = require("../models/Order");
const { sendMail } = require("../utils/Emails");
const User = require('../models/User');
const Product = require('../models/Product');
const PaymentManager = require("../classes/paymentManager");
const Credentails = require('../constants/config')
const mongoose = require('mongoose');
const shippingCharges=150;
exports.create = async (req, res) => {
    try {
        const { paymentResponse } = req.body;
        let verificationResult = await PaymentManager.checkPaymentResponse(paymentResponse);

        // If payment response code is not '00', consider it failed
        if (verificationResult.data.ResponseCode !== '00') {
            return res.status(400).json({ message: 'Payment verification failed' });
        }

        // If payment is successful, create the order
        const created = new Order({
            ...req.body,
            query: [], 
            paymentDetails: verificationResult.data
        });

        const savedOrder = await created.save();

        const productDetails = savedOrder.item.map(({ product, quantity }) => {
            const link = `${process.env.ORIGIN}/product-details/${product._id}`; 
            return `
                <li>
                    <b>Product:</b> <a href="${link}">${product.title}</a><br/>
                    <b>Description:</b> ${product.description}<br/>
                    <b>Price:</b> ₹${product.price}<br/>
                    <b>Quantity:</b> ${quantity}<br/>
                    <a href="${link}"><img src="${product.thumbnail}" alt="${product.title}" style="width:100px;height:auto;"/></a>
                    <br/>
                </li>
            `;
        }).join('');

        const orderDetails = `
            <h2>Order Confirmation</h2>
            <p>Thank you for your order! Here are your order details:</p>
            <ul>
                <li><b>Order ID:</b> ${savedOrder._id}</li>
                <li><b>Total Amount:</b> ₹${savedOrder.total}</li>
                <li><b>Payment Mode:</b> ${savedOrder.paymentMode}</li>
                <li><b>Mobile No:</b>${req.body.address.phoneNumber}</li>
                <li><b>Delivery Address:</b> ${req.body.address.street}, ${req.body.address.city}, ${req.body.address.state}, ${req.body.address.postalCode}, ${req.body.address.country}</li>
                <li><b>Date:</b> ${new Date(savedOrder.createdAt).toLocaleDateString()}</li>
            </ul>
            <h3>Products Ordered:</h3>
            <ul>${productDetails}</ul>
            <p>If you have any questions, feel free to contact us at engineering@orginv8.com.</p>
            <p>We hope to serve you again soon!</p>
        `;

        // Log order details before sending
        console.log(orderDetails);

        await sendMail(savedOrder.email, 'Order Confirmation', orderDetails);

        return res.status(201).json(savedOrder);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error creating an order, please try again later' });
    }
};


    exports.getByUserId = async (req, res) => {
        try {
            const { id } = req.params;
            const results = await Order.find({ user: id }).lean();
            const baseUrl = `${req.protocol}://${req.get('host')}`;

            const formattedResults = results.map(order => {
                // Update thumbnail if exists
                if (order.thumbnail) {
                    order.thumbnail = `${baseUrl}/${order.thumbnail}`;
                }
                if (Array.isArray(order.images)) {
                    order.images = order.images.map(image => `${baseUrl}/${image}`);
                }
                return order;
            });

            res.status(200).json(formattedResults);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ message: 'Error fetching orders, please try again later' });
        }
    };

exports.getAll = async (req, res) => {
    try {
        let skip = 0;
        let limit = 0;

        if (req.query.page && req.query.limit) {
            const pageSize = req.query.limit;
            const page = req.query.page;
            skip = pageSize * (page - 1);
            limit = pageSize;
        }

        const totalDocs = await Order.find({}).countDocuments().exec();
        const results = await Order.find({}).skip(skip).limit(limit).exec();
        res.header("X-Total-Count", totalDocs);
        res.status(200).json(results);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching orders, please try again later' });
    }
};

exports.updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Order.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating order, please try again later' });
    }
};

exports.addMessage = async (req, res) => {
    try {

        const { sender, content, orderId } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { $push: { query: { sender, content } } },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding message, please try again later' });
    }
};
exports.initiatePayment = async (req, res) => {

    try {
        const { userId, products, returnUrl, guestFlag,total } = req.body; 
        let userData, totalAmount = 0, orderInfo = "";
        let id = new mongoose.Types.ObjectId(userId);
        if (!guestFlag) {
            // Convert userId to ObjectId
            userData = await User.findById(id);
            if (!userData) {
                return res.status(404).json({ message: 'User not found' });
            }
        }
        orderInfo += `orderisfromoillp`;

        // Iterate over the products array to calculate the total amount and order details
        for (let item of products) {
            const { productId, quantity } = item;
            // Convert productId to ObjectId
            id = new mongoose.Types.ObjectId(productId);
            const productData = await Product.findById(id);
            if (!productData) {
                return res.status(404).json({ message: `Product with ID ${productId} not found` });
            }
            totalAmount += productData.price * quantity;
        }
        totalAmount=totalAmount+totalAmount*0.18;
        totalAmount=1 ;//totalAmount+shippingCharges;
        // Prepare payment data for PaymentManager
        const paymentData = {
            txnRefNo: `TXN${new Date().getTime()}`,
            merchantId: Credentails.payemntCredentials.MERCHANTID,
            terminalId: Credentails.payemntCredentials.TERMINALID,
            currency: 356,
            // amount: `${totalAmount}`,
            amount: `${total}`,
            orderInfo: orderInfo,
            email: guestFlag ? req.body.email : userData.email,
            firstName: guestFlag ? req.body.name : userData.name,
            lastName: guestFlag ? req.body.name : userData.name,
            city: req.body.address.city,
            state: req.body.address.state,
            street: 1234,
            zip: req.body.address.postalCode,
            phone: req.body.address.phoneNumber,
            returnUrl: returnUrl,
            udf: {
                udf1: JSON.stringify(products).replace(" ", ""), 
                udf2: returnUrl,
            },
        };

        // Initiate payment with PaymentManager
        const response = await PaymentManager.initiatePayment(paymentData);
        if (response.status === true) {
            res.status(200).json({
                message: 'Payment initiated successfully',
                gatewayURL: 'https://paypg.icicibank.com/accesspoint/angularBackEnd/requestproxypass',
                EncData: response.data.EncData,
                data: response.data.data,
            });
        } else {
            res.status(400).json({ message: 'Payment initiation failed', details: response });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating payment' });
    }
};


exports.fetchOrderById = async (req, res) => {
    try {
        const orderId = req.query.orderId;
        const orderData = await Order.findById(orderId).lean();  // use .lean() for performance and easy modification

        if (orderData) {
            const baseUrl = `${req.protocol}://${req.get('host')}`;

            if (orderData.thumbnail) {
                orderData.thumbnail = `${baseUrl}/${orderData.thumbnail}`;
            }
            if (Array.isArray(orderData.images)) {
                orderData.images = orderData.images.map(image => `${baseUrl}/${image}`);
            }

            res.status(200).json({ data: orderData });
        } else {
            res.status(200).json({
                data: {},
                message: "No order found"
            });
        }
    } catch (e) {
        console.error('Error fetching order by ID:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
};
