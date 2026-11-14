const { Router } = require("express");
const {
  addStudent_group,
  getStudent_group,
  getStudent_groupById,
  student_groupDelete,
  updateStudent_group,
} = require("../controllers/student_group.controller");

const student_group = Router();

const {
  createStudentGroup13ValidationSchema,
  updateStudentGroup13ValidationSchema
} = require("../validation/studentGroupValidation");
const { valid } = require("joi");

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
 * /student_group/addStudent_group:
 *  post:
 *    summary: Yangi st_group qo'shish
 *    tags:
 *      - Student_group
 *    description: Yangi student_group yaratildi
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - student_id
 *              - group_id
 *            properties:
 *              student_id:
 *                type: string
 *                description: "6ae5be15a6fc00c600bb5f93"
 *              group_id:
 *                type: string
 *                description: "6ae07c633a4058581699a5bb"
 *    responses:
 *      '201':
 *        description: student_group muvaffaqiyatli yaratildi.
 *      '500':
 *        description: ichki server xatosi
 */
student_group.post("/addStudent_group", validateSchema(createStudentGroup13ValidationSchema),addStudent_group);

/**
 * @swagger
 * /student_group/getStudent_group:
 *   get:
 *     summary: Barcha st_gr larni olish
 *     tags: [Student_group]
 *     description: Barcha st_gr larni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: st_gr lar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
student_group.get("/getStudent_group", getStudent_group);

/**
 * @swagger
 * /student_group/getStudent_groupById/{id}:
 *   get:
 *     summary: student_group Id boyicha olish
 *     tags: [Student_group]
 *     description: Id bilan olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: student_group olish uchun ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: student_group muvaffaqiyatli qaytarildi
 *       '404':
 *         description: student_group topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
student_group.get("/getStudent_groupById/:id", getStudent_groupById);

/**
 * @swagger
 * /student_group/student_groupDelete/{id}:
 *   delete:
 *     summary: Delete a student_group by id
 *     tags: [Student_group]
 *     description: Delete a student_group with the provided id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the student_group to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: student_group deleted succesfully
 *       '404':
 *         description: student_group not found
 *       '500':
 *         description: Internal server error
 */
student_group.delete("/student_groupDelete/:id", student_groupDelete);

/**
 * @swagger
 * /student_group/updateStudent_group/{id}:
 *   put:
 *     summary: Student_group yangilash
 *     tags: [Student_group]
 *     description: Student_group ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Student_group topish uchun ID
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
 *               student_id:
 *                 type: string
 *                 description: Yangi student_id
 *               group_id:
 *                 type: string
 *                 description: Yangi group_id
 *     responses:
 *       '200':
 *         description: Student_group muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Student_group topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
student_group.put("/updateStudent_group/:id",validateSchema(updateStudentGroup13ValidationSchema) ,updateStudent_group);


module.exports = {student_group};
