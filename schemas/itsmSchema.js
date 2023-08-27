"use Strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itsmSchema = new Schema(
  {
    payload: {
      type: String,
      required: true,
      trim: true,
    },
    fileName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    key: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const ITSM = mongoose.model("ITSM", itsmSchema);

module.exports = {
  ITSM: ITSM,
};
