import mongoose from "mongoose";

const noticeSchema =mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    noticeFrom:{
        type:String,
        required:true,
        enum: ['admin', 'faculty']
    },
    noticeTo:{
        type:String,
        required:true,
        enum: ['admin', 'student', 'faculty'],
    },

})
const notice=mongoose.model('notice',noticeSchema);

export default notice;