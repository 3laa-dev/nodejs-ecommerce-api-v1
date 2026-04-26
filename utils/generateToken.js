const jwt = require("jsonwebtoken");

const generateJWT = async (payload) => {

    const token = await jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, { expiresIn: "90d" });
    return token;
}

module.exports = generateJWT;