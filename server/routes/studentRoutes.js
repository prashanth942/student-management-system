const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// Get all students
router.get("/", getAllStudents);

// Add a new student
router.post("/", createStudent);

// Update a student
router.put("/:id", updateStudent);

// Delete a student
router.delete("/:id", deleteStudent);

module.exports = router;