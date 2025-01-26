import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            msg:"authHeader empty/invalid"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } 
    catch (err) {
        return res.status(403).json({
            msg : "error in authentication"
        });
    }
};
export {authMiddleware};