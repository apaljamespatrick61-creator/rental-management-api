const pool = require('../../config/database');

const insertTenant = async (tenantData) => {
    const {
        name,
        unit,
        phone_number,
        lease_start_date,
        monthly_rent,
        email,
        passwordHash,
    } = tenantData;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const insertUserQuery = `
            INSERT INTO users (id, full_name, email, password, role, created_at, updated_at)
            VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW(), NOW())
            RETURNING id
        `;
        const userResult = await client.query(insertUserQuery, [name, email, passwordHash, 'tenant']);
        const userId = userResult.rows[0].id;

        const insertTenantQuery = `
            INSERT INTO tenants (user_id, name, unit, phone_number, lease_start_date, monthly_rent)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const tenantResult = await client.query(insertTenantQuery, [
            userId,
            name,
            unit,
            phone_number,
            lease_start_date,
            monthly_rent,
        ]);

        await client.query('COMMIT');
        return tenantResult.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

const updateTenant = async (tenantId, tenantData) => {
    const { name, unit, phone_number, lease_start_date, monthly_rent } = tenantData;
    const query = `
        UPDATE tenants
        SET name = $1, unit = $2, phone_number = $3, lease_start_date = $4, monthly_rent = $5
        WHERE id = $6
        RETURNING *
    `;
    const result = await pool.query(query, [
        name,
        unit,
        phone_number,
        lease_start_date,
        monthly_rent,
        tenantId,
    ]);
    return result.rows[0];
};



const getTenantsPaginated = async ({ limit, offset }) => {
    const dataQuery = 'SELECT * FROM tenants ORDER BY created_at DESC LIMIT $1 OFFSET $2';
    const countQuery = 'SELECT COUNT(*)::int AS total FROM tenants';

    const [dataResult, countResult] = await Promise.all([
        pool.query(dataQuery, [limit, offset]),
        pool.query(countQuery),
    ]);

    return {
        tenants: dataResult.rows,
        total: countResult.rows[0].total,
    };
}

const getTenantById = async (tenantId) => {
    const query = 'SELECT t.*, u.email AS email FROM tenants t JOIN users u ON t.user_id = u.id WHERE t.id = $1';
    const result = await pool.query(query, [tenantId]);
    return result.rows[0];
}

const getTenants = async () => {
    const query = 'SELECT id, name FROM tenants';
    const result = await pool.query(query);
    return result.rows;
}

module.exports = {
    insertTenant,
    updateTenant,
    getTenantsPaginated,
    getTenantById,
    getTenants
};