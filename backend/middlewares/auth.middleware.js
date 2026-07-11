const jwt = require("jsonwebtoken");

const User = require("../models/user");

const authMiddleware = async (req, res, next) => {

    try {

        const token = req.cookies.token;

        if (!token) {

            return res.status(401).json({
                message: "Please Login",
            });

        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id);

    if (!user) {
        return res.status(401).json({
            message: "User not found"
        });
    }

    req.user = user;

    next();
    
    } catch (err) {

        res.status(401).json({
            message: "Unauthorized",
        });

    }

};

module.exports = authMiddleware;