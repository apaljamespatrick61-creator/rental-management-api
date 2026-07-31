const express = require('express');
const transactionController = require('./transaction.controller');
const transactionValidator = require('./transaction.validators');
const { requireAuth } = require('../../middlewares/auth.middleware');


const router = express.Router();

router.use(requireAuth);

/**
 * @openapi
 * /api/transactions/create:
 *   post:
 *     summary: Create a transaction
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tenant_id
 *               - unit
 *               - amount
 *               - status
 *             properties:
 *               tenant_id:
 *                 type: string
 *                 example: 123
 *               unit:
 *                 type: string
 *                 example: A-101
 *               amount:
 *                 type: number
 *                 example: 8500
 *               status:
 *                 type: string
 *                 example: paid
 *     responses:
 *       201:
 *         description: Transaction created
 */
router.post('/create', transactionValidator.validateTransaction, transactionController.createTransactionController);

/**
 * @openapi
 * /api/transactions/all:
 *   get:
 *     summary: Get all transactions
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number starting at 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of transactions per page
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get('/all', transactionController.getAllTransactionsController);

/**
 * @openapi
 * /api/transactions/tenant/{tenantId}:
 *   get:
 *     summary: Get transactions by tenant ID
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tenant transactions
 */
router.get('/tenant/:tenantId', transactionController.getTransactionsByTenantIdController);

/**
 * @openapi
 * /api/transactions/{transactionId}:
 *   put:
 *     summary: Update a transaction
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tenant_id
 *               - unit
 *               - amount
 *               - status
 *             properties:
 *               tenant_id:
 *                 type: string
 *               unit:
 *                 type: string
 *               amount:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction updated
 */
router.put('/:transactionId', transactionValidator.validateTransaction, transactionController.updateTransactionController);

module.exports = router;

