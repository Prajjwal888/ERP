import mongoose from "mongoose"

const timeTableSchema = new mongoose.Schema({
    branch :{
        type:String,
        required:true,
    },
      semester:{
        type:Number,
        required:true,
      }    ,

      file:
      {
        type:String,
        required:false,
      }
})

const timeTable =mongoose.model('timeTable',timeTableSchema);

export default timeTable;
