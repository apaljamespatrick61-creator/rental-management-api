-- Ensure UUID generation is available for the tenants table.
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Add database-side defaults so raw SQL inserts do not need to provide id or updated_at.
ALTER TABLE "public"."tenants"
  ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
  ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;