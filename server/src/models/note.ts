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
  category: {
    type: String,
    required: true,
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);

export default Note;