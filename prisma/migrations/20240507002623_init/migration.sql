-- CreateTable
CREATE TABLE "Guess" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guess" TEXT NOT NULL,
    "count" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Guess_guess_key" ON "Guess"("guess");
