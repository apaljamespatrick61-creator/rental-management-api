const express = require('express');
const roomController = require('./room.controller');
const roomValidator = require('./room.validators');
const { requireAuth } = require('../../middlewares/auth.middleware');

const router = express.Router();
router.use(requireAuth);

/**
 * @openapi
 * /api/rooms/create:
 *   post:
 *     summary: Create a room
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - room_number
 *               - capacity
 *               - rent_price
 *               - status
 *               - photo_url
 *             properties:
 *               room_number:
 *                 type: string
 *                 example: B-201
 *               capacity:
 *                 type: integer
 *                 example: 2
 *               rent_price:
 *                 type: number
 *                 example: 12000
 *               status:
 *                 type: string
 *                 example: available
 *               photo_url:
 *                 type: string
 *                 example: https://example.com/room.jpg
 *     responses:
 *       201:
 *         description: Room created
 */
router.post('/create', roomValidator.validateRoom, roomController.createRoom);

/**
 * @openapi
 * /api/rooms/all:
 *   get:
 *     summary: Get all rooms
 *     tags:
 *       - Rooms
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
 *         description: Number of rooms per page
 *     responses:
 *       200:
 *         description: List of rooms
 */
router.get('/all', roomController.getAllRooms);

/**
 * @openapi
 * /api/rooms/{id}:
 *   get:
 *     summary: Get room by ID
 *     tags:
 *       - Rooms
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
 *         description: Room found
 *       404:
 *         description: Room not found
 */
router.get('/:id', roomController.getRoomById);

/**
 * @openapi
 * /api/rooms/update/{id}:
 *   put:
 *     summary: Update a room
 *     tags:
 *       - Rooms
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
 *               - room_number
 *               - capacity
 *               - rent_price
 *               - status
 *               - photo_url
 *             properties:
 *               room_number:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               rent_price:
 *                 type: number
 *               status:
 *                 type: string
 *               photo_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Room updated
 */
router.put('/update/:id', roomValidator.validateRoom, roomController.updateRoom);
module.exports = router;