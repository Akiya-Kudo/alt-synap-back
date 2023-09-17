-- AlterTable
-- CREATE SEQUENCE folders_fid_seq;
-- ALTER TABLE "folders" ALTER COLUMN "fid" SET DEFAULT nextval('folders_fid_seq');
-- ALTER SEQUENCE folders_fid_seq OWNED BY "folders"."fid";

CREATE OR REPLACE FUNCTION update_timestamp()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.timestamp := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER folders_set_timestamp
BEFORE INSERT OR UPDATE ON folders
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER folder_posts_set_timestamp
BEFORE INSERT ON folder_posts
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER user_tags_set_timestamp
BEFORE INSERT ON user_tags
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
