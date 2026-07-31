const { insertTenant, updateTenant: updateTenantRepository, getTenantsPaginated, getTenantById: getTenantByIdRepository, getTenants:getTenantsRepository } = require('./tenant.repository');

const createTenant = async (tenantData) => {
    const tenant = await insertTenant(tenantData);
    return tenant;
}

const updateTenant = async (tenantId, tenantData) => {
    const tenant = await updateTenantRepository(tenantId, tenantData);
    return tenant;
}
const getAllTenants = async ({ page = 1, limit = 10 } = {}) => {
    const safePage = Math.max(Number.parseInt(page, 10) || 1, 1);
    const safeLimit = Math.max(Number.parseInt(limit, 10) || 10, 1);
    const offset = (safePage - 1) * safeLimit;

    const { tenants, total } = await getTenantsPaginated({ limit: safeLimit, offset });

    return {
        tenants,
        pagination: {
            page: safePage,
            limit: safeLimit,
            total,
            totalPages: Math.ceil(total / safeLimit),
        },
    };
}

const getTenantById = async (tenantId) => {
    const tenant = await getTenantByIdRepository(tenantId);
    return tenant;
}

const getTenants = async () => {
    const tenants = await getTenantsRepository();
    return tenants;
}

module.exports = {
    createTenant,
    updateTenant,
    getAllTenants,
    getTenantById,
    getTenants
}