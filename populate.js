const FoodItem = require("./models/foodItem");
const connectDB = require("./db/connect");
require("dotenv").config();

const jsonProducts = require("./foodItems.json");

async function start() {
  try {
    await connectDB(process.env.MONGO_URI);
    await FoodItem.deleteMany();
    await FoodItem.create(jsonProducts);
    console.log("FoodItems created successfully!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
