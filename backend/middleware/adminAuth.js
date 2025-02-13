import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "No token provided. Not Authorized." });
        }

        // Extract the token from "Bearer <token>"
        const token = authHeader.split(" ")[1];

        // Decode the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Check if the user is an admin
        if (token_decode.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Access Denied: Admins only" });
        }

        next(); // Proceed to the next middleware if authentication is successful
    } catch (error) {
        console.log("Auth Error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};

export default adminAuth;







