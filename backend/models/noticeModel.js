import mongoose from "mongoose";

const noticeSchema =mongoose.Schema({
    title:{
        type:string,
        required:true,
    },
    description:{
        type:string,
        required:true,
    },
    noticeFrom:{
        type:string,
        required:true,
        enum: ['admin', 'faculty']
    },
    noticeTo:{
        type:string,
        required:true,
        enum: ['admin', 'student', 'faculty'],
    },

})
const notice=mongoose.model('notice',noticeSchema);

export default notice;