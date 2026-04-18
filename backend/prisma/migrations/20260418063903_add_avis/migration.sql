-- CreateTable
CREATE TABLE "Avis" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "note" INTEGER NOT NULL,
    "texte" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Avis_pkey" PRIMARY KEY ("id")
);
