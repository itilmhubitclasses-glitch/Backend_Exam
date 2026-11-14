const { Router } = require("express");
const roles = Router();

const {
  addRole,
  getRoles,
  getRoleById,
  roleDelete,
  updateRole,
  searchRole,
} = require("../controllers/role.controller");

const {
createRoleValidationSchema,
updateRoleValidationSchema,
} = require("../validation/roleValidation")

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
 * /roles/addRole:
 *  post:
 *    summary: Yangi Role royxatdan otkazish
 *    tags:
 *      - Roles
 *    description: Yangi Role yaratildi
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: string
 *                description: "Farrukh"
 *                
 *    responses:
 *      '201':
 *        description: role muvaffaqiyatli royhatdan otdi
 *      '400':
 *        description: name band yoki notogri malumot yuborilgan.
 *      '500':
 *        description: Ichki server xatosi.
 *
 */
roles.post("/addRole",validateSchema(createRoleValidationSchema), addRole);

/**
 * @swagger
 * /roles/getRoles:
 *  get:
 *    summary: Barcha role larni olish
 *    tags: [Roles]
 *    description: Barcha Rolelar royhatini olish
 *    responses:
 *      '200':
 *        description: Role muvaffaqiyatli royhatdan otdi
 *      '500':
 *        description: Ichki server hatosi
 */
roles.get("/getRoles", getRoles);

/**
 * @swagger
 * /roles/getRoleById/{id}:
 *   get:
 *     summary: Role ID bo'yicha olish
 *     tags: [Roles]
 *     description: Role ni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Role ni olish uchun ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Role muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Role topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
roles.get("/getRoleById/:id", getRoleById);

/**
 * @swagger
 * /roles/roleDelete/{id}:
 *   delete:
 *     summary: Role ni id orqali ochirish
 *     tags: [Roles]
 *     description: role ni kirtilgan id orqali ochirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID orqali role ni ochirish 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Role muvaffaqiyatli ochirildi
 *       '404':
 *         description: role topilmadi
 *       '500':
 *         description: Internal server hatosi
 */
roles.delete("/roleDelete/:id", roleDelete);

/**
 * @swagger
 * /roles/updateRole/{id}:
 *   put:
 *     summary: Role yangilash
 *     tags: [Roles]
 *     description: Role ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Role topish uchun ID
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
 *               name:
 *                 type: string
 *                 description: Yangi name
 *     responses:
 *       '200':
 *         description: Role muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: role topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
roles.put("/updateRole/:id", validateSchema(updateRoleValidationSchema) ,updateRole);

/**
 * @swagger
 * /roles/searchRole:
 *   get:
 *     summary: role ni qidirish
 *     tags: [Roles]
 *     description: Foydalanuvchilarni qidirish (masalan, ism yoki email bo'yicha)
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidiruv so'rovi orqali role izlash
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *      '404':
 *        description: role topilmadi
 *      '500':
 *        description: Ichki server xatosi
 */
roles.get("/searchRole", searchRole);

module.exports = {roles};