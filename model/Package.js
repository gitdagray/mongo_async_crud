const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  mining_rate_per_day: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Package", packageSchema);
