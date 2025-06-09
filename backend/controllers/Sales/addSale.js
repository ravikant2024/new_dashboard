
const Sale=require('../../models/Sale')
exports.addSale = async (req, res) => {
    try {
        const { subadminId, orderId, devices } = req.body;

        if (!subadminId || !orderId || !devices || !Array.isArray(devices)) {
            return res.status(400).json({ message: 'Invalid input. Ensure all fields are provided and devices is an array.' });
        }

        for (const device of devices) {
            const { macId, name, expireDate, mfgDate } = device;
            if (!macId || !name || !expireDate || !mfgDate) {
                return res.status(400).json({ message: 'Invalid device data. Ensure all fields are provided for each device.' });
            }
        }

        const newSale = new Sale({
            subadminId,
            orderId,
            devices,
        });

        await newSale.save();

        res.status(201).json({ message: 'Sale added successfully', sale: newSale });
    } catch (error) {
        console.error('Error adding sale:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


