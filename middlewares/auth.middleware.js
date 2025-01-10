import jwt from "jsonwebtoken"
import logger from '../logger.js';

export const auth = (req, res, next) => {
    console.log("Auth middleware");
    logger.info("Auth middleware entered");
    const token = req.cookies.token || req.body.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "User not logged in, please log in"
        });
    }
    try {
        const decodeToken = jwt.verify(token, process.env.JSON_WEB_TOKEN);
        logger.info(`User token decoded for: ${decodeToken.email}`);
        req.user = decodeToken;
        next();
    } catch (error) {
        logger.error(`Token verification failed: ${error.message}`);
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
}