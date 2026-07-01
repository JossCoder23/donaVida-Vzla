/*
  Warnings:

  - You are about to drop the column `contact_info` on the `DonationCenter` table. All the data in the column will be lost.
  - You are about to alter the column `lat` on the `DonationCenter` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `lng` on the `DonationCenter` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - Added the required column `city` to the `DonationCenter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `DonationCenter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DonationCenter" DROP COLUMN "contact_info",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "hours" TEXT,
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "source" TEXT,
ADD COLUMN     "state" TEXT NOT NULL,
ALTER COLUMN "lat" DROP NOT NULL,
ALTER COLUMN "lat" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "lng" DROP NOT NULL,
ALTER COLUMN "lng" SET DATA TYPE DOUBLE PRECISION;
