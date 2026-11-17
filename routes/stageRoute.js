const { Router } = require("express");
const stages = Router();

const {
  addStage,
  getStage,
  getStageById,
  stageDelete,
  updateStage,
  searchStage,
} = require("../controllers/stage.controller");

const {
  createStage4ValidationSchema,
  updateStage4ValidationSchema,
} = require("../validation/stageValidation")

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
 * /stages/addStage:
 *  post:
 *    summary: Yangi Stage royxatdan otkazish
 *    tags:
 *      - Stages
 *    description: Yangi Stage yaratildi
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              names:
 *                type: string
 *                description: "Farrux"
 *
 *    responses:
 *      '201':
 *        description: Stages muvaffaqiyatli royhatdan otdi
 *      '400':
 *        description: name band yoki notogri malumot yuborilgan.
 *      '500':
 *        description: Ichki server xatosi.
 *
 */
stages.post("/addStage", validateSchema(createStage4ValidationSchema) ,addStage);

/**
 * @swagger
 * /stages/getStage:
 *  get:
 *    summary: Barcha Stages larni olish
 *    tags: [Stages]
 *    description: Barcha Stagelar royhatini olish
 *    responses:
 *      '200':
 *        description: Stagelar muvaffaqiyatli royhatdan otdi
 *      '500':
 *        description: Ichki server hatosi
 */
stages.get("/getStage", getStage);

/**
 * @swagger
 * /stages/getStageById/{id}:
 *   get:
 *     summary: Stage ID bo'yicha olish
 *     tags: [Stages]
 *     description: Stage ni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Stage ni olish uchun ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stage muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Stage topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stages.get("/getStageById/:id", getStageById);

/**
 * @swagger
 * /stages/stageDelete/{id}:
 *   delete:
 *     summary: Stage ni id orqali ochirish
 *     tags: [Stages]
 *     description: Stage ni kirtilgan id orqali ochirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID orqali Stage ni ochirish 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stage muvaffaqiyatli ochirildi
 *       '404':
 *         description: Stage topilmadi
 *       '500':
 *         description: Internal server hatosi
 */
stages.delete("/stageDelete/:id", stageDelete);

/**
 * @swagger
 * /stages/updateStage/{id}:
 *   put:
 *     summary: Stage yangilash
 *     tags: [Stages]
 *     description: Stage ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         names: id
 *         description: Stage topish uchun ID
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
 *               names:
 *                 type: string
 *                 description: Yangi names
 *     responses:
 *       '200':
 *         description: Stage muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Stage topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stages.put("/updateStage/:id",validateSchema(updateStage4ValidationSchema) ,updateStage);

/**
 * @swagger
 * /stages/searchStage:
 *   get:
 *     summary: stage ni qidirish
 *     tags: [Stages]
 *     description: Qidiruv so'rovi orqali stage izlash
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidiruv so'rovi orqali stage izlash
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *      '404':
 *        description: stage topilmadi
 *      '500':
 *        description: Ichki server xatosi
 */
stages.get("/searchStage", searchStage);

module.exports = { stages };
