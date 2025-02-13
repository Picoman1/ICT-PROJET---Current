
import jwt from 'jsonwebtoken'


const authUser = async (req, res, next) => {
    
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "No token provided. Not Authorized." });
        }

        try {
            const token = authHeader.split(" ")[1];

            // Decode the token
            const token_decode = jwt.verify(token, process.env.JWT_SECRET);
            req.userId=token_decode.id;
            next()
        } catch (error) {
           console.log(error)
            res.json({ success: false, message: error.message })
        }
       


  
};

export default authUser