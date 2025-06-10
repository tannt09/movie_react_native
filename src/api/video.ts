// IMPORT
import {VideosResponseModel} from '@/models/videoModels';
import {defaultApi} from '@/services/axiosService';
import {handleResponse} from '@/utils/handleResponse';

export const getTrailerVideoApi = async ({
  id,
}: {
  id: number;
}): Promise<VideosResponseModel> => {
  try {
    const response = await defaultApi.get(`/movie/${id}/videos`, {
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
