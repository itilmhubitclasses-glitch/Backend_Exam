const { Schema, model } = require("mongoose");

const { Student } = require("../model/studentsSchema");

const paymentSchema = new Schema({
  students_id: { type: Schema.Types.ObjectId, ref: Student, default: null },
  payment_last_date: { type: Date },
  payment_date: { type: Date },
  price: { type: Schema.Types.Decimal128 },
  is_paid: { type: Boolean },
  total_attent: { type: Number },
});

const Payment = model("payment", paymentSchema);

module.exports = { Payment };
