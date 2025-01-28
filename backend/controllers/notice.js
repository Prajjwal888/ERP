import student from "../models/studentModel.js";
import faculty from "../models/facultyModel.js";
import admin from "../models/adminModel.js";
import notice from "../models/noticeModel.js";

const addNotice = async (req, res) => {
    if (req.user === "student") {
        return res.status(400).json({
            msg: "Student can't add notice", 
        });
    }
    try {
        console.log
        const newNotice = await notice.create({
            ...req.body, 
            noticeFrom: req.user, 
        });
        return res.status(200).json({
            msg: "Notice added successfully!", 
            newNotice,
        });
    } catch (e) {
        res.status(500).json({
            msg: "Error adding notice",
            error: e.message, 
        });
    }
};

const deleteNotice = async (req, res) => {
    
    if (req.user === "student") {
        return res.status(400).json({
            msg: "Student can't delete notice",
        });
    }
    try {
        const { id } = req.body; 

        const deletedNotice = await notice.findByIdAndDelete(id);

        if (!deletedNotice) {
            return res.status(404).json({
                msg: "Notice not found",
            });
        }

        return res.status(200).json({
            msg: "Notice deleted successfully",
            deletedNotice,
        });
    } catch (e) {
        res.status(500).json({
            msg: "Error deleting notice",
            error: e.message,
        });
    }
};export {addNotice,deleteNotice};

import notice from "../models/noticeModel.js";

const getNotice = async (req, res) => {
try{
    const userRole =req.profile;
    let notices;
    if(userRole=='admin'){
        notices=await notice.find({});
    }
    else if (userRole==='faculty'){
        notices=await notice.find({noticeTo: { $in: ['faculty', 'student'] },});
    }
    else if(userRole==='student'){
        notices=await notice.find({noticeTo: { $in: ['student'] },});
}
else{
    return res.status(400).json({message:'No Notices To Show'});
}
return res.status(200).json(notices);
}

catch(error){
    console.error("Error fetching notices:", error);
    res.status(500).json({ message: "Internal Server Error" });
}
};
const updateNotice = async (req, res) => {
    try {
      
      const { title, description, noticeTo } = req.body.notice;
      const id = req.body.notice._id;
  
      // Check if ID exists
      if (!id) {
        return res.status(400).json({ error: "Notice ID is required." });
      }
      const updatedNotice = await notice.findByIdAndUpdate(
        id,
        { title, description, noticeTo},
        { new: true } 
      );
      if (!updatedNotice) {
        return res.status(404).json({ error: "Notice not found." });
      }
  
      // Respond with the updated notice
      res.status(200).json({
        message: "Notice updated successfully.",
        notice: updatedNotice,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while updating the notice.",
        details: error.message,
      });
    }
  };
export  { getNotice, updateNotice };  
