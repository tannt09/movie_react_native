export interface VideoModel {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: 'YouTube';
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface VideosResponseModel {
  id: number;
  results: VideoModel[];
}
