/*
  Warnings:

  - You are about to drop the column `keyWord` on the `keyWord` table. All the data in the column will be lost.
  - Added the required column `customTopic` to the `keyWord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectedAge` to the `keyWord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectedCategory` to the `keyWord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectedSex` to the `keyWord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectedTopic` to the `keyWord` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_keyWord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "selectedCategory" TEXT NOT NULL,
    "customTopic" TEXT NOT NULL,
    "selectedTopic" TEXT NOT NULL,
    "selectedAge" TEXT NOT NULL,
    "selectedSex" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_keyWord" ("createdAt", "id") SELECT "createdAt", "id" FROM "keyWord";
DROP TABLE "keyWord";
ALTER TABLE "new_keyWord" RENAME TO "keyWord";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
