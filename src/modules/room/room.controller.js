const roomService = require("./room.service");

const createRoom = async (req, res) => {
  try {
    const room = await roomService.createRoom(req.body);
    res.status(201).json({ message: "Room created successfully", room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await roomService.getAllRooms({ page, limit });
    res.status(200).json({ message: "Rooms retrieved successfully", ...result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRoomById = async (req, res) => {
  const roomId = req.params.id;
  try {
    const room = await roomService.getRoomById(roomId);
    res.status(200).json({ message: "Room retrieved successfully", room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRoom = async (req, res) => {
  const roomId = req.params.id;
  try {
    const room = await roomService.updateRoom(roomId, req.body);
    res.status(200).json({ message: "Room updated successfully", room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom
};
