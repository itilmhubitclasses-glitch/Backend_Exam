const {
  Student_group,
} = require("../model/Student_groupSchema");

//  add student_group
const addStudent_group = async (req, res) => {
  try {
    const { students_id, group_id } = req.body;
    const existingStudent_group = await Student_group.findOne({
      students_id,
      group_id,
    });
    console.log(existingStudent_group);

    if (existingStudent_group) {
      return res.status(400).json({
        success: false,
        message: "Bu nom bilan royxatdan otilgan.",
      });
    } else {
      const newStudent_group = new Student_group({
        students_id,
        group_id,
      });

      await newStudent_group.save();

      return res.status(201).json({
        success: true,
        message: "Royxatdan otish muvaffaqiyatli yakunlandi.",
      });
    }
  } catch (error) {
    console.error("Xato:", error);

    return res.status(500).json({
      success: false,
      message: "Server xatosi: Ro'yxatdan otish jarayonida xato yuz berdi",
    });
  }
};

// get st_gr
const getStudent_group = async (req, res) => {
  try {
    const student_group = await Student_group.find({});
    res.json({
      success: true,
      message: "Barcha st_gr royhati olingan",
      innerData: student_group,
    });
  } catch (error) {
    console.error("Error fetching student_group:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: student_group olishda xato yuz berdi.",
    });
  }
};

// get st_gr by id
const getStudent_groupById = async (req, res) => {
  try {
    const student_groupId = req.params.id;

    const student_group = await Student_group.findById(student_groupId);
    if (!student_group) {
      return res.status(404).json({ message: "Student_group not found" });
    }

    res.json({ message: "Student_group found", student_group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// del st gr by id
const student_groupDelete = async (req, res) => {
  try {
    const student_groupId = req.params.id;

    const student_group =
      await Student_group.findByIdAndDelete(student_groupId);

    res.json({
      message: "Student_group deleted succesfully",
      student_group,
    });

    if (!student_group) {
      return res.status(404).json({
        message: "Student_group not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// update st gr by id
const updateStudent_group = async (req, res) => {
  try {
    const { id } = req.params;
    const { students_id, group_id } = req.body;
    const updateStudent_group = await Student_group.findByIdAndUpdate(
      id,
      { students_id, group_id },
      { new: true },
    );
    if (!updateStudent_group) {
      return res.status(404).json({
        success: true,
        message: "student_group not found",
      });
    }
    res.json({
      success: true,
      message: "student_group update sucessfully!",
      user: updateStudent_group,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal sever Error",
      error: error.message,
    });
  }
};

module.exports = {
  addStudent_group,
  getStudent_group,
  getStudent_groupById,
  student_groupDelete,
  updateStudent_group,
};
