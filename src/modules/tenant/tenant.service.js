const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { insertTenant, updateTenant: updateTenantRepository, getTenantsPaginated, getTenantById: getTenantByIdRepository, getTenants:getTenantsRepository } = require('./tenant.repository');

const generateTemporaryPassword = () => crypto.randomBytes(8).toString('hex');

const createTenant = async (tenantData) => {
    if (!tenantData.email) {
        const validationError = new Error('Email is required');
        validationError.statusCode = 400;
        throw validationError;
    }

    const temporaryPassword = generateTemporaryPassword();
    const passwordHash = await bcrypt.hash(temporaryPassword, 10);

    try {
        const tenant = await insertTenant({
            ...tenantData,
            passwordHash,
        });

        return {
            ...tenant,
            temporary_password: temporaryPassword,
        };
    } catch (error) {
        if (error.code === '23505') {
            const duplicateError = new Error('Email is already in use');
            duplicateError.statusCode = 409;
            throw duplicateError;
        }

        throw error;
    }
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