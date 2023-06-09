const { validationResult } = require("express-validator");
const { map } = require("lodash");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationErrors = map(errors.array(), (error) => ({
      field: error.param,
      message: error.msg,
    }));
    return res.status(400).json({
      error: "Ошибка валидации",
      errors: validationErrors,
    });
  }
  next();
};

module.exports = {
  validateRequest,
};
