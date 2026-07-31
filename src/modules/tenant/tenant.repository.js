const pool = require('../../config/database');

const insertTenant  = async (tenantData) => {
    const { name, unit, phone_number, lease_start_date, monthly_rent } = tenantData;
    const query = 'INSERT INTO tenants (name, unit, phone_number, lease_start_date, monthly_rent) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const result = await pool.query(query, [name, unit, phone_number, lease_start_date, monthly_rent]);
    return result.rows[0];
}

const updateTenant = async (tenantId, tenantData) => {
    const { name, unit, phone_number, lease_start_date, monthly_rent } = tenantData;
    const query = 'UPDATE tenants SET name = $1, unit = $2, phone_number = $3, lease_start_date = $4, monthly_rent = $5 WHERE id = $6 RETURNING *';
    const result = await pool.query(query, [name, unit, phone_number, lease_start_date, monthly_rent, tenantId]);
    return result.rows[0];
}



const getTenantsPaginated = async ({ limit, offset }) => {
    const dataQuery = 'SELECT * FROM tenants ORDER BY id DESC LIMIT $1 OFFSET $2';
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
    const query = 'SELECT * FROM tenants WHERE id = $1';
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