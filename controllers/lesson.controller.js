const { Lesson } = require("../model/lessonSchema");

// Add Lesson
const addLesson = async (req, res) => {
  try {
    const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;
    const existingLesson = await Lesson.findOne({ lesson_theme });

    console.log(existingLesson);

    if (existingLesson) {
      return res.status(400).json({
        success: false,
        message: "Bu nom bilan royxatdan o'tilgan",
      });
    } else {
      const newLesson = new Lesson({
        lesson_theme,
        lesson_number,
        group_id,
        lesson_date,
      });
      await newLesson.save();
      return res.status(201).json({
        success: true,
        message: "Royxatdan otish muvaffaaqiyatli yakunlandi.",
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

// Get Lesson
const getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.find({});
    res.json({
      success: true,
      message: "Barcha lesson lar royhati olingan",
      innerData: lesson,
    });
  } catch (error) {
    console.error("Error fetching lesson:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Lesson olishda xato yuz berdi.",
    });
  }
};

// get Lesson by id
const getLessonById = async (req, res) => {
  try {
    const lessonId = req.params.id;

    const name = await Lesson.findById(lessonId);
    if (!name) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json({ message: "Lesson found", name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// update lesson by id
const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const { lesson_theme, lesson_number, group_id, lesson_date } = req.body;
    const updateLesson = await Lesson.findByIdAndUpdate(
      id,
      { lesson_theme, lesson_number, group_id, lesson_date },
      { new: true },
    );
    if (!updateLesson) {
      return res.status(404).json({
        success: true,
        message: "Branch not found",
      });
    }
    res.json({
      success: true,
      message: "Lesson update sucessfully!",
      name: updateLesson,
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

//  delete lesson by id
const deleteLesson = async (req, res) => {
  try {
    const lessonId = req.params.id;

    const name = await Lesson.findByIdAndDelete(lessonId);

    res.json({
      message: "lesson deleted succesfully",
      name,
    });

    if (!name) {
      return res.status(404).json({
        message: "lesson not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ----------- Search Lesson ----------- //
const searchLesson = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query != "string") {
      return res.status(400).json({ message: "Invalid search query" });
    }

    const result = await Lesson.find({
      $or: [
        { lesson_theme: { $regex: query, $options: "i" } },
        { lesson_date: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday lesson topilmadi" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching lesson:", error);
    res.status(500).json({ message: "Server error: Failed to fetch lesson" });
  }
};

module.exports = {
  addLesson,
  getLesson,
  getLessonById,
  updateLesson,
  deleteLesson,
  searchLesson,
};
