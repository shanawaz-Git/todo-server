"use Strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todosSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      enum: ["OPEN", "PROGRESS", "COMPLETED", "CANCELLED"],
      default: "OPEN",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const todo = mongoose.model("todos", todosSchema);

module.exports = {
  todo: todo,
};
