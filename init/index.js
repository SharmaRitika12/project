const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require('../Models/listing');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj)=>
  ({
  ...obj,owner:"678ee465034763f04cbc8c8c",
  }))
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();