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
