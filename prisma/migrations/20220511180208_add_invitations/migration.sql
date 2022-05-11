-- CreateTable
CREATE TABLE "Invitation" (
    "id" SERIAL NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "email" TEXT NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_email_key" ON "Invitation"("email");
