import mongoose from "mongoose";

const timeTableSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },

  file: {
    url: String,
    filename: String,
  },
});

const timeTable = mongoose.model("timeTable", timeTableSchema);

export default timeTable;
