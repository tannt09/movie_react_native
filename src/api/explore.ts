// IMPORT
import api from '@/services/axiosConfig';
import {MovieListResponseModel} from '@/models/homeModels';
import {handleResponse} from '@/utils/handleResponse';

export const getSearchMoviesApi = async ({
  page,
  searchText,
}: {
  page: number;
  searchText: string;
}): Promise<MovieListResponseModel> => {
  try {
    const response = await api.get(`/search/movie`, {
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
