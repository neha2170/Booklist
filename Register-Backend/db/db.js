const mongoose = require("mongoose");

// Set strictQuery to false to handle the deprecation warning
mongoose.set("strictQuery", false);

const connectToDB = () => {
  mongoose.connect(
    "mongodb+srv://neha:neha@cluster0.wqpjlsc.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Connection error:"));
  db.once("open", function () {
    console.log("DB connected");
  });
};

module.exports = { connectToDB }; // Export the connectToDB function
