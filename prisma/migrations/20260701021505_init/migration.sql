/*
  Warnings:

  - You are about to drop the column `user_id` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `donor_blood_type` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donor_email` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donor_name` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `BloodRequirement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_user_id_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "user_id",
ADD COLUMN     "donor_blood_type" TEXT NOT NULL,
ADD COLUMN     "donor_email" TEXT NOT NULL,
ADD COLUMN     "donor_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BloodRequirement" ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "blood_type" DROP NOT NULL;
