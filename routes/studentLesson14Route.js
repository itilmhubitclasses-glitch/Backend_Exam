const { Router } = require("express");
const studentLesson14 = Router();

// 6af83468508ae4c2c968b8a3 student id ishlatish uchunn
// 6afc351923f15a52e52bd239 lesson id for example
const {
  addStudentLesson14,
  getStudentLesson14,
  getStudentLesson14ById,
  deleteStudentLesson14,
  updateStudentLesson14,
  searchStudentLesson14,
} = require("../controllers/studentLesson14.controller");

const {
  createStudentLesson14ValidationSchema,
  updateStudentLesson14ValidationSchema
} = require("../validation/studentLessonValidation")

const validateSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      success: false,
      message: validationResult.error.details[0].message,
    });
  }

  next();
};

/**
 * @swagger
 * /studentLesson14/addStudentLesson14:
 *   post:
 *     summary: Yangi studentLesson14 yaratish
 *     tags: [Student_lesson]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lesson_id
 *               - student_id
 *             properties:
 *               lesson_id:
 *                 type: string
 *                 description: Lesson IDsi
 *               student_id:
 *                 type: string
 *                 description: Student IDsi
 *               is_there:
 *                 type: boolean
 *                 description: Bor yoki yo'qligi
 *               reason:
 *                 type: string
 *                 description: Sababi
 *               be_paid:
 *                 type: boolean
 *                 description: To'langanligi
 *     responses:
 *       '201':
 *         description: studentLesson14 yaratildi
 *       '400':
 *         description: Validation xatosi
 *       '500':
 *         description: Server xatosi
 */
studentLesson14.post("/addStudentLesson14", validateSchema(createStudentLesson14ValidationSchema) ,addStudentLesson14);

/** 
 * @swagger
 * /studentLesson14/getStudentLesson14:
 *   get:
 *     summary: Barcha studentLesson14 larni olish
 *     tags: [Student_lesson]
 *     responses:
 *       '200':
 *         description: studentLesson14 ro'yxati
 *       '500':
 *         description: Server xatosi
 */
studentLesson14.get("/getStudentLesson14", getStudentLesson14);

/** 
 * @swagger
 * /studentLesson14/search:
 *   get:
 *     summary: studentLesson14 qidirish
 *     tags: [Student_lesson]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Topilgan studentLesson14 lar
 */
studentLesson14.get("/search", searchStudentLesson14);

/** 
 * @swagger
 * /studentLesson14/getStudentLesson14ById/{id}:
 *   get:
 *     summary: ID orqali studentLesson14 olish
 *     tags: [Student_lesson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: studentLesson14 topildi
 *       '404':
 *         description: studentLesson14 topilmadi
 *       '500':
 *         description: Server xatosi
 */
studentLesson14.get("/getStudentLesson14ById/:id", getStudentLesson14ById);

/**
 * @swagger
 * /studentLesson14/deleteStudentLesson14/{id}:
 *   delete:
 *     summary: studentLesson14 o'chirish
 *     tags: [Student_lesson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: studentLesson14 o'chirildi
 *       '404':
 *         description: studentLesson14 topilmadi
 *       '500':
 *         description: Server xatosi
 */
studentLesson14.delete("/deleteStudentLesson14/:id", deleteStudentLesson14);

/**
 * @swagger
 * /studentLesson14/updateStudentLesson14ById/{id}:
 *   put:
 *     summary: studentLesson14 ma'lumotlarini yangilash
 *     tags: [Student_lesson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lesson_id:
 *                 type: string
 *                 description: Lesson IDsi
 *               student_id:
 *                 type: string
 *                 description: Student IDsi
 *               is_there:
 *                 type: boolean
 *                 description: Bor yoki yo'qligi
 *               reason:
 *                 type: string
 *                 description: Sababi
 *               be_paid:
 *                 type: boolean
 *                 description: To'langanligi
 *     responses:
 *       '200':
 *         description: studentLesson14 yangilandi
 *       '400':
 *         description: Validation xatosi
 *       '404':
 *         description: studentLesson14 topilmadi
 *       '500':
 *         description: Server xatosi
 */
studentLesson14.put("/updateStudentLesson14ById/:id", validateSchema(updateStudentLesson14ValidationSchema), updateStudentLesson14);
studentLesson14.put("/updateStudentLesson14/:id", validateSchema(updateStudentLesson14ValidationSchema), updateStudentLesson14);

module.exports = { studentLesson14 };