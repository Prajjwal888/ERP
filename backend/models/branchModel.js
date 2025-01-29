import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    semesters: [
        {
            semesterNumber : {
                type : Number,
                required : true
            },
            subjects : [{
                type : mongoose.Schema.Types.ObjectId,
                ref : "subject"
            }
            ]

        }
    ]
},{timestamps:true});

const branch = mongoose.model("branch",branchSchema);
export{branch};