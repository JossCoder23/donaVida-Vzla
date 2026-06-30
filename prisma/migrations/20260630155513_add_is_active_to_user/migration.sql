-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "blood_type" TEXT NOT NULL,
    "phone" TEXT,
    "lat" DECIMAL(65,30),
    "lng" DECIMAL(65,30),
    "last_donation_at" TIMESTAMP(3),
    "role" TEXT NOT NULL,
    "center_id" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationCenter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DECIMAL(65,30) NOT NULL,
    "lng" DECIMAL(65,30) NOT NULL,
    "contact_info" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "capacity_per_day" INTEGER NOT NULL,

    CONSTRAINT "DonationCenter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BloodRequirement" (
    "id" TEXT NOT NULL,
    "center_id" TEXT NOT NULL,
    "blood_type" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BloodRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "center_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "center_id" TEXT NOT NULL,
    "campaign_id" TEXT,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "DonationCenter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodRequirement" ADD CONSTRAINT "BloodRequirement_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "DonationCenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "DonationCenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "DonationCenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
