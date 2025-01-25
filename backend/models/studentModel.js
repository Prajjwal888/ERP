import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
    loginid: {
        type: Number,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      enrollmentNo: {
        type: Number,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
        required: false,

      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
      semester: {
        type: Number,
        required: true,
      },
      branch: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      profile: {
        type: String,
        required: true,
      }
    }, { timestamps: true });

const student = mongoose.model('Student', studentSchema);

export default student;