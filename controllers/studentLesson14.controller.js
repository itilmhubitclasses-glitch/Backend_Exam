const { StudentLesson14 } = require("../model/studentLesson14Schema");

//------------------------------addStudentLesson14----------------------//
const addStudentLesson14 = async (req, res) => {
  try {
    const { lesson_id, student_id, is_there, reason, be_paid } = req.body;
    const existingRelation = await StudentLesson14.findOne({
      lesson_id,
      student_id,
    });

    console.log(existingRelation);

    if (existingRelation) {
      return res.status(400).json({
        success: false,
        message: "bu student_lesson mavjud",
      });
    } else {
      const newStudentLesson = new StudentLesson14({
        lesson_id,
        student_id,
        is_there,
        reason,
        be_paid,
      });
      await newStudentLesson.save();
      return res.status(201).json({
        success: true,
        message: "student_lesson yaratildi",
      });
    }
  } catch (error) {
    console.error("Xato", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//------------------------Get student_lesson14------------------------//
const getStudentLesson14 = async (req, res) => {
  try {
    const studentLessons = await StudentLesson14.find({})
      .populate("lesson_id")
      .populate("student_id");
    res.json({
      success: true,
      message: "StudentLesson ro'yxati",
      innerData: studentLessons,
    });
  } catch (error) {
    console.error("Error fetching StudentLesson14", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//--------------------getStudentLesson14ById--------------------
const getStudentLesson14ById = async (req, res) => {
  try {
    const id = req.params.id;

    const studentLesson = await StudentLesson14.findById(id)
      .populate("lesson_id")
      .populate("student_id");

    if (!studentLesson) {
      return res
        .status(404)
        .json({ success: false, message: "student_lesson topilmadi" });
    }
    res.json({
      success: true,
      message: "student_lesson topildi",
      studentLesson,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

//--------------------deleteStudentLesson14------------------//
const deleteStudentLesson14 = async (req, res) => {
  try {
    const { id } = req.params;

    const studentLesson = await StudentLesson14.findByIdAndDelete(id);
    if (studentLesson) {
      res.status(200).json({
        success: true,
        message: "student_lesson o'chirildi",
        delete_student_lesson: studentLesson._id,
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "student_lesson topilmadi" });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//--------------------------update StudentLesson14------------------------//
const updateStudentLesson14 = async (req, res) => {
  try {
    const { id } = req.params;
    const updateStudentLesson = await StudentLesson14.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
    );
    if (!updateStudentLesson) {
      return res.status(404).json({
        success: false,
        message: "student_lesson topilmadi",
      });
    }
    res.json({
      success: true,
      message: "student_lesson yangilandi", 
      student_lesson: updateStudentLesson,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

//----------------------search StudentLesson14-----------------//
const searchStudentLesson14 = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res
        .status(400)
        .json({ success: false, message: "Noto'g'ri qidiruv so'rovi" });
    }

    const result = await StudentLesson14.find({
      $or: [{ reason: { $regex: query, $options: "i" } }],
    })
      .populate("lesson_id")
      .populate("student_id");
    if (result.length === 0) {
      return res.json({
        success: false,
        message: "Bunday student_lesson topilmadi",
      });
    }
    res.json({ success: true, innerData: result });
  } catch (error) {
    console.error("Error fetching StudentLesson:", error);
    res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

module.exports = {
  addStudentLesson14,
  getStudentLesson14,
  getStudentLesson14ById,
  searchStudentLesson14,
  updateStudentLesson14,
  deleteStudentLesson14,
};
