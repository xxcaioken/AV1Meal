-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respectingRestriction" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);
