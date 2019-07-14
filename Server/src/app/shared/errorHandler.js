function errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    if (!err.statusCode) {
      return next(err);
    }
  
    let error = '\n';
    error += `[ERROR ${err.statusCode}] @ `;
    error += err.at ? `${err.at}\n` : 'serverGenerated\n';
    error += err.code ? `code: ${err.code}\n` : '';
    error += err.message ? `message: ${err.message}\n` : '';
    error += err.error ? `error: ${err.error}\n` : '';
  
    console.error(error);
  
    return res.status(err.statusCode).json(err.error || err.message);
  };

  // module.exports = {errorHandler}