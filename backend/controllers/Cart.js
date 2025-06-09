const Cart = require('../models/Cart');

// ✅ Helper to append base URL to product thumbnail
function appendBaseUrlToThumbnail(cartItems, baseUrl) {
    if (!Array.isArray(cartItems)) cartItems = [cartItems];
    cartItems.forEach(item => {
        if (item?.product?.thumbnail && !item.product.thumbnail.startsWith('http')) {
            item.product.thumbnail = `${baseUrl}/${item.product.thumbnail}`;
        }
    });
}

// ✅ Create a new cart item
exports.create = async (req, res) => {
    try {
        const cartItem = new Cart(req.body);
        await cartItem.save();

        const populated = await cartItem.populate({
            path: "product",
            populate: { path: "brand" }
        });

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        appendBaseUrlToThumbnail(populated, baseUrl);

        res.status(201).json(populated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding product to cart, please try again later' });
    }
};

// ✅ Get all cart items for a user
exports.getByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const cartItems = await Cart.find({ user: id }).populate({
            path: "product",
            populate: { path: "brand" }
        });

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        appendBaseUrlToThumbnail(cartItems, baseUrl);

        res.status(200).json(cartItems);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching cart items, please try again later' });
    }
};

// ✅ Update a cart item by ID
exports.updateById = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.body.quantity && req.body.quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be greater than 0' });
        }

        const updatedCartItem = await Cart.findByIdAndUpdate(id, req.body, { new: true }).populate({
            path: "product",
            populate: { path: "brand" }
        });

        if (!updatedCartItem || !updatedCartItem.product) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        appendBaseUrlToThumbnail(updatedCartItem, baseUrl);

        res.status(200).json(updatedCartItem);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Error updating cart item, please try again later' });
    }
};

// ✅ Delete a single cart item by ID
exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Cart.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json(deleted);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting cart item, please try again later' });
    }
};

// ✅ Delete all cart items for a user
exports.deleteByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        await Cart.deleteMany({ user: id });
        res.sendStatus(204); // No content
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error resetting your cart, please try again later' });
    }
};
