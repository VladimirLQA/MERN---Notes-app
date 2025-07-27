import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  labels: {
    type: [String],
    default: [],
    required: false,
  },
  isPinned: {
    type: Boolean,
    default: false,
    required: false,
  },
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);

export default Note;