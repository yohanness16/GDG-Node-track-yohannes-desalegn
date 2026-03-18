class customError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        Error.captureStackTrace(this, this.constructor);
    }};

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message,
    });
};

export default customError;
export { globalErrorHandler };