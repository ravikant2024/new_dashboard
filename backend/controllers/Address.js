const Address = require("../models/Address");
const { normalizeState, toTitleCase } = require("../utils/StringConvertion");

exports.create = async (req, res) => {
    try {
        const { state, city, country, ...rest } = req.body;
        const normalizedState = normalizeState(state);
        const formattedCity = toTitleCase(city);
        const formattedCountry = toTitleCase(country);
        const address = new Address({
            ...rest,
            state: normalizedState,
            city: formattedCity,
            country: formattedCountry
        });

        await address.save();

        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({ message: 'Error adding address, please try again later' });
    }
};
exports.getByUserId = async (req, res) => {
    try {
        const { id } = req.params
        const results = await Address.find({ user: id })
        res.status(200).json(results)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching addresses, please try again later' })
    }
};

exports.updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = { ...req.body };

        if (updatedData.state) {
            updatedData.state = normalizeState(updatedData.state);
        }

        if (updatedData.city) {
            updatedData.city = toTitleCase(updatedData.city);
        }

        if (updatedData.country) {
            updatedData.country = toTitleCase(updatedData.country);
        }

        const updated = await Address.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating address, please try again later' });
    }
};


exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Address.findByIdAndDelete(id)
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting address, please try again later' })
    }
}


