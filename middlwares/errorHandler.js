const errorHandler = (err,req,res,next) =>{
  let code = 500;
  let message = err;

  if (
    err.name === `SequelizeValidationError` ||
    err.name === `SequelizeUniqueConstraintError` ||
    err.name === `Email and Password cannot be null`
  ) {
  code = 400;
  message = err.errors.map(el => el.message);
   } else if (
            err.message === `Email or Password is invalid` ||
        err.message === `Email is invalid` ||
        err.message === `Password is invalid`
      ) {
        code = 401;
        message = `Invalid email or password`;
      } else if (
        err.message === `Id not found` ||
        err.message === `Product not found`
      ) {
        code = 404;
        message = `Error not found`;
      } else if (err === "Forbidden") {
        (code = 403), (message = "You do not have access");
    } else if (err === "BadRequest") {
        (code = 400), (message = "Params id must an integer");
    } else if (err === "NotFound") {
        (code = 404), (message = "Not Found");
    } else if (err === "InvalidToken" || err === "JsonWebTokenError") {
        (code = 401), (message = "Access Token is Invalid");
    } else if (err.message === `Email has been registered`) {
        code = 401;
        message = `Email has been registered`;      
    } else if (err === `Email hasn't been registered`) {
      (code = 404), (message = `Email hasn't been registered`);
    }
    res.status(code).json({
        statusCode: code,
        error: {
        message: message
       }
    });
}