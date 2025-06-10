// IMPORT
import {MovieListResponseModel} from '@/models/homeModels';
import { defaultApi } from '@/services/axiosService';
import {handleResponse} from '@/utils/handleResponse';

export const getMovieDetailApi = async ({id}: {id: number}) => {
  try {
    const response = await defaultApi.get(`/movie/${id}`, {
      params: {
        language: 'en-US',
      },
    });

    handleResponse(response.status);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMoviesApi = async ({
  page,
  endpoint,
}: {
  page: number;
  endpoint: string;
}): Promise<MovieListResponseModel> => {
  try {
    const response = await defaultApi.get(`/movie/${endpoint}`, {
      params: {
        language: 'en-US',
        page: page,
      },
    });

    handleResponse(response.status);

    return response.data;
  } catch (error) {
    throw error;
  }
};
