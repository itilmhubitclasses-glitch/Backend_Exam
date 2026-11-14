const { Router } = require("express");
const stuff = Router();

const {
  addStuff,
  getStuff,
  getStuffById,
  deleteStuff,
  updateStuff,
} = require("../controllers/stuff.controller");

const {
  createStuff2ValidationSchema,
  updateStuff2ValidationSchema,
} = require("../validation/stuffValidation");
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
 * /stuff/addStuff:
 *  post:
 *    summary: Yangi stuff royxatdan otkazish
 *    tags:
 *      - Stuff
 *    description: Yangi Stuff yaratildi
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - login
 *              - parol
 *            properties:
 *              firstname:
 *                type: string
 *                description: Farrukh
 *              lastname:
 *                type: string
 *                description: Xamdamov
 *              phone_number:
 *                type: string
 *                description: "+998901234567"
 *              login:
 *                type: string
 *                description: kHamdamovF17
 *              parol:
 *                type: string
 *                description: Password123!
 *              is_active:
 *                type: string
 *                description: true
 *    responses:
 *      '201':
 *        description: Stuff muvaffaqiyatli royhatdan otdi
 *      '400':
 *        description: login band yoki notogri malumot yuborilgan.
 *      '500':
 *        description: Ichki server xatosi.
 *
 */
stuff.post("/addStuff",validateSchema(createStuff2ValidationSchema,) ,addStuff);

/**
 * @swagger
 * /stuff/getStuff:
 *  get:
 *    summary: Barcha Stuff larni olish
 *    tags: [Stuff]
 *    description: Barcha Stuff lar royhatini olish
 *    responses:
 *      '200':
 *        description: Stuff lar muvaffaqiyatli royhatdan otdi
 *      '500':
 *        description: Ichki server hatosi
 */
stuff.get("/getStuff", getStuff);

/**
 * @swagger
 * /stuff/getStuffById/{id}:
 *   get:
 *     summary: Stuff ID bo'yicha olish
 *     tags: [Stuff]
 *     description: Stuff ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Stuff olish uchun ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stuff muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Stuff topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stuff.get("/getStuffById/:id", getStuffById);

/**
 * @swagger
 * /stuff/deleteStuff/{id}:
 *   delete:
 *     summary: Delete a Stuff by ID
 *     tags: [Stuff]
 *     description: Delete a Stuff with the provided id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Stuff to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stuff deleted succesfully
 *       '404':
 *         description: Stuff not found
 *       '500':
 *         description: Internal server error
 */
stuff.delete("/deleteStuff/:id", deleteStuff);


/**
 * @swagger
 * /stuff/updateStuff/{id}:
 *   put:
 *     summary: Stuff yangilash
 *     tags: [Stuff]
 *     description: Stuff ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Stuff topish uchun ID
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
 *               firstname:
 *                 type: string
 *                 description: "Farrukh"
 *               lastname:
 *                 type: string
 *                 description: "Xamdamov"
 *               phone_number:
 *                 type: string
 *                 description: "+998901234567"
 *               login:
 *                 type: string
 *                 description: "kHamdamovF17"
 *               parol:
 *                 type: string
 *                 description: "Password123!"
 *               is_active:
 *                 type: boolean
 *                 description: "true"
 *     responses:
 *       '200':
 *         description: Stuff muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '404':
 *         description: Stuff topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stuff.put("/updateStuff/:id", validateSchema(updateStuff2ValidationSchema),updateStuff);

module.exports = { stuff };
