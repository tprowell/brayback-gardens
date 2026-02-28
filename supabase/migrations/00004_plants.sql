-- Plant library

CREATE TABLE plants (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  text NOT NULL,
  variety               text,
  category              plant_category NOT NULL,
  description           text,
  days_to_maturity_min  integer,
  days_to_maturity_max  integer,
  spacing_inches        integer,
  sun_requirement       sun_requirement NOT NULL DEFAULT 'full_sun',
  water_need            water_need NOT NULL DEFAULT 'moderate',
  planting_method       planting_method NOT NULL DEFAULT 'both',
  -- Planting windows: weeks relative to last frost (negative = before)
  indoor_start_weeks    integer,
  indoor_end_weeks      integer,
  transplant_start_weeks integer,
  transplant_end_weeks  integer,
  direct_sow_start_weeks integer,
  direct_sow_end_weeks  integer,
  companion_plants      text,
  avoid_near            text,
  harvest_instructions  text,
  preserve_methods      preserve_method[],
  preserve_notes        text,
  notes                 text,
  is_default            boolean NOT NULL DEFAULT false,
  created_by            uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER plants_updated_at
  BEFORE UPDATE ON plants
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
