// IMPORT
import {MyListResponseModel} from '@/models/myListModels';
import api from '@/services/axiosConfig';
import {handleResponse} from '@/utils/handleResponse';

export const getMyListApi = async ({
  id,
  page,
}: {
  id: number;
  page: number;
}): Promise<MyListResponseModel> => {
  try {
    const response = await api.get(`/list/${id}`, {
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
