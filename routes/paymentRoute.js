const { Router } = require("express");
const {
  addPayment,
  getPayments,
  getPaymentById,
  deletePayment,
  updatePayment,
  searchPayment,
} = require("../controllers/payment.controller");
const payment = Router();

const {
    createPayment15ValidationSchema,
    updatePayment15ValidationSchema,
} = require("../validation/paymentvalidation")

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
 * /payment/addPayment:
 *  post:
 *    summary: Yangi payment qo'shish
 *    tags:
 *      - Payment
 *    description: Yangi payment yaratildi
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - students_id
 *              - payment_last_date
 *              - payment_date
 *              - price
 *              - is_paid
 *              - total_attent
 *            properties:
 *              students_id:
 *                type: string
 *                description: Student ID
 *              payment_last_date:
 *                type: string
 *                description: Payment last date
 *              payment_date:
 *                type: string
 *                description: Payment date
 *              price:
 *                type: number
 *                description: Payment price
 *              is_paid:
 *                type: boolean
 *                description: Payment status
 *              total_attent:
 *                type: number
 *                description: Total attent
 *    responses:
 *      '201':
 *        description: Payment muvaffaqiyatli yaratildi.
 *      '500':
 *        description: Ichki server xatosi
 */
payment.post("/addPayment",validateSchema(createPayment15ValidationSchema) ,addPayment);

/**
 * @swagger
 * /payment/getPayments:
 *   get:
 *     summary: Barcha paymentlarni olish
 *     tags: [Payment]
 *     description: Barcha paymentlar ro'yxatini olish
 *     responses:
 *       '200':
 *         description: Paymentlar ro'yxati muvaffaqiyatli qaytarildi
 *       '500':
 *         description: Ichki server xatosi
 */
payment.get("/getPayments", getPayments);

/**
 * @swagger
 * /payment/getPaymentById/{id}:
 *   get:
 *     summary: Paymentni Id boyicha olish
 *     tags: [Payment]
 *     description: Id bilan olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment olish uchun ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Payment topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
payment.get("/getPaymentById/:id", getPaymentById);

/**
 * @swagger
 * /payment/deletePayment/{id}:
 *   delete:
 *     summary: Paymentni o'chirish
 *     tags: [Payment]
 *     description: Paymentni ID orqali o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Payment ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment deleted successfully
 *       '404':
 *         description: Payment not found
 *       '500':
 *         description: Internal server error
 */
payment.delete("/deletePayment/:id", deletePayment);

/**
 * @swagger
 * /payment/updatePayment/{id}:
 *   put:
 *     summary: Payment yangilash
 *     tags: [Payment]
 *     description: Payment ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Payment topish uchun ID
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
 *               students_id:
 *                 type: string
 *                 description: Student ID
 *               payment_last_date:
 *                 type: string
 *                 description: Payment last date
 *               payment_date:
 *                 type: string
 *                 description: Payment date
 *               price:
 *                 type: number
 *                 description: Payment price
 *               is_paid:
 *                 type: boolean
 *                 description: Payment status
 *               total_attent:
 *                 type: number
 *                 description: Total attent
 *     responses:
 *       '200':
 *         description: Payment muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Payment topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
payment.put("/updatePayment/:id",validateSchema(updatePayment15ValidationSchema) ,updatePayment);

/**
 * @swagger
 * /payment/searchPayment:
 *   get:
 *     summary: payment ni qidirish
 *     tags: [Payment]
 *     description: Qidiruv so'rovi orqali payment izlash
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidiruv so'rovi orqali payment izlash
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *      '404':
 *        description: payment topilmadi
 *      '500':
 *        description: Ichki server xatosi
 */
payment.get("/searchPayment", searchPayment);

module.exports = { payment };
