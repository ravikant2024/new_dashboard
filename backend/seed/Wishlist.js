const Wishlist = require("../models/Wishlist");

const wishlistItem = [
  {
    _id: "65c2441232078478e340ab60",
    user: "65b8e564ea5ce114184ccb96",
    product: "66f254ac53bbe09c7c63fa58",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Can't. Stop. Thinking. About. This. Phone.  All the new features are giving me major FOMO. Next paycheck, consider yourself spent! **",
  },
  {
    _id: "65c2441332078478e340ab64",
    user: "65b8e564ea5ce114184ccb96",
    product: "66f254ac53bbe09c7c63fa54",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "My signature scent just got an upgrade! This perfume is the perfect addition to my collection. Next paycheck, we meet again!",
  },
  {
    _id: "65c2441532078478e340ab68",
    user: "65b8e564ea5ce114184ccb96",
    product: "66f254ac53bbe09c7c63fa55",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Goodbye, clunky laptop! This lightweight tablet would be my new travel buddy for working remotely, catching up on emails, and staying connected. ✈️",
  },
  {
    _id: "65c2441732078478e340ab6c",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994456",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Gaming beast unlocked! This laptop with its latest features like dedicated graphics card, fast refresh rate, powerful cooling system] would be the ultimate gaming machine. Time to conquer those virtual worlds! ⚔️",
  },
  {
    _id: "65c2441a32078478e340ab70",
    user: "65b8e564ea5ce114184ccb96",
    product: "66f254ac53bbe09c7c63fa54",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Have to buy this for my friend's birthday",
  },
  {
    _id: "65c2442132078478e340ab7a",
    user: "65b8e564ea5ce114184ccb96",
    product: "66f254ac53bbe09c7c63fa57",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "Mood magic! These smart lights would transform my living room into the perfect movie night haven with customisable colours and dimming. Goodbye, harsh overhead lights! ✨",
  },
  {
    _id: "65c2443632078478e340ab9a",
    user: "65b8e564ea5ce114184ccb96",
    product: "66f254ac53bbe09c7c63fa56",
    createdAt: "2024-02-07T10:11:46.794Z",
    updatedAt: "2024-02-07T10:11:46.794Z",
    note: "A perfect christmas gift for my wife",
  },
  
];

exports.seedWishlist = async () => {
  try {
    await Wishlist.insertMany(wishlistItem);
    console.log("Wishlist seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
