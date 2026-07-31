//talks to database

const pool = require('../../config/database');
const findUserByEmail = async (email) => {
    const query = 'SELECT id, "full_name", email, password, "refresh_token" FROM users WHERE email = $1 LIMIT 1';

    const result = await pool.query(query, [email]);
    return result.rows[0];

}

module.exports = {
    findUserByEmail
}