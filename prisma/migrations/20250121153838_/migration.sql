-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_keyWord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "keyWord" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_keyWord" ("createdAt", "id", "keyWord") SELECT "createdAt", "id", "keyWord" FROM "keyWord";
DROP TABLE "keyWord";
ALTER TABLE "new_keyWord" RENAME TO "keyWord";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
