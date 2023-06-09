const userService = require("../service/user-service");

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, firstName } = req.body;
      if (!firstName || !email || !password) {
        res.status(400).json({ error: 'Отсутствуют обязательные поля' });
        return;
      }
      const userData = await userService.registration(email, password, firstName);
      this.setRefreshTokenCookie(res, userData.refreshToken);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  setRefreshTokenCookie(res, refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true
    });
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'Отсутствуют обязательные поля' });
        return;
      }
      const userData = await userService.login(email, password);
      this.setRefreshTokenCookie(res, userData.refreshToken);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const { deviceId } = req.body;
      const userData = await userService.refresh(refreshToken, deviceId);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new UserController();
