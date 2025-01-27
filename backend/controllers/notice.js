import notice from "../models/noticeModel";

const getNotice = async (req, res) => {
try{
    const userRole =req.user;
    let notices;
    if(userRole=='admin'){
        notices=await notice.find({});
    }
    else if (role==='faculty'){
        notices=await notice.find({noticeTo: { $in: ['faculty', 'student'] },});
    }
    else if(role==='student'){
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
      const updatedNotice = await Notice.findByIdAndUpdate(
        id,
        { title, description, noticeTo },
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
export default { getNotice, updateNotice };  