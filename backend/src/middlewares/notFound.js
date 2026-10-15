const httpStatus = require("../constants/httpStatus");

module.exports = (req, res) => {

    return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Route Not Found"
    });

};