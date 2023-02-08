const express = require("express");
const { getAllFoodItems } = require("../controllers/foodItem");

const router = express.Router();

router.route("/").get(getAllFoodItems);

module.exports = router;
