"use Strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expensesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amtIn: {
      type: Boolean,
      default: false,
    },
    amtOut: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    time_stamp: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const expense = mongoose.model("expenses", expensesSchema);

module.exports = {
  expenses: expense,
};
