-- CreateEnum
CREATE TYPE "DraftStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "DraftSaveType" AS ENUM ('AUTO', 'MANUAL');

-- CreateTable
CREATE TABLE "ProductDraft" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "step" INTEGER NOT NULL DEFAULT 1,
    "data" JSONB NOT NULL,
    "status" "DraftStatus" NOT NULL DEFAULT 'DRAFT',
    "saveType" "DraftSaveType" NOT NULL DEFAULT 'AUTO',
    "version" INTEGER NOT NULL DEFAULT 1,
    "productId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductDraft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductDraft_userId_idx" ON "ProductDraft"("userId");

-- CreateIndex
CREATE INDEX "ProductDraft_status_idx" ON "ProductDraft"("status");

-- CreateIndex
CREATE INDEX "ProductDraft_updatedAt_idx" ON "ProductDraft"("updatedAt");

-- AddForeignKey
ALTER TABLE "ProductDraft" ADD CONSTRAINT "ProductDraft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDraft" ADD CONSTRAINT "ProductDraft_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
