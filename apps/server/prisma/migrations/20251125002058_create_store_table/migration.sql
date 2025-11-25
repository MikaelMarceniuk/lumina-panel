-- CreateTable
CREATE TABLE "stores" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manager" TEXT,
    "phone" TEXT,
    "contact_email" TEXT,
    "address" TEXT,
    "address_complement" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stores_contact_email_key" ON "stores"("contact_email");
