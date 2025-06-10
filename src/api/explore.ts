// IMPORT
import {MovieListResponseModel} from '@/models/homeModels';
import { defaultApi } from '@/services/axiosService';
import {handleResponse} from '@/utils/handleResponse';

export const getSearchMoviesApi = async ({
  page,
  searchText,
}: {
  page: number;
  searchText: string;
}): Promise<MovieListResponseModel> => {
  try {
    const response = await defaultApi.get(`/search/movie`, {
      params: {
        language: 'en-US',
        include_adult: false,
        page,
        query: searchText,
      },
    });

    handleResponse(response.status);

    return response.data;
  } catch (error) {
    throw error;
  }
};
