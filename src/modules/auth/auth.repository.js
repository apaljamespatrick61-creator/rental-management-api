//talks to database

const pool = require('../../config/database');
const findUserByEmail = async (email) => {
    const query = 'SELECT id, "full_name", email, password, "refresh_token" FROM users WHERE email = $1 AND role = $2 LIMIT 1';

    const result = await pool.query(query, [email, 'tenant']);
    return result.rows[0];

}

const findAdminByEmail = async (email) => {
    const query = 'SELECT id, "full_name", email, password, "refresh_token" FROM users WHERE email = $1 AND role = $2 LIMIT 1';
    const result = await pool.query(query, [email, 'admin']);
    return result.rows[0];
};

module.exports = {
    findUserByEmail,
    findAdminByEmail
}