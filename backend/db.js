const mongoose = require("mongoose");
const mongoURI =
  "mongodb://mohdtahacool:mohdtaha20201066@ac-gegyevk-shard-00-00.fmzpmtb.mongodb.net:27017,ac-gegyevk-shard-00-01.fmzpmtb.mongodb.net:27017,ac-gegyevk-shard-00-02.fmzpmtb.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-11q5q6-shard-0&authSource=admin&retryWrites=true&w=majority";

module.exports = function (callback) {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
      console.log("Connected to MongoDB");

      const foodCollection = await mongoose.connection.db.collection(
        "food_items"
      );
      const categoryCollection = await mongoose.connection.db.collection(
        "foodCategory"
      );

      const foodItems = await foodCollection.find({}).toArray();
      const categories = await categoryCollection.find({}).toArray();

      console.log("Food Items:", foodItems);
      console.log("Categories:", categories);

      callback(null, foodItems, categories);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      callback(err);
    });
};
