const { Router } = require("express");
const lid = Router();

const {
  addLid,
  getLids,
  getLidById,
  updateLid,
  deleteLid,
} = require("../controllers/lid.controller");

const {
createLidValidationSchema,
updateLidValidationSchema,
} = require("../validation/lidValidation");
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
 * /lid/addLid:
 *  post:
 *    summary: Yangi lid qoshish
 *    tags:
 *      - Lids
 *    description: Yangi Lids yaratildi
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - first_name
 *              - last_name
 *            properties:
 *               first_name:
 *                type: string
 *                description: Ali
 *               last_name:
 *                 type: string
 *                 description: Gani
 *               phone_number:
 *                 type: string
 *                 description: "676766767"
 *               lid_stage_id:
 *                 type: number
 *                 description: 67
 *               test_date:
 *                 type: string
 *                 description: "10 octomber"
 *               trial_lesson_date:
 *                 type: string
 *                 description: 11-10-26
 *               trial_lesson_time:
 *                 type: string
 *                 description: eleven pm
 *               trial_lesson_group_id:
 *                 type: number
 *                 description: 67
 *               lid_status_id:
 *                 type: number
 *                 description: 67
 *               cancel_reason_id:
 *                 type: number
 *                 description: 67
 *    responses:
 *      '201':
 *        description: car muvaffaqiyatli yaratildi.
 *      '500':
 *        description: ichki server xatosi
 */
lid.post("/addLid", validateSchema(createLidValidationSchema) ,addLid);

/**
 * @swagger
 * /lid/getLids:
 *   get:
 *     summary: Barcha lidlar o;osj
 *     tags: [Lids]
 *     description: Barcha lidlar ro'yxati olish
 *     responses:
 *       '200':
 *         description: lids ro'yxatio muvaffaqiyotli qaytarildi
 *       '500':
 *         description: Interval server error
 */
lid.get("/getLids", getLids);

/**
 * @swagger
 * /lid/getLidById/{id}:
 *   get:
 *    summary: Lid id boyicha olish
 *    tags: [Lids]
 *    description: Id bilan Lid olish
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Lid olish uchun Id
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: lid muvaffaqiyotli qaytarildi
 *      '404':
 *        description: lid topilmadi
 *      '500':
 *        description: Interval server error
 */
lid.get("/getLidById/:id", getLidById);

/**
 * @swagger
 * /lid/updateLid/{id}:
 *  put:
 *    summary: lid yangilash
 *    tags: [Lids]
 *    description: lid ma'lumotlarini yangilash
 *    parameters:
 *      - in: path
 *        name: id
 *        description: lid topish uchun id
 *    required: true
 *    schema:
 *      type: string
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                phone_number:
 *                  type: string
 *                  description: No
 *                test_date:
 *                  type: string
 *                  description: "12"
 *                trial_lesson_date:
 *                  type: string
 *                  description: dafa
 *                trial_lesson_time:
 *                  type: string
 *                  description: "12"
 *    responses:
 *      '200':
 *        description: lid muvaffaqiyotli yaratildi
 *      '400':
 *        description: Yomon so'rov validatsiya xatosi
 *      '404':
 *        description: lid not Found
 *      '500':
 *        description: Server Interval error
 */
lid.put("/updateLid/:id", validateSchema(updateLidValidationSchema), updateLid);

/**
 * @swagger
 * /lid/deleteLid/{id}:
 *   delete:
 *     summary: Delete Lid with provided id
 *     tags: [Lids]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of the Lid to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lid delete succesfully
 *       '404':
 *         description: Lid not Found
 *       '500':
 *         descriptio: Interval server error
 */
lid.delete("/deleteLid/:id", deleteLid);

module.exports = { lid };
