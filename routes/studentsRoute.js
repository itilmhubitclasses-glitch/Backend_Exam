const { Router } = require("express");
const students = Router();

const {
  addStudent,
  getStudents,
  getStudentById,
  updateStudents,
  deleteStudent,
  searchStudent,
} = require("../controllers/students.controller");

const {
  createStudent12ValidationSchema,
  updateStudent12ValidationSchema,
} = require("../validation/studentsValidation");

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
 * /students/addStudent:
 *  post:
 *    summary: Yangi Student qoshish
 *    tags:
 *      - Students
 *    description: Yangi Student yaratildi
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - first_name
 *              - last_name
 *            properties:
 *               lid_id:
 *                 type: string
 *                 description: "Id"
 *               first_name:
 *                 type: string
 *                 description: "name"
 *               last_name:
 *                 type: string
 *                 description: "lastname"
 *               phone_number:
 *                 type: string
 *                 description: "+998991234567"
 *               birthday:
 *                 type: string
 *                 description: "birthday"
 *               gender:
 *                 type: string
 *                 description: "gender"
 *    responses:
 *      '201':
 *        description: student muvaffaqiyatli yaratildi.
 *      '500':
 *        description: ichki server xatosi
 */
students.post("/addStudent", validateSchema(createStudent12ValidationSchema), addStudent);

/**
 * @swagger
 * /students/getStudents:
 *   get:
 *     summary: Barcha Studentlar ni olish
 *     tags: [Students]
 *     description: Barcha Studentlar ro'yxati olish
 *     responses:
 *       '200':
 *         description: Studentlar ro'yxatio muvaffaqiyotli qaytarildi
 *       '500':
 *         description: Interval server error
 */
students.get("/getStudents", getStudents);

/**
 * @swagger
 * /students/getStudentById/{id}:
 *   get:
 *    summary: Student id boyicha olish
 *    tags: [Students]
 *    description: Id bilan Student olish
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Student olish uchun Id
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: students muvaffaqiyotli qaytarildi
 *      '404':
 *        description: students topilmadi
 *      '500':
 *        description: Interval server error
 */
students.get("/getStudentById/:id", getStudentById);

/**
 * @swagger
 * /students/updateStudents/{id}:
 *  put:
 *    summary: students yangilash
 *    tags: [Students]
 *    description: students ma'lumotlarini yangilash
 *    parameters:
 *      - in: path
 *        name: id
 *        description: students topish uchun id
 *    required: true
 *    schema:
 *      type: string
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                lid_id:
 *                  type: string
 *                  description: "new_Id"
 *                first_name:
 *                  type: string
 *                  description: "new_name"
 *                last_name:
 *                  type: string
 *                  description: "new_lastname"
 *                phone_number:
 *                  type: string
 *                  description: "new_+998991234567"
 *                birthday:
 *                  type: string
 *                  description: "new_birthday"
 *    responses:
 *      '200':
 *        description: students muvaffaqiyotli yaratildi
 *      '400':
 *        description: Yomon so'rov validatsiya xatosi
 *      '404':
 *        description: students not Found
 *      '500':
 *        description: Server Interval error
 */
students.put("/updateStudents/:id", validateSchema(updateStudent12ValidationSchema), updateStudents);

/**
 * @swagger
 * /students/deleteStudent/{id}:
 *   delete:
 *     summary: Delete Student with provided id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of the Student to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Student delete succesfully
 *       '404':
 *         description: Student not Found
 *       '500':
 *         descriptio: Interval server error
 */
students.delete("/deleteStudent/:id", deleteStudent);

/**
 * @swagger
 * /students/searchStudent:
 *   get:
 *     summary: student ni qidirish
 *     tags: [Students]
 *     description: Qidiruv so'rovi orqali student izlash
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidiruv so'rovi orqali student izlash
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *      '404':
 *        description: student topilmadi
 *      '500':
 *        description: Ichki server xatosi
 */
students.get("/searchStudent", searchStudent);

module.exports = {students}
