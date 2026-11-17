const { Router } = require("express");
const branch = Router();

const {
    addBranch,
    getBranch,
    getBranchById,
    updateBranch,
    branchDelete,
    searchBranch,
} = require("../controllers/branch.contoller");

const {
createBranch5ValidationSchema,
updateBranch5ValidationSchema,
} = require("../validation/branch5Validation");
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
 * /branch/addBranch:
 *  post:
 *    summary: Yangi Branch royxatdan otkazish
 *    tags:
 *      - Branch 
 *    description: Yangi Branch yaratildi
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - nameb
 *            properties:
 *              nameb:
 *                type: string
 *                description: "Farrukh"
 *              address:
 *                type: string
 *                description: "address"
 *              call_number:
 *                type: string
 *                description: "telefon-raqam"
 *                
 *    responses:
 *      '201':
 *        description: Branch muvaffaqiyatli royhatdan otdi
 *      '400':
 *        description: nameb band yoki notogri malumot yuborilgan.
 *      '500':
 *        description: Ichki server xatosi.
 *
 */
branch.post("/addBranch", validateSchema(createBranch5ValidationSchema),addBranch);

/**
 * @swagger
 * /branch/getBranch:
 *  get:
 *    summary: Barcha branch larni olish
 *    tags: [Branch]
 *    description: Barcha branchlar royhatini olish
 *    responses:
 *      '200':
 *        description: branch muvaffaqiyatli royhatdan otdi
 *      '500':
 *        description: Ichki server hatosi
 */
branch.get("/getBranch", getBranch);

/**
 * @swagger
 * /branch/getBranchById/{id}:
 *   get:
 *     summary: Branch ID bo'yicha olish
 *     tags: [Branch]
 *     description: Branch ni ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Branch ni olish uchun ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Branch muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Branch topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
branch.get("/getBranchById/:id", getBranchById);

/**
 * @swagger
 * /branch/updateBranch/{id}:
 *   put:
 *     summary: Branch yangilash
 *     tags: [Branch]
 *     description: Branch ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Branch topish uchun ID
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
 *               nameb:
 *                 type: string
 *                 description: Yangi ism
 *               address:
 *                 type: string
 *                 description: Yangi address
 *               call_number:
 *                 type: string
 *                 description: Yangi telefon raqam
 *     responses:
 *       '200':
 *         description: Branch muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: branch topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
branch.put("/updateBranch/:id", validateSchema(updateBranch5ValidationSchema),updateBranch);

/**
 * @swagger
 * /branch/branchDelete/{id}:
 *   delete:
 *     summary: Branch ni id orqali ochirish
 *     tags: [Branch]
 *     description: Branch ni kirtilgan id orqali ochirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID orqali Branch ni ochirish 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Branch muvaffaqiyatli ochirildi
 *       '404':
 *         description: Branch topilmadi
 *       '500':
 *         description: Internal server hatosi
 */
branch.delete("/branchDelete/:id", branchDelete);

/**
 * @swagger
 * /branch/searchBranch:
 *   get:
 *     summary: branch ni qidirish
 *     tags: [Branch]
 *     description: Qidiruv so'rovi orqali branch izlash
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidiruv so'rovi orqali branch izlash
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *      '404':
 *        description: branch topilmadi
 *      '500':
 *        description: Ichki server xatosi
 */
branch.get("/searchBranch", searchBranch);

module.exports = {branch}