const {validationResult} = require("express-validator")
const _Error = require("../utils/Error");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {   
        return next(new _Error(errors.array().map(e=>e.msg).join("-") , 404 ))
    }
    next(); 
}

