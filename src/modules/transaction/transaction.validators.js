const validateTransaction = (req,res,next) => {


    const requiredFields = [
        ["tenant_id", "Tenant Name is required"],
        ["unit", "Unit room is required"],
        ["amount", "Amount is required"],
        ["status", "Status is required"],
    ];

    for (const [field, message] of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ error: message });
        }
    }

    next();
}

module.exports = {
    validateTransaction,
}