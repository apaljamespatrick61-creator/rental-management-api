const validateTenant = (req, res, next) => {
  const requiredFields = [
    ["name", "Name is required"],
    ["unit", "Unit is required"],
    ["phone_number", "Phone number is required"],
    ["lease_start_date", "Lease start date is required"],
    ["monthly_rent", "Monthly rent is required"],
  ];
  const errors = [];

  requiredFields.forEach(([field, message]) => {
    if (!req.body[field]) {
      errors.push(message);
    }
  });

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
module.exports = {
  validateTenant,
};
