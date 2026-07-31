-- CreateTable
CREATE TABLE "public"."rooms" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "room_number" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "rent_price" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);
