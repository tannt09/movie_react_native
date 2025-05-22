export interface GenreModel {
  id: number;
  name: string;
}

export interface ProductionCompanyModel {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountryModel {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguageModel {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetailModel {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: any;
  budget: number;
  genres: GenreModel[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompanyModel[];
  production_countries: ProductionCountryModel[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguageModel[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
