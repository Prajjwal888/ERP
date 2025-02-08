import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId here
    ref: "subject",
    required: true,
  },
  file: {
    url: String,
    filename: String,
  },
});

const material = mongoose.model("material", materialSchema);

export default material;
