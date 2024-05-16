import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    try {
        if (!userId) {
            throw new Error("User ID is required for generating token.");
        }
        
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '15d' // Adjust the expiration time as needed
        });

        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
            httpOnly: true, // Prevent XSS attacks
            sameSite: "strict", // Prevent CSRF attacks
            secure: process.env.NODE_ENV !== "development" // Secure cookie in production
        });
    } catch (error) {
        console.error("Error generating token and setting cookie:", error.message);
        // Handle error appropriately, e.g., send an error response
        res.status(500).json({ error: "Internal server error" });
    }
};

export default generateTokenAndSetCookie;
