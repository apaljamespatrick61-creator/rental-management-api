-- DropForeignKey
ALTER TABLE "public"."transactions" DROP CONSTRAINT "transactions_tenant_id_fkey";

-- DropIndex
DROP INDEX "public"."idx_transactions_tenant_id";
