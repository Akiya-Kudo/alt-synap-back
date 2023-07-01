CREATE EXTENSION pg_bigm;
CREATE INDEX pg_idx_title_lower ON posts USING gin(title_lower gin_bigm_ops);
CREATE INDEX pg_idx_title_tags_text ON posts USING gin(title_tags_search_text gin_bigm_ops);