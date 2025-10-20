"use Strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cat: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    time_stamp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const notesUser = new Schema({
  userName: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
});

const note = mongoose.model("Notes", notesSchema);
const noteUser = mongoose.model("NotesUser", notesUser);

module.exports = {
  notes: note,
  notesUsers: noteUser,
};
