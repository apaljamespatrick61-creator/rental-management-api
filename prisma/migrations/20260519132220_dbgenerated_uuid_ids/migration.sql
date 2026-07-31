-- AlterTable
ALTER TABLE "public"."tenants" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "public"."transactions" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
