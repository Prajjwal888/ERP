import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name :{
        type:String,
        required: true
    },
    subjectCode : {
        type : String,
        required : true
    },
    semester:{
        type:Number,
        required : true
    },
    branch : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "branch"
    },
    faculty : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "faculty"
    }
})

const subject = mongoose.model("subject",subjectSchema);
export{subject};