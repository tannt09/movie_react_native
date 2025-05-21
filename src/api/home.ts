// LIB
import api from '@/services/axiosConfig';
import {handleResponse} from '@/untils/handleResponse';

export const getMovieDetail = async ({id}: {id: number}) => {
  try {
    const response = await api.get(`/movie/${id}`, {
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
