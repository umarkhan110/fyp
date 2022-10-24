const jwt = require("jsonwebtoken");
const Fypclients= require("../model/Fypclient");
const Fypfuels = require("../model/Fypfuel")

const Authenticatesp = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await Fypfuels.findOne({ _id: verifyToken._id, "tokens.token": token });
        if (!rootUser) { throw new Error('User not Found') }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        req.message = rootUser.message;
        next();

    } catch (err) {
        res.status(401).send('No token Provided')
        console.log(err)
    }
}

module.exports = Authenticatesp;