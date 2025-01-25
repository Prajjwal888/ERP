import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    loginid: {
        type: Number,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
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
        required: true,
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
      gender: {
        type: String,
        required: true,
      },
      profile: {
        type: String,
        required: true,
      }
},{timestamps: true}
);

const admin =mongoose.model('Admin', adminSchema);

export default admin;