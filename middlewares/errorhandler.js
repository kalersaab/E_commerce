const notfound = (req, res, next) => {
    const error = new Error (`not found: ${req.orignalUrl}`)
    res.status(404);
    next(error);
};

//error handler
const errorhandle = (err, req, res, next) => {
    const statuscode = res.statusCode==200 ? 500 : res.statusCode;
    res.status(statuscode);
    res.send({
        message: err?.message,
        stack: err?.stack})
} 
module.exports = {notfound, errorhandle}
