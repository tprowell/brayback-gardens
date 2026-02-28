-- Garden notes with full-text search

CREATE TABLE notes (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  body        text NOT NULL,
  garden_id   uuid REFERENCES gardens(id) ON DELETE SET NULL,
  feature_id  uuid REFERENCES garden_features(id) ON DELETE SET NULL,
  plant_id    uuid REFERENCES plants(id) ON DELETE SET NULL,
  planting_id uuid REFERENCES plantings(id) ON DELETE SET NULL,
  image_url   text,
  created_by  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  -- Full-text search
  fts         tsvector GENERATED ALWAYS AS (to_tsvector('english', body)) STORED
);

CREATE TRIGGER notes_updated_at
  BEFORE UPDATE ON notes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX notes_fts_idx ON notes USING gin(fts);
