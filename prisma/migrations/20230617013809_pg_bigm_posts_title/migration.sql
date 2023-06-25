CREATE EXTENSION pg_bigm;
CREATE INDEX pg_idx ON posts USING gin(title_lower gin_bigm_ops);