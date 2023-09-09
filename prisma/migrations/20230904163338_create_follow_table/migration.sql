-- CreateTable
CREATE TABLE "follows" (
    "follower_uuid" UUID NOT NULL,
    "followee_uuid" UUID NOT NULL,

    CONSTRAINT "follows_composite_primary" PRIMARY KEY ("follower_uuid","followee_uuid")
);

CREATE INDEX "idx_follower_uuid" ON "follows"("follower_uuid");
CREATE INDEX "idx_followee_uuid" ON "follows"("followee_uuid");

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "users_follower_foreign" 
FOREIGN KEY ("follower_uuid") REFERENCES "users"("uuid_uid") ON DELETE NO ACTION ON UPDATE NO ACTION;
-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "users_followee_foreign" 
FOREIGN KEY ("followee_uuid") REFERENCES "users"("uuid_uid") ON DELETE NO ACTION ON UPDATE NO ACTION;
