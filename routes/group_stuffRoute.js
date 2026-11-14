const { Router } = require("express");
const {
  addGroup_stuff,
  getGroup_stuff,
  getGroup_stuffById,
  updateGroup_stuff,
  deleteGroup_stuff,
} = require("../controllers/group_stuff.controller");

const group_stuff = Router();

const {
createGroupStuff7ValidationSchema,
updateGroupStuff7ValidationSchema,
} = require("../validation/group_stuffValidation")

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
 * /group_stuff/addaddGroup_stuff:
 *  post:
 *    summary: Yangi group_stuff qo'shish
 *    tags:
 *      - group_stuff
 *    description: Yangi group_stuff yaratildi
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
 *              branch_id:
 *                type: string
 *                : "6ae5be15a6fc00c600bb5f93"
 *              stuff_id:
 *                type: string
 *                example: "6ae07c633a4058581699a5bb"
 *    responses:
 *      '201':
 *        description: group_stuff muvaffaqiyatli yaratildi.
 *      '500':
 *        description: ichki server xatosi
 */
group_stuff.post("/addaddGroup_stuff", validateSchema(createGroupStuff7ValidationSchema) ,addGroup_stuff);

/**
 * @swagger
 * /group_stuff/getGroup_stuff:
 *   get:
 *     summary: Barcha stuflarni olish
 *     tags: [group_stuff]
 *     description: Barcha group_stufflarni ro'yxatini olish
 *     responses:
 *       '200':
 *         description: group_stuff lar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
group_stuff.get("/getGroup_stuff", getGroup_stuff);

/**
 * @swagger
 * /group_stuff/getGroup_stuffById/{id}:
 *   get:
 *     summary: group_stuff Id boyicha olish
 *     tags: [group_stuff]
 *     description: Id bilan olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: group_stuff olish uchun ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: group_stuff muvaffaqiyatli qaytarildi
 *       '404':
 *         description: group_stuff topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
group_stuff.get("/getGroup_stuffById/:id", getGroup_stuffById);

/**
 * @swagger
 * /group_stuff/updateGroup_stuff/{id}:
 *   put:
 *     summary: Group_stuff yangilash
 *     tags: [group_stuff]
 *     description: Group_stuff ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Group_stuff topish uchun ID
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
 *               group_id:
 *                 type: string
 *                 description: Yangi role_id
 *               stuff_id:
 *                 type: string
 *                 description: Yangi stuff_id
 *     responses:
 *       '200':
 *         description: Group_stuff muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Group_stuff topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
group_stuff.put("/updateGroup_stuff/:id", validateSchema(updateGroupStuff7ValidationSchema),updateGroup_stuff);

/**
 * @swagger
 * /group_stuff/deleteGroup_stuff/{id}:
 *   delete:
 *     summary: Delete a group_stuff by id
 *     tags: [group_stuff]
 *     description: Delete a group_stuff with the provided id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the group_stuff to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: group_stuff deleted succesfully
 *       '404':
 *         description: group_stuff not found
 *       '500':
 *         description: Internal server error
 */
group_stuff.delete("/deleteGroup_stuff/:id", deleteGroup_stuff);

module.exports = {group_stuff};
