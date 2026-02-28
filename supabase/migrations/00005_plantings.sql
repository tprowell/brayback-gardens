-- Planting log

CREATE TABLE plantings (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id            uuid NOT NULL REFERENCES plants(id) ON DELETE CASCADE,
  garden_id           uuid REFERENCES gardens(id) ON DELETE SET NULL,
  feature_id          uuid REFERENCES garden_features(id) ON DELETE SET NULL,
  status              planting_status NOT NULL DEFAULT 'planned',
  quantity            integer,
  planted_at          date,
  started_indoors_at  date,
  transplanted_at     date,
  expected_harvest_at date,
  first_harvest_at    date,
  finished_at         date,
  notes               text,
  created_by          uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER plantings_updated_at
  BEFORE UPDATE ON plantings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-calculate expected harvest date from planted_at + days_to_maturity
CREATE OR REPLACE FUNCTION public.calculate_harvest_date()
RETURNS trigger AS $$
DECLARE
  maturity_days integer;
BEGIN
  -- Only calculate if we have a planted date and no manual override
  IF NEW.planted_at IS NOT NULL THEN
    SELECT days_to_maturity_min INTO maturity_days
    FROM plants WHERE id = NEW.plant_id;

    IF maturity_days IS NOT NULL THEN
      NEW.expected_harvest_at = NEW.planted_at + (maturity_days || ' days')::interval;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER plantings_calc_harvest
  BEFORE INSERT OR UPDATE OF planted_at ON plantings
  FOR EACH ROW EXECUTE FUNCTION public.calculate_harvest_date();
