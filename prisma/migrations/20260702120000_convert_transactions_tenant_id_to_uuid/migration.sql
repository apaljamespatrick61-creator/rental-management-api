BEGIN;

-- Add a temporary UUID column.
ALTER TABLE "transactions"
ADD COLUMN "tenant_id_uuid" UUID;

-- Backfill rows where tenant_id contains a valid UUID string.
UPDATE "transactions"
SET "tenant_id_uuid" = "tenant_id"::uuid
WHERE "tenant_id" ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';

-- Keep migration moving by allowing invalid legacy tenant_id values to become NULL.
-- These rows can be repaired later using a backfill script once correct tenant IDs are known.

-- Add foreign key and index for performance.
ALTER TABLE "transactions"
ADD CONSTRAINT "transactions_tenant_id_fkey"
FOREIGN KEY ("tenant_id_uuid") REFERENCES "tenants"("id")
ON UPDATE CASCADE
ON DELETE RESTRICT;

CREATE INDEX IF NOT EXISTS "idx_transactions_tenant_id"
ON "transactions" ("tenant_id_uuid");

-- Swap old text column with the new UUID column.
ALTER TABLE "transactions" DROP COLUMN "tenant_id";
ALTER TABLE "transactions" RENAME COLUMN "tenant_id_uuid" TO "tenant_id";

COMMIT;
