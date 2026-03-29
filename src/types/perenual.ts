export interface PerenualSearchItem {
  id: number;
  common_name: string | null;
  scientific_name: string[];
  cycle: string | null;
  watering: string | null;
  sunlight: string[];
  default_image: {
    original_url: string;
    regular_url: string;
    medium_url: string;
    small_url: string;
    thumbnail: string;
  } | null;
}

export interface PerenualSearchResponse {
  data: PerenualSearchItem[];
  to: number;
  per_page: number;
  current_page: number;
  from: number;
  last_page: number;
  total: number;
}

export interface PerenualDimension {
  type: string | null;
  min_value: number;
  max_value: number;
  unit: string;
}

export interface PerenualSpeciesDetail {
  id: number;
  common_name: string | null;
  scientific_name: string[];
  type: string | null;
  cycle: string | null;
  watering: string | null;
  sunlight: string[];
  maintenance: string | null;
  growth_rate: string | null;
  harvest_season: string | null;
  description: string | null;
  default_image: PerenualSearchItem["default_image"];
  dimensions: {
    type: string | null;
    min_value: number;
    max_value: number;
    unit: string;
  } | null;
  hardiness: {
    min: string;
    max: string;
  } | null;
  family: string | null;
}
