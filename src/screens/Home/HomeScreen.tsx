// LIB
import {useEffect} from 'react';
import {Text, View} from 'react-native';

// IMPORT
import api from '@/services/axiosConfig';

const HomeScreen = () => {
  const getMovieDetail = async ({id}: {id: number}) => {
    try {
      const response = await api.get(`/movie/${id}`, {
        params: {
          language: 'en-US',
        },
      });
      console.log('----1111', response.data);
    } catch (error) {
      console.error('Error Get Movie Detail ', error);
    }
  };

  useEffect(() => {
    getMovieDetail({id: 278});
  }, []);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
