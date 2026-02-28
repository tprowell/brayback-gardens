-- Gardens and garden features

CREATE TABLE gardens (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  description text,
  width_ft    numeric,
  length_ft   numeric,
  created_by  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER gardens_updated_at
  BEFORE UPDATE ON gardens
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE garden_features (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  garden_id   uuid NOT NULL REFERENCES gardens(id) ON DELETE CASCADE,
  name        text NOT NULL,
  feature_type feature_type NOT NULL DEFAULT 'bed',
  x           numeric NOT NULL DEFAULT 0,
  y           numeric NOT NULL DEFAULT 0,
  width       numeric NOT NULL DEFAULT 4,
  height      numeric NOT NULL DEFAULT 4,
  notes       text,
  created_at  timestamptz NOT NULL DEFAULT now()
);
