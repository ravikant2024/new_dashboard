const User = require("../models/User");

const users = [
  {
    _id: "65b8e564ea5ce114184ccb96",
    name: "demo user",
    email: "demo@gmail.com",
    password: '$2a$10$GH8p5cAsGFEdYsLaSfTQ3e1eUs7KbLmVBltjbX4DDCj2eyO2KW/Ze',
    isVerified: true,
    isAdmin: false,
    __v: 0,
  },
  {
    _id: "65c2526fdcd9253acfbaa731",
    name: "rishibakshi",
    email: "demo2@gmail.com",
    password: '$2a$10$tosjkprqtomSah0VJNyKi.TIv1JU65pl1i1IJ6wUttjYw.ENF99jG',
    isVerified: true,
    isAdmin: false,
    __v: 0,
  },
  {
    _id: "66f2434c53bbe09c7c63f9d7",
    name: "kalyan",
    email: "181fa04376@gmail.com",
    password: "$2a$10$DkLHJbSPerIIPBzDbr5J7O8fR.k9Wo0eTSuvxkDGYFMkQ8.niBT8u",
    isVerified: true,
    isAdmin: false,
    isSubAdmin: false,
    isOps: false,
    __v: 0
  }
];

exports.seedUser = async () => {
  try {
    await User.insertMany(users);
    console.log("User seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
