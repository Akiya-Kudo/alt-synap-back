/*
  Warnings:

  - Added the required column `uuid_uid` to the `folder_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "folder_posts" ADD COLUMN     "uuid_uid" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "folder_posts" ADD CONSTRAINT "uuid_uid_foreign_key" FOREIGN KEY ("uuid_uid") REFERENCES "users"("uuid_uid") ON DELETE NO ACTION ON UPDATE NO ACTION;
