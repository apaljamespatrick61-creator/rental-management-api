const transactionService = require("./transaction.service");

const createTransactionController = async (req, res) => {
  try {
    const transaction = await transactionService.createTransaction(req.body);
    res
      .status(201)
      .json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTransactionsController = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await transactionService.getAllTransactions({ page, limit });
    res
      .status(200)
      .json({ message: "Transactions retrieved successfully", ...result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactionsByTenantIdController = async (req, res) => {
  const tenantId = req.params.tenantId;
  try {
    const transactions =
      await transactionService.getTransactionsByTenantId(tenantId);
    res
      .status(200)
      .json({ message: "Transactions retrieved successfully", transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTransactionController = async (req, res) => {
  const transactionId = req.params.transactionId;
  const transactionData = req.body;
  try {
    const transaction = await transactionService.updateTransaction(
      transactionId,
      transactionData,
    );
    res
      .status(200)
      .json({ message: "Transaction updated successfully", transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTransactionController,
  getAllTransactionsController,
  getTransactionsByTenantIdController,
  updateTransactionController,
};
