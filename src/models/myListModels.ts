import {MovieDetailModel} from './homeModels';

export interface MyListResponseModel {
  created_by: string;
  description: string;
  favorite_count: number;
  id: number;
  iso_639_1: string;
  item_count: number;
  items: MovieDetailModel[];
  name: string;
  page: number;
  poster_path: string | null;
  total_pages: number;
  total_results: number;
}

export interface AddItemMoviesModel {
  media_type: string;
  media_id: number;
}

export interface AddMovieResultModel {
  media_id: number;
  media_type: string;
  error?: string[];
  success: boolean;
}

export interface AddMoviesResponseModel {
  success: boolean;
  status_code: number;
  status_message: string;
  results: AddMovieResultModel[];
}
