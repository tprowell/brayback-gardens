-- Indexes for foreign keys and common query patterns

-- Gardens
CREATE INDEX gardens_created_by_idx ON gardens(created_by);

-- Garden features
CREATE INDEX garden_features_garden_id_idx ON garden_features(garden_id);

-- Plants
CREATE INDEX plants_category_idx ON plants(category);
CREATE INDEX plants_name_idx ON plants(name);
CREATE INDEX plants_is_default_idx ON plants(is_default);

-- Plantings
CREATE INDEX plantings_plant_id_idx ON plantings(plant_id);
CREATE INDEX plantings_garden_id_idx ON plantings(garden_id);
CREATE INDEX plantings_feature_id_idx ON plantings(feature_id);
CREATE INDEX plantings_status_idx ON plantings(status);
CREATE INDEX plantings_created_by_idx ON plantings(created_by);
CREATE INDEX plantings_planted_at_idx ON plantings(planted_at);
CREATE INDEX plantings_expected_harvest_at_idx ON plantings(expected_harvest_at);

-- Harvests
CREATE INDEX harvests_planting_id_idx ON harvests(planting_id);
CREATE INDEX harvests_harvested_at_idx ON harvests(harvested_at);
CREATE INDEX harvests_created_by_idx ON harvests(created_by);

-- Tasks
CREATE INDEX tasks_status_idx ON tasks(status);
CREATE INDEX tasks_due_date_idx ON tasks(due_date);
CREATE INDEX tasks_assigned_to_idx ON tasks(assigned_to);
CREATE INDEX tasks_planting_id_idx ON tasks(planting_id);
CREATE INDEX tasks_garden_id_idx ON tasks(garden_id);
CREATE INDEX tasks_created_by_idx ON tasks(created_by);

-- Notes
CREATE INDEX notes_garden_id_idx ON notes(garden_id);
CREATE INDEX notes_feature_id_idx ON notes(feature_id);
CREATE INDEX notes_plant_id_idx ON notes(plant_id);
CREATE INDEX notes_planting_id_idx ON notes(planting_id);
CREATE INDEX notes_created_by_idx ON notes(created_by);
CREATE INDEX notes_created_at_idx ON notes(created_at DESC);
