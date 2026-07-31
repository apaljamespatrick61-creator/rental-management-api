const pool = require('../../config/database');

const insertRoom = async (roomData) => {
    const { room_number, capacity, rent_price, status, photo_url } = roomData;
    const query = 'INSERT INTO rooms (room_number, capacity, rent_price, status, photo_url) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const result = await pool.query(query, [room_number, capacity, rent_price, status, photo_url]);
    return result.rows[0];
}

const getAllRooms = async () => {
    const query = 'SELECT * FROM rooms';
    const result = await pool.query(query);
    return result.rows;
} 

const getRoomsPaginated = async ({ limit, offset }) => {
    const dataQuery = 'SELECT * FROM rooms ORDER BY id DESC LIMIT $1 OFFSET $2';
    const countQuery = 'SELECT COUNT(*)::int AS total FROM rooms';

    const [dataResult, countResult] = await Promise.all([
        pool.query(dataQuery, [limit, offset]),
        pool.query(countQuery),
    ]);

    return {
        rooms: dataResult.rows,
        total: countResult.rows[0].total,
    };
}

const getRoomById = async (roomId) => {
    const query = 'SELECT * FROM rooms WHERE id = $1';
    const result = await pool.query(query, [roomId]);
    return result.rows[0];
}

const updateRoom = async (roomId, roomData) => {
    const { room_number, capacity, rent_price, status, photo_url } = roomData;
    const query = 'UPDATE rooms SET room_number = $1, capacity = $2, rent_price = $3, status = $4, photo_url = $5 WHERE id = $6 RETURNING *';
    const result = await pool.query(query, [room_number, capacity, rent_price, status, photo_url, roomId]);
    return result.rows[0];
}

module.exports = {
    insertRoom,
    getAllRooms,
    getRoomsPaginated,
    getRoomById,
    updateRoom
}

