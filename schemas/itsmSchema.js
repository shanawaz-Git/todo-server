"use Strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itsmSchema = new Schema(
  {
    payload: {
      type: JSON,
      required: true,
    },
  },
  { timestamps: true }
);

const ITSM = mongoose.model("ITSM", itsmSchema);

module.exports = {
  ITSM: ITSM,
};
