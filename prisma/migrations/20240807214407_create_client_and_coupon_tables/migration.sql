-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "redeemed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coupons_code_key" ON "coupons"("code");

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
