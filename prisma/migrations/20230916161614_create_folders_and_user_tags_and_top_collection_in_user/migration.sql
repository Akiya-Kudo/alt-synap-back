-- -- AlterTable
-- ALTER TABLE "users" ADD COLUMN     "top_collection" INTEGER;

-- CreateTable
CREATE TABLE "folder_posts" (
    "fid" INTEGER NOT NULL,
    "uuid_pid" UUID NOT NULL,
    "timestamp" TIMESTAMPTZ(6),

    CONSTRAINT "folder_posts_pkey_conbined" PRIMARY KEY ("fid","uuid_pid")
);

-- CreateTable
CREATE TABLE "folders" (
    "fid" SERIAL NOT NULL,
    "uuid_uid" UUID NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "top_image" VARCHAR,
    "timestamp" TIMESTAMPTZ(6),

    CONSTRAINT "folders_pkey" PRIMARY KEY ("fid")
);

-- CreateTable
CREATE TABLE "user_tags" (
    "uuid_uid" UUID NOT NULL,
    "tid" INTEGER NOT NULL,
    "timestamp" TIMESTAMPTZ(6),

    CONSTRAINT "pkey_user_tags_conbined" PRIMARY KEY ("uuid_uid","tid")
);

-- AddForeignKey
ALTER TABLE "folder_posts" ADD CONSTRAINT "fid_foreign_key" FOREIGN KEY ("fid") REFERENCES "folders"("fid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "folder_posts" ADD CONSTRAINT "uuid_pid_foreign_key" FOREIGN KEY ("uuid_pid") REFERENCES "posts"("uuid_pid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "uuid_uid_foreign_folders_from_users" FOREIGN KEY ("uuid_uid") REFERENCES "users"("uuid_uid") ON DELETE NO ACTION ON UPDATE NO ACTION;
