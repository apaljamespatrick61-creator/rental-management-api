const express = require('express');
const tenantController = require('./tenant.controller');
const tenantValidator = require('./tenant.validators');
const { requireAuth } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.use(requireAuth);

/**
 * @openapi
 * /api/tenants/create:
 *   post:
 *     summary: Create a tenant
 *     tags:
 *       - Tenants
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - unit
 *               - phone_number
 *               - lease_start_date
 *               - monthly_rent
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               unit:
 *                 type: string
 *                 example: A-101
 *               phone_number:
 *                 type: string
 *                 example: "+639171234567"
 *               lease_start_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-12"
 *               monthly_rent:
 *                 type: number
 *                 example: 8500
 *     responses:
 *       201:
 *         description: Tenant created
 */
router.post('/create', tenantValidator.validateTenant, tenantController.createTenantController);

/**
 * @openapi
 * /api/tenants/update/{id}:
 *   put:
 *     summary: Update a tenant
 *     tags:
 *       - Tenants
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               - name
 *               - unit
 *               - phone_number
 *               - lease_start_date
 *               - monthly_rent
 *             properties:
 *               name:
 *                 type: string
 *               unit:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               lease_start_date:
 *                 type: string
 *                 format: date
 *               monthly_rent:
 *                 type: number
 *     responses:
 *       200:
 *         description: Tenant updated
 */
router.put('/update/:id', tenantValidator.validateTenant, tenantController.updateTenantController);

/**
 * @openapi
 * /api/tenants/all:
 *   get:
 *     summary: Get all tenants
 *     tags:
 *       - Tenants
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
 *         description: Number of tenants per page
 *     responses:
 *       200:
 *         description: List of tenants
 */
router.get('/all', tenantController.getAllTenantsController);

/**
 * @openapi
 * /api/tenants/{id}:
 *   get:
 *     summary: Get tenant by ID
 *     tags:
 *       - Tenants
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tenant found
 *       404:
 *         description: Tenant not found
 */
router.get('/:id', tenantController.getTenantByIdController);

/**
 * @openapi
 * /api/tenants/:
 *   get:
 *     summary: Get tenants (root route)
 *     tags:
 *       - Tenants
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tenants retrieved successfully
 */
router.get('/', tenantController.getTenantsController);
module.exports = router;