-- AddForeignKey
ALTER TABLE "user_tags" ADD CONSTRAINT "tid_foreign_key" FOREIGN KEY ("tid") REFERENCES "tags"("tid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_tags" ADD CONSTRAINT "uuid_uid_foreign_key" FOREIGN KEY ("uuid_uid") REFERENCES "users"("uuid_uid") ON DELETE NO ACTION ON UPDATE NO ACTION;
