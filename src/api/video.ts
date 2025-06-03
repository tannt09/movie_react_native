// IMPORT
import { VideosResponseModel } from '@/models/videoModels';
import api from '@/services/axiosConfig';
import {handleResponse} from '@/utils/handleResponse';

export const getTrailerVideoApi = async ({id}: {id: number}): Promise<VideosResponseModel> => {
  try {
    const response = await api.get(`/movie/${id}/videos`, {
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
