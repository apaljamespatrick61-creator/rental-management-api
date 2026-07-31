const roomRepository = require('./room.repository');

const createRoom = async (roomData) => {
    const room = await roomRepository.insertRoom(roomData);
    return room;
}

const getAllRooms = async ({ page = 1, limit = 10 } = {}) => {
    const safePage = Math.max(Number.parseInt(page, 10) || 1, 1);
    const safeLimit = Math.max(Number.parseInt(limit, 10) || 10, 1);
    const offset = (safePage - 1) * safeLimit;

    const { rooms, total } = await roomRepository.getRoomsPaginated({
        limit: safeLimit,
        offset,
    });

    return {
        rooms,
        pagination: {
            page: safePage,
            limit: safeLimit,
            total,
            totalPages: Math.ceil(total / safeLimit),
        },
    };
}

const getRoomById = async (roomId) => {
    const room = await roomRepository.getRoomById(roomId);
    return room;
}

const updateRoom = async (roomId, roomData) => {
    const room = await roomRepository.updateRoom(roomId, roomData);
    return room;
}

module.exports = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom
}