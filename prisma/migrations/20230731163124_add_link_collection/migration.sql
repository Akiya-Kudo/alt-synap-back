-- CreateTable
CREATE TABLE "links" (
    "lid" SERIAL NOT NULL,
    "uuid_uid" UUID NOT NULL,
    "link_name" VARCHAR(50) NOT NULL,
    "image_path" VARCHAR(2048),
    "explanation" VARCHAR(100),
    "url_scheme" VARCHAR(500) NOT NULL,
    "query" VARCHAR(50),
    "joint" VARCHAR(50),
    "other_queries" VARCHAR(500),
    "genre" SMALLINT NOT NULL,
    "is_path_search" BOOLEAN NOT NULL DEFAULT false,
    "publish" BOOLEAN NOT NULL DEFAULT false,
    "timestamp" TIMESTAMPTZ(6),

    CONSTRAINT "links_primary" PRIMARY KEY ("lid")
);

-- CreateTable
CREATE TABLE "collections" (
    "cid" SERIAL NOT NULL,
    "uuid_uid" UUID NOT NULL,
    "collection_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "cid_primary" PRIMARY KEY ("cid")
);

CREATE TABLE "link_collections" (
    "lid" INT NOT NULL,
    "cid" INT NOT NULL,
    "uuid_uid" UUID NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "link_collection_composite_primary" PRIMARY KEY ("lid","cid")
);

-- CreateIndex
CREATE INDEX "fki_user_uuid_to_links_foreign" ON "links"("uuid_uid");

-- CreateIndex
CREATE INDEX "fki_user_uuid_to_collections_foreign" ON "collections"("uuid_uid");

-- CreateIndex
CREATE INDEX "fki_user_uuid_to_link_collections_foreign" ON "posts"("uuid_uid");

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "users_to_likes_foreign" FOREIGN KEY ("uuid_uid") REFERENCES "users"("uuid_uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "users_to_collections_foreign" FOREIGN KEY ("uuid_uid") REFERENCES "users"("uuid_uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "link_collections" ADD CONSTRAINT "links_to_link_collections_foreign" FOREIGN KEY ("lid") REFERENCES "links"("lid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "link_collections" ADD CONSTRAINT "collections_to_link_collections_foreign" FOREIGN KEY ("cid") REFERENCES "collections"("cid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "link_collections" ADD CONSTRAINT "users_to_link_collections_foreign" FOREIGN KEY ("uuid_uid") REFERENCES "users"("uuid_uid") ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE OR REPLACE FUNCTION update_timestamp()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.timestamp := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--AddTrigger
CREATE TRIGGER links_set_timestamp
BEFORE INSERT OR UPDATE ON links
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();