const Category = require("../models/Category");

const categories = [
  { _id: "65a7e24602e12c44f599443a", name: "poe-injectors" },
  { _id: "65a7e24602e12c44f599443b", name: "power-supply" },
  { _id: "65a7e24602e12c44f599443c", name: "routers" },
  { _id: "65a7e24602e12c44f599443d", name: "gateways" },
  { _id: "65a7e24602e12c44f599443e", name: "modules" },
  { _id: "65a7e24602e12c44f599443f", name: "switches" },
  
];

exports.seedCategory = async () => {
  try {
    await Category.insertMany(categories);
    console.log("Category seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
