const {
  insertTransaction,
  getTransactionsPaginated,
  getTransactionsByTenantId: getTransactionsByTenantIdRepository,
  updateTransaction: updateTransactionRepository
} = require("./transaction.repository");

const createTransaction = async (transactionData) => {
  const transaction = await insertTransaction(transactionData);
  return transaction;
};

const getAllTransactions = async ({ page = 1, limit = 10 } = {}) => {
  const safePage = Math.max(Number.parseInt(page, 10) || 1, 1);
  const safeLimit = Math.max(Number.parseInt(limit, 10) || 10, 1);
  const offset = (safePage - 1) * safeLimit;

  const { transactions, total } = await getTransactionsPaginated({
    limit: safeLimit,
    offset,
  });

  return {
    transactions,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
};

const getTransactionsByTenantId = async (tenantId) => {
  const transactions = await getTransactionsByTenantIdRepository(tenantId);
  return transactions;
};

const updateTransaction = async (transactionId, transactionData) => {
  const transaction = await updateTransactionRepository(transactionId, transactionData);
  return transaction;
}

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionsByTenantId,
  updateTransaction
};
