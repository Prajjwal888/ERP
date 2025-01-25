import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
    loginid: {
        type: Number,
        required: true,
      },
      password: {
        type: String,
        required: true,
      }
    ,
    employeeId: {
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
      department: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      experience: {
        type: Number,
        required: true,
      },
      post: {
        type: String,
        required: true,
      },
         profile: {
        type: String,
        required: true,
      }}, 
      { timestamps: true});

const faculty = mongoose.model('Faculty', facultySchema);

export default faculty;