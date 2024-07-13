const mongoose = require("mongoose");


const connectDB = (url) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log(`Connection Successful. DataBase Connected`);
    })
    .catch((error) => {
      console.log(`Unable to connect with Database. Error : ${error}`);
      process.exit(1);
    });
};

module.exports = { connectDB };
