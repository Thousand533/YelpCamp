const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground");
const axios = require("axios");

//// Connect to DB
mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {})
  .then(() => {
    console.log("Mongo CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO Mongo ERROR!!!!");
    console.log(err);
  });

// const sample = (array = function () {
//   array[Math.floor(Math.random() * array.length)];
// });

async function seedImg() {
  try {
    const resp = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        client_id: "nLNIQSgtyWvf1h8CV0Q-s63rtF-pwuYYgTp_S2PeTFU",
        collections: 1114848,
      },
    });
    return resp.data.urls.small;
  } catch (err) {
    console.error(err);
  }
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 100; i++) {
    // setup
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      // Your user ID
      author: "66836a916f9beea4f9fc0c8a",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: await seedImg(), // default random img API
      images: [
        {
          url: "https://res.cloudinary.com/deengfzth/image/upload/v1720512579/YelpCamp/sxzuls1y21eehruminvy.jpg",
          filename: "YelpCamp/sxzuls1y21eehruminvyx",
        },
        {
          url: "https://res.cloudinary.com/deengfzth/image/upload/v1721205814/falaq-lazuardi-YAyt4ZePq80-unsplash_yxxcyv.jpg",
          filename: "YelpCamp/falaq-lazuardi-YAyt4ZePq80-unsplash_yxxcyv",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus nihil assumenda facere, accusamus sed harum quasi libero omnis repellat ipsa voluptatum porro impedit veniam? Ipsum porro tenetur odio corrupti recusandae!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
