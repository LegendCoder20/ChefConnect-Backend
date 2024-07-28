const mongoose = require("mongoose");
require("colors");

let MONGO_URI = process.env.MONGO_URI;

const dbConnect = async () => {
  mongoose.set("strictQuery", true);
  try {
    const connect = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected${connect.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(
      "Some Error Occured While Connecting to Database from dbConnect.js File" +
        err
    );
    process.exit(10);
  }
};

module.exports = dbConnect;
