export interface TrefleSearchResult {
  id: number;
  common_name: string | null;
  scientific_name: string;
  image_url: string | null;
  family: string | null;
  genus: string | null;
}

export interface TrefleGrowth {
  description: string | null;
  days_to_harvest: number | null;
  light: number | null;
  atmospheric_humidity: number | null;
  row_spacing: { cm: number | null } | null;
  spread: { cm: number | null } | null;
  sowing: string | null;
}

export interface TrefleSpecifications {
  growth_form: string | null;
  growth_habit: string | null;
  average_height: { cm: number | null } | null;
}

export interface TrefleSpecies {
  id: number;
  common_name: string | null;
  scientific_name: string;
  image_url: string | null;
  family: { name: string } | null;
  vegetable: boolean;
  edible: boolean;
  edible_part: string[] | null;
  growth: TrefleGrowth | null;
  specifications: TrefleSpecifications | null;
}

// The /plants/{id} endpoint wraps species data under main_species
export interface TreflePlantDetail {
  id: number;
  common_name: string | null;
  scientific_name: string;
  image_url: string | null;
  vegetable: boolean;
  main_species: TrefleSpecies | null;
}

