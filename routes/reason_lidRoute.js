const { Router } = require("express");
const reason_lid = Router();

const {
  addReason_lid,
  getReason_lid,
  getReason_lidById,
  updateReason_lid,
  reason_lidDelete,
  searchReason_lid,
} = require("../controllers/reason_lid.controller");

const {
createReasonlid10Validation,
updateReasonlid10Validation,
} = require("../validation/reason_lid")

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
 * /reason_lid/addReason_lid:
 *  post:
 *    summary: Yangi reason_lid royxatdan otkazish
 *    tags:
 *      - reason_lid
 *    description: Yangi reason_lid yaratildi
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - reason_lid
 *            properties:
 *              reason_lid:
 *                type: string
 *                description: "reasonlid"
 *
 *    responses:
 *      '201':
 *        description: reason_lid muvaffaqiyatli royhatdan otdi
 *      '400':
 *        description: reason_lid band yoki notogri malumot yuborilgan.
 *      '500':
 *        description: Ichki server xatosi.
 *
 */
reason_lid.post("/addReason_lid",validateSchema(createReasonlid10Validation) ,addReason_lid);

/**
 * @swagger
 * /reason_lid/getReason_lid:
 *  get:
 *    summary: Barcha reason_lid larni olish
 *    tags: [reason_lid]
 *    description: Barcha reason_lid royhatini olish
 *    responses:
 *      '200':
 *        description: reason_lid muvaffaqiyatli royhatdan otdi
 *      '500':
 *        description: Ichki server hatosi
 */
reason_lid.get("/getReason_lid", getReason_lid);

/**
 * @swagger
 * /reason_lid/getReason_lidById/{id}:
 *   get:
 *     summary: reason_lid ID bo'yicha olish
 *     tags: [reason_lid]
 *     description: reason_lid ni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: reason_lid ni olish uchun ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: reason_lid muvaffaqiyatli qaytarildi
 *       '404':
 *         description: reason_lid topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
reason_lid.get("/getReason_lidById/:id",getReason_lidById);

/**
 * @swagger
 * /reason_lid/updateReason_lid/{id}:
 *   put:
 *     summary: reason_lid yangilash
 *     tags: [reason_lid]
 *     description: reason_lid ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: reason_lid topish uchun ID
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
 *               reason_lid:
 *                 type: string
 *                 description: Yangi reason_lid
 *     responses:
 *       '200':
 *         description: reason_lid muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: reason_lid topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
reason_lid.put("/updateReason_lid/:id", validateSchema(updateReasonlid10Validation),updateReason_lid);

/**
 * @swagger
 * /reason_lid/reason_lidDelete/{id}:
 *   delete:
 *     summary: reason_lid ni id orqali ochirish
 *     tags: [reason_lid]
 *     description: reason_lid ni kirtilgan id orqali ochirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID orqali reason_lid ni ochirish 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: reason_lid muvaffaqiyatli ochirildi
 *       '404':
 *         description: reason_lid topilmadi
 *       '500':
 *         description: Internal server hatosi
 */
reason_lid.delete("/reason_lidDelete/:id", reason_lidDelete);

/**
 * @swagger
 * /reason_lid/searchReason_lid:
 *   get:
 *     summary: reason_lid ni qidirish
 *     tags: [reason_lid]
 *     description: Qidiruv so'rovi orqali reason_lid izlash
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidiruv so'rovi orqali reason_lid izlash
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *      '404':
 *        description: reason_lid topilmadi
 *      '500':
 *        description: Ichki server xatosi
 */
reason_lid.get("/searchReason_lid", searchReason_lid);

module.exports = { reason_lid };

