const { Student } = require("../model/studentsSchema");

// add Student
const addStudent = async (req, res) => {
  try {
    const { Students_id, first_name, last_name, phone_number, birthday, gender } =
      req.body;

    const newStudent = new Student({
      Students_id,
      first_name,
      last_name,
      phone_number,
      birthday,
      gender,
    });

    await newStudent.save();

    res.status(201).json({
      success: true,
      message: "Student suc added",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get Students
const getStudents = async (req, res) => {
  try {
    const Students = await Student.find();

    res.status(200).json({
      success: true,
      message: "All Students fetched",
      innerData: Students,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get students by id
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const students = await Student.findById(id);

    if (!students) {
      return res.status(404).json({
        success: false,
        message: "Student isn't found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      innerData: students,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// update students by id
const updateStudents = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedStudents = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudents) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student successfully updated",
      data: updatedStudents,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete Students
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteStudent = await Student.findByIdAndDelete(id);

    if (!deleteStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student successfully deleted",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ----------- Search Student ----------- //
const searchStudent = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await Student.find({
      $or: [
        { first_name: { $regex: query, $options: "i" } },
        { last_name: { $regex: query, $options: "i" } },
        { phone_number: { $regex: query, $options: "i" } },
        { birthday: { $regex: query, $options: "i" } },
        { gender: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday student topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Server error: Failed to fetch student" });
  }
};

module.exports = {
  addStudent,
  getStudents,
  getStudentById,
  updateStudents,
  deleteStudent,
  searchStudent,
};
