const { Router } = require("express");
const {
  addStuff_role,
  getStuff_role,
  getStuff_roleById,
  stuff_roleDelete,
  updateStuff_role
} = require("../controllers/stuff_role.controller");

const stuff_role = Router();

const {
  createStuffRole3ValidationSchema,
  updateStuffRole3ValidationSchema,
} = require("../validation/stuff_roleValidation");

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
 * /stuff_role/addStuff_role:
 *  post:
 *    summary: Yangi staff qo'shish
 *    tags:
 *      - Stuff_role
 *    description: Yangi stuff_role yaratildi
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - role_id
 *              - stuff_id
 *            properties:
 *              role_id:
 *                type: string
 *                description: "6ae5be15a6fc00c600bb5f93"
 *              stuff_id:
 *                type: string
 *                description: "6ae07c633a4058581699a5bb"
 *    responses:
 *      '201':
 *        description: stuff_role muvaffaqiyatli yaratildi.
 *      '500':
 *        description: ichki server xatosi
 */
stuff_role.post(
  "/addStuff_role",
  validateSchema(createStuffRole3ValidationSchema),
  addStuff_role
);

/**
 * @swagger
 * /stuff_role/getStuff_role:
 *   get:
 *     summary: Barcha stuflarni olish
 *     tags: [Stuff_role]
 *     description: Barcha stuflarni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: stuff lar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
stuff_role.get("/getStuff_role", getStuff_role);

/**
 * @swagger
 * /stuff_role/getStuff_roleById/{id}:
 *   get:
 *     summary: stuff_role Id boyicha olish
 *     tags: [Stuff_role]
 *     description: Id bilan olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: stuff_role olish uchun ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: stuff_role muvaffaqiyatli qaytarildi
 *       '404':
 *         description: stuff_role topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stuff_role.get("/getStuff_roleByID/:id", getStuff_roleById);

/**
 * @swagger
 * /stuff_role/stuff_roleDelete/{id}:
 *   delete:
 *     summary: Delete a stuff_role by id
 *     tags: [Stuff_role]
 *     description: Delete a stuff_role with the provided id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the stuff_role to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: stuff_role deleted succesfully
 *       '404':
 *         description: stuff_role not found
 *       '500':
 *         description: Internal server error
 */
stuff_role.delete("/stuff_roleDelete/:id", stuff_roleDelete);

/**
 * @swagger
 * /stuff_role/updateStuff_role/{id}:
 *   put:
 *     summary: Stuff_role yangilash
 *     tags: [Stuff_role]
 *     description: Stuff_role ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Stuff_role topish uchun ID
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
 *               role_id:
 *                 type: string
 *                 description: Yangi role_id
 *               stuff_id:
 *                 type: string
 *                 description: Yangi stuff_id
 *     responses:
 *       '200':
 *         description: Stuff_role muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Stuff_role topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stuff_role.put(
  "/updateStuff_role/:id",
  validateSchema(updateStuffRole3ValidationSchema),
  updateStuff_role
);


module.exports = { stuff_role };
