/*
  Warnings:

  - You are about to drop the column `data` on the `keyWord` table. All the data in the column will be lost.
  - Added the required column `keyWord` to the `keyWord` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_keyWord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "keyWord" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_keyWord" ("createdAt", "id") SELECT "createdAt", "id" FROM "keyWord";
DROP TABLE "keyWord";
ALTER TABLE "new_keyWord" RENAME TO "keyWord";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
