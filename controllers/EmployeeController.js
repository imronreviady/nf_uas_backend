const employee = require("../models/Employee");
const ResponseFormater = require("../helpers/ResponseFormater");
const { Op } = require("sequelize");

class EmployeeController {
  static async getAllEmployee(req, res) {
    try {
      const employees = await employee.findAll();

      const response = new ResponseFormater(
        200,
        "Success get all employees",
        employees
      ).getResponse();

      return res.json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: 0,
        message: "Internal Server Error",
      });
    }
  }

  // addEmployee
  static async addEmployee(req, res) {
    try {
      const { name, gender, phone, address, email, status, hired_on } =
        req.body;

      const checkEmployee = await employee.findOne({
        where: {
          email,
        },
      });

      if (checkEmployee) {
        const response = new ResponseFormater(
          400,
          "Employee already exist",
          null
        ).getResponse();

        return res.status(400).json(response);
      }

      const newEmployee = await employee.create({
        name,
        gender,
        phone,
        address,
        email,
        status,
        hired_on,
      });

      const response = new ResponseFormater(
        201,
        "Success add new employee",
        newEmployee
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

  // updateEmployee
  static async updateEmployee(req, res) {
    try {
      const { id } = req.params;

      const checkEmployee = await employee.findOne({
        where: {
          id,
        },
      });

      if (!checkEmployee) {
        const response = new ResponseFormater(
          404,
          "Employee not found",
          null
        ).getResponse();

        return res.status(404).json(response);
      }

      // Update employee
      const updatedEmployee = await employee.update(req.body, {
        where: {
          id,
        },
      });

      // get updated employee
      const getUpdatedEmployee = await employee.findOne({
        where: {
          id,
        },
      });

      const response = new ResponseFormater(
        200,
        "Success update employee",
        getUpdatedEmployee
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

  // deleteEmployee
  static async deleteEmployee(req, res) {
    try {
      const { id } = req.params;

      const checkEmployee = await employee.findOne({
        where: {
          id,
        },
      });

      if (!checkEmployee) {
        const response = new ResponseFormater(
          404,
          "Employee not found",
          null
        ).getResponse();

        return res.status(404).json(response);
      }

      // Delete employee
      await employee.destroy({
        where: {
          id,
        },
      });

      const response = new ResponseFormater(
        200,
        "Success delete employee",
        null
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

  // getEmployeeById
  static async getEmployeeById(req, res) {
    try {
      const { id } = req.params;

      const checkEmployee = await employee.findOne({
        where: {
          id,
        },
      });

      if (!checkEmployee) {
        const response = new ResponseFormater(
          404,
          "Employee not found",
          null
        ).getResponse();

        return res.status(404).json(response);
      }

      const response = new ResponseFormater(
        200,
        "Success get employee by id",
        checkEmployee
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

  // getEmployeeByName
  static async getEmployeeByName(req, res) {
    try {
      const { name } = req.params;

      const checkEmployee = await employee.findOne({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });

      if (!checkEmployee) {
        const response = new ResponseFormater(
          404,
          "Employee not found",
          null
        ).getResponse();

        return res.status(404).json(response);
      }

      const response = new ResponseFormater(
        200,
        "Success get employee by name",
        checkEmployee
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

  // getEmployeeByStatus
  static async getEmployeeByStatus(req, res) {
    try {
      const { status } = req.params;

      const checkEmployee = await employee.findOne({
        where: {
          status,
        },
      });

      if (!checkEmployee) {
        const response = new ResponseFormater(
          404,
          "Employee not found",
          null
        ).getResponse();

        return res.status(404).json(response);
      }

      const response = new ResponseFormater(
        200,
        "Success get employee by status",
        checkEmployee
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

module.exports = EmployeeController;
