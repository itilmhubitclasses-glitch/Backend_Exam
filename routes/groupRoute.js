const { Router } = require("express");
const group = Router();

const {
  addGroup,
  getGroup,
  getGroupById,
  updateGroup,
  groupDelete,
  searchGroup,
} = require("../controllers/group.controller");

const { createGroup6ValidationSchema, updateGroup6ValidationSchema } = require("../validation/groupValidation");
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
 * /group/addGroup:
 *  post:
 *    summary: Yangi gruppa royxatdan otkazish
 *    tags:
 *      - Groups
 *    description: Yangi gruppa yaratildi
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - group_name
 *              - branch_id
 *            properties:
 *              group_name:
 *                type: string
 *                description: start time
 *              lesson_start_time:
 *                type: string
 *                description: "dars_boshlanish_vaqti"
 *              lesson_continious:
 *                type: string
 *                description: "dars_vaqti"
 *              lesson_week_day:
 *                type: string
 *                description: "haftadagi_kunlari"
 *              group_stage_idint:
 *                type: string
 *                description: "id"
 *              room_number:
 *                type: string
 *                description: "hona_soni"
 *              room_floor:
 *                type: string
 *                description: "hona_qavati"
 *              branch_id:
 *                type: string
 *                description: "id_kiriting"
 *              lessons_quant:
 *                type: string
 *                description: "time"
 *              is_active:
 *                type: boolean
 *                description: true
 *    responses:
 *      '201':
 *        description: Group muvaffaqiyatli royhatdan otdi
 *      '400':
 *        description: group_name band yoki notogri malumot yuborilgan.
 *      '500':
 *        description: Ichki server xatosi.
 *
 */
group.post("/addGroup", validateSchema(createGroup6ValidationSchema) ,addGroup);

/**
 * @swagger
 * /group/getGroup:
 *  get:
 *    summary: Barcha group lar olish
 *    tags: [Groups]
 *    description: Barcha group lar royhatini olish
 *    responses:
 *      '200':
 *        description: Group muvaffaqiyatli royhatdan otdi
 *      '500':
 *        description: Ichki server hatosi
 */
group.get("/getGroup", getGroup);

/**
 * @swagger
 * /group/getGroupById/{id}:
 *   get:
 *     summary: Group ID bo'yicha olish
 *     tags: [Groups]
 *     description: Group ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Group olish uchun ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Group muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Group topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
group.get("/getGroupById/:id", getGroupById);

/**
 * @swagger
 * /group/updateGroup/{id}:
 *   put:
 *     summary: Group yangilash
 *     tags: [Groups]
 *     description: Group ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Group topish uchun ID
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
 *               group_name:
 *                type: string
 *                description: yangi start time
 *               lesson_start_time:
 *                 type: string
 *                 description: "yangi dars_boshlanish_vaqti"
 *               lesson_continious:
 *                 type: string
 *                 description: "yangi dars_vaqti"
 *               lesson_week_day:
 *                 type: string
 *                 description: "yangi haftadagi_kunlari"
 *               group_stage_idint:
 *                 type: string
 *                 description: "yangi id"
 *               room_number:
 *                 type: string
 *                 description: "yangi hona_soni"
 *               room_floor:
 *                 type: string
 *                 description: "yangi hona_qavati"
 *               branch_id:
 *                 type: string
 *                 description: "yangi id_kiriting"
 *               lessons_quant:
 *                 type: string
 *                 description: "yangi time"
 *               is_active:
 *                 type: boolean
 *                 description: true
 *     responses:
 *       '200':
 *         description: Group muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Group topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
group.put("/updateGroup/:id", validateSchema(updateGroup6ValidationSchema),updateGroup);

/**
 * @swagger
 * /group/groupDelete/{id}:
 *   delete:
 *     summary: Delete a group by ID
 *     tags: [Groups]
 *     description: Delete a group with the provided id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the group to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Group deleted succesfully
 *       '404':
 *         description: Group not found
 *       '500':
 *         description: Internal server error
 */
group.delete("/groupDelete/:id", groupDelete);

/**
 * @swagger
 * /group/searchGroup:
 *   get:
 *     summary: group ni qidirish
 *     tags: [Group]
 *     description: Qidiruv so'rovi orqali group izlash
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidiruv so'rovi orqali group izlash
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *      '404':
 *        description: group topilmadi
 *      '500':
 *        description: Ichki server xatosi
 */
group.get("/searchGroup", searchGroup);

module.exports = { group };
