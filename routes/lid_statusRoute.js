const { Router } = require("express");
const lid_status = Router();

const {
  addLid_status,
  getLid_status,
  getLid_statusById,
  updateLid_status,
  lid_statusDelete,
  searchLid_status,
} = require("../controllers/lid_status.controller");

const {
  createStatus9ValidationSchema,
  updateStatus9ValidationSchema,
} = require("../validation/statusValidation");

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
 * /lid_status/addLid_status:
 *  post:
 *    summary: Yangi Lid_Status royxatdan otkazish
 *    tags:
 *      - lid_status
 *    description: Yangi Lid_Status yaratildi
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - status
 *            properties:
 *              status:
 *                type: string
 *                description: "status"
 *
 *    responses:
 *      '201':
 *        description: lid_status muvaffaqiyatli royhatdan otdi
 *      '400':
 *        description: status band yoki notogri malumot yuborilgan.
 *      '500':
 *        description: Ichki server xatosi.
 *
 */
lid_status.post("/addLid_status", validateSchema(createStatus9ValidationSchema), addLid_status);

/**
 * @swagger
 * /lid_status/getLid_status:
 *  get:
 *    summary: Barcha lid_status larni olish
 *    tags: [lid_status]
 *    description: Barcha lid_status royhatini olish
 *    responses:
 *      '200':
 *        description: lid_status muvaffaqiyatli royhatdan otdi
 *      '500':
 *        description: Ichki server hatosi
 */
lid_status.get("/getLid_status", getLid_status);

/**
 * @swagger
 * /lid_status/getLid_statusById/{id}:
 *   get:
 *     summary: Lid_status ID bo'yicha olish
 *     tags: [lid_status]
 *     description: Lid_status ni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Lid_status ni olish uchun ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lid_status muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Lid_status topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lid_status.get("/getLid_statusById/:id", getLid_statusById);

/**
 * @swagger
 * /lid_status/updateLid_status/{id}:
 *   put:
 *     summary: lid_status yangilash
 *     tags: [lid_status]
 *     description: lid_status ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: lid_status topish uchun ID
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
 *               status:
 *                 type: string
 *                 description: Yangi status
 *     responses:
 *       '200':
 *         description: lid_status muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: status topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lid_status.put("/updateLid_status/:id", validateSchema(updateStatus9ValidationSchema), updateLid_status);

/**
 * @swagger
 * /lid_status/lid_statusDelete/{id}:
 *   delete:
 *     summary: lid_status ni id orqali ochirish
 *     tags: [lid_status]
 *     description: lid_status ni kirtilgan id orqali ochirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID orqali lid_status ni ochirish 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: lid_status muvaffaqiyatli ochirildi
 *       '404':
 *         description: lid_status topilmadi
 *       '500':
 *         description: Internal server hatosi
 */
lid_status.delete("/lid_statusDelete/:id", lid_statusDelete);

/**
 * @swagger
 * /lid_status/searchLid_status:
 *   get:
 *     summary: lid_status ni qidirish
 *     tags: [lid_status]
 *     description: Qidiruv so'rovi orqali lid_status izlash
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidiruv so'rovi orqali lid_status izlash
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *      '404':
 *        description: lid_status topilmadi
 *      '500':
 *        description: Ichki server xatosi
 */
lid_status.get("/searchLid_status", searchLid_status);

module.exports = { lid_status };

