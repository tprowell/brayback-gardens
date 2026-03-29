-- Garden Designer schema extensions

-- Add gate feature type
ALTER TYPE feature_type ADD VALUE IF NOT EXISTS 'gate';

-- Extend gardens table for designer
ALTER TABLE gardens ADD COLUMN IF NOT EXISTS grid_size_ft numeric NOT NULL DEFAULT 2;

-- Extend garden_features for designer
ALTER TABLE garden_features
  ADD COLUMN IF NOT EXISTS rotation numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS points jsonb,
  ADD COLUMN IF NOT EXISTS properties jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS is_fixture boolean NOT NULL DEFAULT false;

-- Plant placement within garden beds (per-square-foot)
CREATE TABLE IF NOT EXISTS garden_plants (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_id  uuid NOT NULL REFERENCES garden_features(id) ON DELETE CASCADE,
  plant_id    uuid NOT NULL REFERENCES plants(id) ON DELETE CASCADE,
  grid_x      integer NOT NULL,
  grid_y      integer NOT NULL,
  quantity    integer NOT NULL DEFAULT 1,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE(feature_id, grid_x, grid_y)
);
