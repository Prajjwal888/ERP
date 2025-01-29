import notice from "../models/noticeModel.js"
const addNotice= async(req,res)=>{
    if(req.user==="student"){
        res.status(400).json({
            msg : "student can't add notices"
        })
    }
    try{
        const newNotice = await notice.create({
            ...req.body,
            noticeFrom : req.user,
            issuedBy: req.id
        })
        return res.status(200).json({
           msg : "notice added successfully!",
           newNotice
        })
    }
    catch(e){
        return res.status(500).json({
            msg : "error adding notices",
            error : e.message
        })
    }
}
const deleteNotice = async (req, res) => {
    try {
        
        const { id } = req.params;
        console.log (id);
        const deletedNotice = await notice.deleteOne({ _id: id });
        
        // Check if a notice was deleted
        if (deletedNotice.deletedCount === 0) {
            return res.status(404).json({
                msg: "Notice not found or already deleted",
            });
        }

        return res.status(200).json({
            msg: "Notice deleted successfully!",
            deletedNotice,
        });
    } catch (e) {
        return res.status(500).json({
            msg: "Error deleting notice",
            error: e.message,
        });
    }
};
const getNotice = async(req,res)=>{
    if(req.user==="admin"){
        try {
            const notices = await notice.find({});
            res.status(201).json({
               msg : "notice fetched successfully!" ,
               notices
            })
        } catch (err) {
            // console.error("Error fetching notices:", err);
            return res.status(500).json({message:""})
        }
    }
    else if(req.user==="faculty"){
        try {
          
            const notices = await notice.find({
                $or: [
                    { noticeFrom: "faculty" }, 
                    { noticeTo: "faculty" },  
                    { noticeTo: "all" }       
                ]
            });
    
            return res.status(200).json({
                msg: "Notices retrieved successfully",
                notices
            });
        } catch (e) {
            // Handle errors
            return res.status(500).json({
                msg: "Error fetching notices",
                error: e.message
            });
        }
    }
    else if(req.user==="student"){
        try {
            const notices = await notice.find({
                noticeTo: { $in: ["student", "all"] }
            });
    
            return res.status(200).json({
                msg: "Notices retrieved successfully",
                notices
            });
        } catch (e) {
           
            return res.status(500).json({
                msg: "Error fetching notices",
                error: e.message
            });
        }
    }
}

export {addNotice,deleteNotice,getNotice};
