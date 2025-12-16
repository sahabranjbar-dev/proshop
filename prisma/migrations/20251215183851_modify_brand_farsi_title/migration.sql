/*
  Warnings:

  - You are about to drop the column `name` on the `brands` table. All the data in the column will be lost.
  - Added the required column `englishTitle` to the `brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farsiTitle` to the `brands` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "brands" DROP COLUMN "name",
ADD COLUMN     "englishTitle" TEXT NOT NULL,
ADD COLUMN     "farsiTitle" TEXT NOT NULL;
