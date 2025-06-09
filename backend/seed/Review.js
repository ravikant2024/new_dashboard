const Review = require("../models/Review");

const reviews = [
  {
    _id: "65c252e3dcd9253acfbaa76c",
    user: "65c2526fdcd9253acfbaa731",
    product: "66f254ac53bbe09c7c63fa54",
    rating: 5,
    comment:
      "Exceeded expectations! This phone is a game-changer. Lightning fast, stunning camera, incredible battery life. Best phone ever! ",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25339dcd9253acfbaa79e",
    user: "65c2526fdcd9253acfbaa731",
    product: "66f254ac53bbe09c7c63fa55",
    rating: 3,
    comment:
      "Good, not mind-blowing. Decent phone, not revolutionary. Average camera, battery life, performance.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c2535fdcd9253acfbaa7c9",
    user: "65c2526fdcd9253acfbaa731",
    product: "66f254ac53bbe09c7c63fa54",
    rating: 2,
    comment:
      "Short battery life. Needs more frequent charging than advertised, especially with heavy usage.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25380dcd9253acfbaa7df",
    user: "65c2526fdcd9253acfbaa731",
    product: "66f254ac53bbe09c7c63fa58",
    rating: 5,
    comment:
      "Multitasking master! Seamlessly handles all open apps and tasks. So happy with the performance!",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c253ebdcd9253acfbaa7f5",
    user: "65c2526fdcd9253acfbaa731",
    product: "66f254ac53bbe09c7c63fa58",
    rating: 5,
    comment:
      "Powerhouse performer! This laptop screams speed! Handles demanding tasks like video editing and gaming with ease. Blazing fast processor, smooth multitasking, never a lag in sight. Highly recommend for power users!",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25416dcd9253acfbaa80b",
    user: "65c2526fdcd9253acfbaa731",
    product: "66f254ac53bbe09c7c63fa58",
    rating: 3,
    comment:
      "Almost perfect, except... Love the sleek design, comfortable keyboard, and powerful performance. However, the lack of touch screen functionality is a slight letdown.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c2542cdcd9253acfbaa821",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f5994455",
    rating: 5,
    comment:
      "Travel buddy goals! Lightweight, slim design, and long battery life make this laptop the perfect travel companion. Explores the world with me without weighing me down. Bonus points for the spill-resistant keyboard (coffee accidents happen!)",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25443dcd9253acfbaa837",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f5994456",
    rating: 5,
    comment:
      "Content creator's dream! Stunning visuals, vibrant colors, and exceptional color accuracy - the display is a masterpiece! Perfect for photo editing, graphic design, and even casual content creation.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
  {
    _id: "65c25473dcd9253acfbaa84d",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e45902e12c44f5994457",
    rating: 3,
    comment:
      "Solid performer, but lacks pizzazz. Reliable and gets the job done, but the design feels a bit outdated and the display could be brighter. Good option for basic tasks at a reasonable price.",
    createdAt: "2024-02-07T10:25:58.424Z",
  },
 
];

exports.seedReview = async () => {
  try {
    await Review.insertMany(reviews);
    console.log("Review seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
