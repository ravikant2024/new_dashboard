const Cart = require("../models/Cart");

const cartItems = [
  {
    _id: "65c357fe2f21c40d167c276b",
    user: "65b8e564ea5ce114184ccb96",
    product: "66f254ac53bbe09c7c63fa56",
    quantity: 1,
  },
  {
    _id: "65c3581d2f21c40d167c278f",
    user: "65b8e564ea5ce114184ccb96",
    product: "66f254ac53bbe09c7c63fa58",
    quantity: 4,
  },
  {
    _id: "65c3584f2f21c40d167c27f5",
    user: "65b8e564ea5ce114184ccb96",
    product: "66f254ac53bbe09c7c63fa54",
    quantity: 2,
  },
];

exports.seedCart = async () => {
  try {
    await Cart.insertMany(cartItems);
    console.log("Cart seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
