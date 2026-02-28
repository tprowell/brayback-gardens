-- Enums for Brayback Gardens

CREATE TYPE plant_category AS ENUM ('vegetable', 'fruit', 'berry', 'herb', 'flower');
CREATE TYPE sun_requirement AS ENUM ('full_sun', 'partial_sun', 'partial_shade', 'full_shade');
CREATE TYPE water_need AS ENUM ('low', 'moderate', 'high');
CREATE TYPE planting_method AS ENUM ('direct_sow', 'transplant', 'both');
CREATE TYPE planting_status AS ENUM ('planned', 'started', 'transplanted', 'growing', 'harvesting', 'done');
CREATE TYPE task_status AS ENUM ('todo', 'done');
CREATE TYPE task_source AS ENUM ('auto', 'manual');
CREATE TYPE feature_type AS ENUM ('bed', 'tree', 'greenhouse', 'structure', 'path', 'water', 'seating', 'other');
CREATE TYPE preserve_method AS ENUM ('canning', 'freezing', 'drying', 'fermenting', 'jam', 'other');
