// IMPORT
import {
  AddItemMoviesModel,
  AddMoviesResponseModel,
  MyListResponseModel,
} from '@/models/myListModels';
import {accessApi, defaultApi} from '@/services/axiosService';
import {handleResponse} from '@/utils/handleResponse';

export const getMyListApi = async ({
  id,
  page,
}: {
  id: number;
  page: number;
}): Promise<MyListResponseModel> => {
  try {
    const response = await defaultApi.get(`/list/${id}`, {
      params: {
        language: 'en-US',
        page,
      },
    });

    handleResponse(response.status);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addMoviesApi = async ({
  id,
  items,
}: {
  id: number;
  items: AddItemMoviesModel[];
}): Promise<AddMoviesResponseModel> => {
  try {
    const response = await accessApi.post(`/list/${id}/items`, {
      items: items,
    });

    handleResponse(response.status);

    return response.data;
  } catch (error) {
    throw error;
  }
};
