const { Payment } = require("../model/paymentSchema");
const { Student } = require("../model/studentsSchema");

// add Payment
const addPayment = async (req, res) => {
  try {
    const {
      students_id,
      payment_last_date,
      payment_date,
      price,
      is_paid,
      total_attent,
    } = req.body;

    const newPayment = new Payment({
      students_id,
      payment_last_date,
      payment_date,
      price,
      is_paid,
      total_attent,
    });

    await newPayment.save();

    res.status(201).json({
      success: true,
      message: "Payment successfully added",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get Payments
const getPayments = async (req, res) => {
  try {
    const Payments = await Payment.find().populate("students_id");

    res.status(200).json({
      success: true,
      message: "All Payments fetched",
      innerData: Payments,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get Payment by id
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id).populate("students_id");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment isn't found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment fetched successfully",
      innerData: payment,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// update Payment by id
const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPayment = await Payment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPayment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment successfully updated",
      data: updatedPayment,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete Payment
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletePayment = await Payment.findByIdAndDelete(id);

    if (!deletePayment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment successfully deleted",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ----------- Search Payment ----------- //
const searchPayment = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const matchingStudents = await Student.find({
      $or: [
        { first_name: { $regex: query, $options: "i" } },
        { last_name: { $regex: query, $options: "i" } },
        { phone_number: { $regex: query, $options: "i" } },
      ],
    }).select("_id");

    const studentIds = matchingStudents.map((s) => s._id);

    const orConditions = [];
    if (studentIds.length > 0) {
      orConditions.push({ students_id: { $in: studentIds } });
    }

    const mongoose = require("mongoose");
    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ students_id: query });
      orConditions.push({ _id: query });
    }

    if (orConditions.length === 0) {
      return res.json({ message: "Bunday payment topilmadi" });
    }

    const result = await Payment.find({ $or: orConditions }).populate("students_id");

    if (result.length === 0) {
      return res.json({ message: "Bunday payment topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ message: "Server error: Failed to fetch payment" });
  }
};

module.exports = {
  addPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  searchPayment,
};