-- Ensure UUID generation is available.
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Let PostgreSQL generate transaction ids automatically.
ALTER TABLE "public"."transactions"
  ALTER COLUMN "id" SET DEFAULT gen_random_uuid();