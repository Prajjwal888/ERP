import mongoose from 'mongoose';

const materialSchema =new mongoose.Schema({
   title:{
        type:String,
        required:true
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId here
        ref: "subject",
        required: true

    },
    file:
      {
        type:String,
        required:false,
      }


})

const material =mongoose.model('material',materialSchema);

export default material;