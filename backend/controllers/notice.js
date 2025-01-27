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
};


export {addNotice,deleteNotice};

