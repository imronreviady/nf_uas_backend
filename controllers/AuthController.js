const user = require("../models/user");
const ResponseFormater = require("../helpers/ResponseFormater");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  static async register(req, res) {
    try {
      const { username, password } = req.body;

      const checkUser = await user.findOne({
        where: {
          username,
        },
      });

      if (checkUser) {
        const response = new ResponseFormater(
          400,
          "Username already exist",
          null
        ).getResponse();

        return res.status(400).json(response);
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = await user.create({
        username,
        password: hashPassword,
      });

      const response = new ResponseFormater(
        201,
        "Success register new user",
        newUser
      ).getResponse();

      return res.json(response);
    } catch (error) {
      console.error(error);

      const response = new ResponseFormater(
        500,
        "Internal Server Error",
        null
      ).getResponse();

      return res.status(500).json(response);
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;

      const checkUser = await user.findOne({
        where: {
          username,
        },
      });

      if (!checkUser) {
        const response = new ResponseFormater(
          400,
          "Username not found",
          null
        ).getResponse();

        return res.status(400).json(response);
      }

      const checkPassword = await bcrypt.compare(password, checkUser.password);

      if (!checkPassword) {
        const response = new ResponseFormater(
          400,
          "Password is invalid",
          null
        ).getResponse();

        return res.status(400).json(response);
      }

      const payload = {
        id: checkUser.id,
        username: checkUser.username,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const response = new ResponseFormater(
        200,
        "Success login",
        token
      ).getResponse();

      return res.json(response);
    } catch (error) {
      console.error(error);
      const response = new ResponseFormater(
        500,
        "Internal Server Error",
        null
      ).getResponse();

      return res.status(500).json(response);
    }
  }
}

module.exports = AuthController;
