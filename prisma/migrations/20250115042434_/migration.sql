-- CreateEnum
CREATE TYPE "QueryStatus" AS ENUM ('OPEN', 'RESOLVED');

-- AlterTable
ALTER TABLE "form_data" ADD CONSTRAINT "form_data_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "query" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "QueryStatus" NOT NULL,
    "formDataId" UUID NOT NULL,

    CONSTRAINT "query_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "query_formDataId_key" ON "query"("formDataId");

-- AddForeignKey
ALTER TABLE "query" ADD CONSTRAINT "query_formDataId_fkey" FOREIGN KEY ("formDataId") REFERENCES "form_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
