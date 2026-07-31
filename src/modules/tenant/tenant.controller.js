const tenantService = require("./tenant.service");

const createTenantController = async (req, res) => {
  try {
    const tenant = await tenantService.createTenant(req.body);
    res.status(201).json({ message: "Tenant created successfully", tenant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTenantController = async (req, res) => {
  const tenantId = req.params.id;
  try {
    const tenant = await tenantService.updateTenant(tenantId, req.body);
    res.status(200).json({ message: "Tenant updated successfully", tenant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTenantsController = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await tenantService.getAllTenants({ page, limit });
    res
      .status(200)
      .json({ message: "Tenants retrieved successfully", ...result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTenantByIdController = async (req, res) => {
  const tenantId = req.params.id;
  try {
    const tenant = await tenantService.getTenantById(tenantId);
    res.status(200).json({ message: "Tenant retrieved successfully", tenant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTenantsController = async (req, res) => {
  try {
    const tenants = await tenantService.getTenants();
    res
      .status(200)
      .json({ message: "Tenants retrieved successfully", tenants });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTenantController,
  updateTenantController,
  getAllTenantsController,
  getTenantByIdController,
  getTenantsController,
};
