export const globalerrhandler =(err, req, res, next) => {
    // provide error stack 
    // provide message
    const stack = err?.stack;
    const statusCode = err?.statusCode ? err?.statusCode: 500;
    const message = err?.message;
    //send the status and the message
    res.status(statusCode).json({
        stack,
        message,
    });
};
//create a function for 404 handler
export const notFound = (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`)
    next(err);
};