import jwt from "jsonwebtoken";
import admin from "../models/adminModel.js";

const adminMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            msg: "authHeader empty/invalid"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded ID exists in the admin database
        const isAdmin = await admin.findById(decoded.id);
        

        if (!isAdmin) {
            return res.status(403).json({
                msg: "Access denied, not an admin"
            });
        }

        // Attach the admin's _id to the req object
        req.id = isAdmin.id;
        req.profile=isAdmin.profile;

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(403).json({
            msg: "Error in authentication"
        });
    }
};

export { adminMiddleware };
