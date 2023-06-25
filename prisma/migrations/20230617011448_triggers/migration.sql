CREATE OR REPLACE FUNCTION update_timestamp()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.timestamp := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_set_timestamp
BEFORE INSERT OR UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER likes_set_timestamp
BEFORE INSERT OR UPDATE ON likes
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER post_tags_set_timestamp
BEFORE INSERT OR UPDATE ON post_tags
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
