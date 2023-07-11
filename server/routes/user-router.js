const Router = require("express");
const router = new Router();
const commonPasswords = require("../utils/commonPasswords");
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");
const { validateRequest } = require("../middlewares/validation-middleware");
const { authMiddleware } = require("../middlewares/auth-middleware");

router.post(
  "/registration",
  [
    body("email").isEmail().withMessage("Некорректный формат почты"),
    body("password")
      .isLength({ min: 8, max: 32 })
      .withMessage("Пароль должен содержать от 8 до 32 символов")
      .matches(/[a-z]/)
      .withMessage("Пароль должен содержать хотя бы одну строчную букву")
      .matches(/[A-Z]/)
      .withMessage("Пароль должен содержать хотя бы одну заглавную букву")
      .matches(/[0-9]/)
      .withMessage("Пароль должен содержать хотя бы одну цифру")
      .matches(/[!@#$%^&*()]/)
      .withMessage("Пароль должен содержать хотя бы один специальный символ")
      .custom((value, { req }) => {
        if (value.toLowerCase().includes(req.body.firstName.toLowerCase())) {
          throw new Error("Пароль не должен содержать имя пользователя");
        }
        return true;
      })
      .custom((value) => {
        if (commonPasswords.includes(value.toLowerCase())) {
          throw new Error("Используйте более надежный пароль");
        }
        return true;
      }),
  ],
  validateRequest,
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);

module.exports = router;
