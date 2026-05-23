const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  pimage: { type: String, required: true },
  category: { type: String, default: "General" },
  gender: { type: String, default: "Unisex" },
  sizes: {
    type: [String],
    default: ["Free Size"],
  },
});

module.exports = mongoose.model("Product", productSchema);
