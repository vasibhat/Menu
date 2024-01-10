const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(400);
    next(error);
    };

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === "CastErros" && err.kind === "ObjectId") {
        message = " Resource not found";
        statusCode = 404;
    }

    res.status(statusCode).json({
        message : message ,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
}

export { notFound, errorHandler };