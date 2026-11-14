const { Router } = require("express");
const lesson = Router();

const {
  addLesson,
  getLesson,
  getLessonById,
  updateLesson,
  deleteLesson,
} = require("../controllers/lesson.controller");

const {
createLesson8ValidationSchema,
updateLesson8ValidationSchema,
} = require("../validation/lessonValidation")

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
 * /lesson/addLesson:
 *  post:
 *    summary: Yangi Lesson royxatdan otkazish
 *    tags:
 *      - Lesson 
 *    description: Yangi Lesson yaratildi
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - lesson_theme
 *            properties:
 *              lesson_theme:
 *                type: string
 *                description: "topic"
 *              lesson_number:
 *                type: number
 *                description: 77
 *              group_id:
 *                type: string
 *                description: "id"
 *              lesson_date:
 *                type: string
 *                description: "lessondata"
 *    responses:
 *      '201':
 *        description: Lesson muvaffaqiyatli royhatdan otdi
 *      '400':
 *        description: name band yoki notogri malumot yuborilgan.
 *      '500':
 *        description: Ichki server xatosi.
 *
 */
lesson.post("/addLesson", validateSchema(createLesson8ValidationSchema),addLesson);

/**
 * @swagger
 * /lesson/getLesson:
 *  get:
 *    summary: Barcha lesson larni olish
 *    tags: [Lesson]
 *    description: Barcha lessonlar royhatini olish
 *    responses:
 *      '200':
 *        description: lesson muvaffaqiyatli royhatdan otdi
 *      '500':
 *        description: Ichki server hatosi
 */
lesson.get("/getLesson", getLesson);

/**
 * @swagger
 * /lesson/getlessonById/{id}:
 *   get:
 *     summary: lesson ID bo'yicha olish
 *     tags: [Lesson]
 *     description: lesson ni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: lesson ni olish uchun ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: lesson muvaffaqiyatli qaytarildi
 *       '404':
 *         description: lesson topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lesson.get("/getLessonById/:id", getLessonById);

/**
 * @swagger
 * /lesson/updateLesson/{id}:
 *   put:
 *     summary: Lesson yangilash
 *     tags: [Lesson]
 *     description: Lesson ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Lesson topish uchun ID
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
 *               lesson_theme:
 *                type: string
 *                description: "new_topic"
 *               lesson_number:
 *                 type: number
 *                 description: 77
 *               group_id:
 *                 type: string
 *                 description: "new_id"
 *               lesson_date:
 *                 type: string
 *                 description: "new_lessondata"
 *     responses:
 *       '200':
 *         description: Lesson muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: lesson topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lesson.put("/updateLesson/:id",validateSchema(updateLesson8ValidationSchema) ,updateLesson);

/**
 * @swagger
 * /lesson/deleteLesson/{id}:
 *   delete:
 *     summary: lesson ni id orqali ochirish
 *     tags: [Lesson]
 *     description: lesson ni kirtilgan id orqali ochirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID orqali lesson ni ochirish 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: lesson muvaffaqiyatli ochirildi
 *       '404':
 *         description: lesson topilmadi
 *       '500':
 *         description: Internal server hatosi
 */
lesson.delete("/deleteLesson/:id", deleteLesson);

module.exports = {lesson}