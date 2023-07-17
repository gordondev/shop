const userService = require("../service/user-service");
const UAParser = require('ua-parser-js');
const DeviceDetector = require('device-detector-js');

function getClientDeviceInfo(req) {
  const userAgent = req.headers['user-agent'];
  const parser = new UAParser();
  parser.setUA(userAgent);

  const browser = parser.getBrowser();
  const os = parser.getOS();
  const ipAddress = req.clientIp;
  const deviceDetector = new DeviceDetector();
  const device = deviceDetector.parse(userAgent).device;

  const deviceInfo = {
    ipAddress,
    browser: {
      name: browser.name,
      version: browser.version
    },
    operatingSystem: {
      name: os.name,
      version: os.version
    },
    device: {
      type: device.type,
      model: device.model,
      brand: device.brand
    }
  };

  return deviceInfo;
}

class UserController {

  async registration(req, res, next) {
    try {
      const { email, password} = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'Отсутствуют обязательные поля' });
        return;
      }

      const deviceInfo = getClientDeviceInfo(req);
      const userData = await userService.registration(email, password, deviceInfo);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
      });

      res.cookie("sessionID", userData.sessionID, {
        httpOnly: true,
        secure: true
      });
      
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'Отсутствуют обязательные поля' });
        return;
      }

      const deviceInfo = getClientDeviceInfo(req);
      const userData = await userService.login(email, password, deviceInfo);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
      });

      res.cookie("sessionID", userData.sessionID, {
        httpOnly: true,
        secure: true
      });

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
      const { refreshToken, sessionID } = req.cookies;
      const deviceInfo = getClientDeviceInfo(req);
      
      const userData = await userService.refresh(refreshToken, deviceInfo, sessionID);

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
