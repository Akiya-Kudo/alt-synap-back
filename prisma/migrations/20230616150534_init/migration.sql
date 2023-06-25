-- CreateTable
CREATE TABLE "likes" (
    "uuid_uid" UUID NOT NULL,
    "uuid_pid" UUID NOT NULL,
    "timestamp" TIMESTAMPTZ(6),

    CONSTRAINT "likes_composite_primary" PRIMARY KEY ("uuid_uid","uuid_pid")
);

-- CreateTable
CREATE TABLE "posts" (
    "title" VARCHAR(100) NOT NULL,
    "title_lower" VARCHAR(100) NOT NULL,
    "top_image" VARCHAR,
    "top_link" VARCHAR,
    "content_type" SMALLINT NOT NULL,
    "likes_num" INTEGER NOT NULL DEFAULT 0,
    "timestamp" TIMESTAMPTZ(6),
    "publish" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "uuid_pid" UUID NOT NULL,
    "uuid_uid" UUID NOT NULL,

    CONSTRAINT "posts_primary" PRIMARY KEY ("uuid_pid")
);

-- CreateTable
CREATE TABLE "tags" (
    "tid" SERIAL NOT NULL,
    "tag_name" VARCHAR(30) NOT NULL,
    "tag_content_num" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tid")
);

-- CreateTable
CREATE TABLE "users" (
    "uid" VARCHAR(28) NOT NULL,
    "comment" VARCHAR(255),
    "follower_num" INTEGER NOT NULL DEFAULT 0,
    "followee_num" INTEGER NOT NULL DEFAULT 0,
    "lang_type" SMALLINT NOT NULL DEFAULT 0,
    "uuid_uid" UUID NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "post_tags" (
    "tid" INTEGER NOT NULL,
    "timestamp" TIMESTAMPTZ(6),
    "uuid_pid" UUID NOT NULL,

    CONSTRAINT "post_tags_composite_primary" PRIMARY KEY ("uuid_pid","tid")
);

-- CreateTable
CREATE TABLE "source_contents" (
    "source_link" VARCHAR NOT NULL,
    "source_type" SMALLINT NOT NULL,
    "description" JSONB NOT NULL,
    "uuid_pid" UUID NOT NULL,

    CONSTRAINT "uuid_pid_primary" PRIMARY KEY ("uuid_pid")
);

-- CreateTable
CREATE TABLE "article_contents" (
    "content" JSONB NOT NULL,
    "uuid_pid" UUID NOT NULL,

    CONSTRAINT "article_contents_primary" PRIMARY KEY ("uuid_pid")
);

-- CreateIndex
CREATE UNIQUE INDEX "uuid_pid_unique" ON "posts"("uuid_pid");

-- CreateIndex
CREATE INDEX "fki_user_uuid_to_posts_foreign" ON "posts"("uuid_uid");

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_unique" ON "tags"("tag_name");

-- CreateIndex
CREATE UNIQUE INDEX "uuid_unique" ON "users"("uuid_uid");

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "posts_to_likes_foreign" FOREIGN KEY ("uuid_pid") REFERENCES "posts"("uuid_pid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "users_to_likes_foreign" FOREIGN KEY ("uuid_uid") REFERENCES "users"("uuid_uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "user_uuid_to_posts_foreign" FOREIGN KEY ("uuid_uid") REFERENCES "users"("uuid_uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "posts_to_post_tags_foreign" FOREIGN KEY ("uuid_pid") REFERENCES "posts"("uuid_pid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "tags_to_post_tags_foreign" FOREIGN KEY ("tid") REFERENCES "tags"("tid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "source_contents" ADD CONSTRAINT "post_to_souce_contents_forein" FOREIGN KEY ("uuid_pid") REFERENCES "posts"("uuid_pid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "article_contents" ADD CONSTRAINT "post_to_blog_contents_foreign" FOREIGN KEY ("uuid_pid") REFERENCES "posts"("uuid_pid") ON DELETE NO ACTION ON UPDATE NO ACTION;
