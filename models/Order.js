const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    mobileno: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    productid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    custid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RegisterUser",
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Declined"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlaceOrder", OrderSchema);
