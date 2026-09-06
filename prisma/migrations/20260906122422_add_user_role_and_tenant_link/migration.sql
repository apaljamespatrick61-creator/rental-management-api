/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('admin', 'tenant');

-- AlterTable
ALTER TABLE "public"."tenants" ADD COLUMN     "user_id" UUID;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "role" "public"."UserRole" NOT NULL DEFAULT 'tenant';

-- CreateIndex
CREATE UNIQUE INDEX "tenants_user_id_key" ON "public"."tenants"("user_id");

-- AddForeignKey
ALTER TABLE "public"."tenants" ADD CONSTRAINT "tenants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
