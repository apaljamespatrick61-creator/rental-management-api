const pool = require("../../config/database");

const insertTransaction = async (transactionData) => {
  const { tenant_id, unit, amount, status } = transactionData;
  const query =
    "INSERT INTO transactions (tenant_id, unit, amount, status) VALUES ($1, $2, $3, $4) RETURNING *";
  const result = await pool.query(query, [tenant_id, unit, amount, status]);
  return result.rows[0];
};

const getAllTransactions = async () => {
  const query = "SELECT * FROM transactions";
  const result = await pool.query(query);
  return result.rows;
};

const getTransactionsPaginated = async ({ limit, offset }) => {
  const dataQuery = `
        SELECT
            transactions.*,
            tenants.name AS tenant_name
        FROM transactions
    LEFT JOIN tenants ON tenants.id = transactions.tenant_id
        ORDER BY transactions.id DESC
        LIMIT $1 OFFSET $2
    `;
  const countQuery = "SELECT COUNT(*)::int AS total FROM transactions";

  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, [limit, offset]),
    pool.query(countQuery),
  ]);

  return {
    transactions: dataResult.rows,
    total: countResult.rows[0].total,
  };
};

const getTransactionsByTenantId = async (id) => {
  const query = `
        SELECT
            transactions.*,
            tenants.name AS tenant_name
        FROM transactions
    LEFT JOIN tenants ON tenants.id = transactions.tenant_id
    WHERE transactions.id = $1::uuid
        ORDER BY transactions.id DESC
    `;
  const result = await pool.query(query, [id]);
  return result.rows;
};

const updateTransaction = async (transactionId, transactionData) => {
  const { tenant_id, unit, amount, status } = transactionData;
  const query =
    "UPDATE transactions SET tenant_id = $1, unit = $2, amount = $3, status = $4 WHERE id = $5::uuid RETURNING *";
  const result = await pool.query(query, [
    tenant_id,
    unit,
    amount,
    status,
    transactionId,
  ]);
  return result.rows[0];
};

module.exports = {
  insertTransaction,
  getAllTransactions,
  getTransactionsPaginated,
  getTransactionsByTenantId,
  updateTransaction,
};
