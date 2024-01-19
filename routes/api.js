// import EmployeeController
const EmployeeController = require("../controllers/EmployeeController");
const AuthController = require("../controllers/AuthController");
const { authenticateToken } = require("../middleware/middleware");

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello HRD API Express");
});

// Membuat routing employee

// auth register (post)
router.post("/register", AuthController.register);
// auth login (post)
router.post("/login", AuthController.login);

// employees (get)
router.get("/employees", authenticateToken, EmployeeController.getAllEmployee);
// employees (post)
router.post("/employees", authenticateToken, EmployeeController.addEmployee);
// employees (put)
router.put(
  "/employees/:id",
  authenticateToken,
  EmployeeController.updateEmployee
);
// employees (delete)
router.delete(
  "/employees/:id",
  authenticateToken,
  EmployeeController.deleteEmployee
);
// employees (get by id)
router.get(
  "/employees/:id",
  authenticateToken,
  EmployeeController.getEmployeeById
);
// employees (get by name)
router.get(
  "/employees/search/:name",
  authenticateToken,
  EmployeeController.getEmployeeByName
);
// employees (get by status)
router.get(
  "/employees/status/:status",
  authenticateToken,
  EmployeeController.getEmployeeByStatus
);

// export router
module.exports = router;
