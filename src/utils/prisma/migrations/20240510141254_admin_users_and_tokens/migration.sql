/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `admin_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "admin_tokens_user_id_key" ON "admin_tokens"("user_id");
