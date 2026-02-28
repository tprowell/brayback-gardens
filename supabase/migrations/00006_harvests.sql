-- Harvest tracker

CREATE TABLE harvests (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  planting_id uuid NOT NULL REFERENCES plantings(id) ON DELETE CASCADE,
  harvested_at date NOT NULL DEFAULT CURRENT_DATE,
  quantity    text,
  weight_oz   numeric,
  notes       text,
  created_by  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Update planting's first_harvest_at when first harvest is logged
CREATE OR REPLACE FUNCTION public.update_first_harvest()
RETURNS trigger AS $$
BEGIN
  UPDATE plantings
  SET first_harvest_at = NEW.harvested_at
  WHERE id = NEW.planting_id
    AND first_harvest_at IS NULL;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER harvests_update_planting
  AFTER INSERT ON harvests
  FOR EACH ROW EXECUTE FUNCTION public.update_first_harvest();
