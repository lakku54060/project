const mongoose = require("mongoose");
const Order = require("../models/Order");

exports.getAllProducts = async (req, res) => {
  try {
    const cres = await Order.find();
    res.json(cres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    console.log("Incoming Order:", req.body);

    const { name, email, mobileno, address, productid, custid } = req.body;

    if (!name || !email || !mobileno || !address || !productid || !custid) {
      return res.status(400).json({
        message: "All order fields are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productid)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(custid)) {
      return res.status(400).json({
        message: "Invalid customer ID",
      });
    }

    const parsedMobile = Number(mobileno);

    if (Number.isNaN(parsedMobile)) {
      return res.status(400).json({
        message: "Mobile number must be numeric",
      });
    }

    const order = new Order({
      name: String(name).trim(),
      email: String(email).trim(),
      mobileno: parsedMobile,
      address: String(address).trim(),
      productid: productid,
      custid: custid,
      status: "Pending",
    });

    const result = await order.save();

    res.json({
      status: "1",
      message: "Order placed successfully",
      data: result,
    });
  } catch (err) {
    console.log("ORDER ERROR:", err);
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("custid", "name email mobileno")
      .populate("productid")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const orders = await Order.find({ email });
    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.viewOrderByCustID = async (req, res) => {
  try {
    const custId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(custId)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const data = await Order.find({ custid: custId })
      .populate("custid", "name email mobileno")
      .populate("productid")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCheckOrders = async (req, res) => {
  try {
    const data = await Order.find()
      .populate("custid")
      .populate("productid")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    if (!["Confirmed", "Declined"].includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("custid", "name email mobileno")
      .populate("productid");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: `Order ${status.toLowerCase()} successfully`,
      data: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelOrderByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { custid } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(custid)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (String(order.custid) !== String(custid)) {
      return res.status(403).json({ message: "You cannot cancel this order" });
    }

    if (order.status === "Confirmed") {
      return res.status(400).json({ message: "Confirmed orders cannot be cancelled" });
    }

    if (order.status === "Declined") {
      return res.status(400).json({ message: "Order is already declined" });
    }

    order.status = "Declined";
    const updatedOrder = await order.save();

    res.json({
      message: "Order cancelled successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
