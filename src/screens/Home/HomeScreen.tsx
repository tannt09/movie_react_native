// LIB
import {useEffect} from 'react';
import {Alert, Text, View} from 'react-native';

// IMPORT
import {getMovieDetail} from '@/api/home';

const HomeScreen = () => {
  const fetchMovieDetail = async () => {
    try {
      const movie = await getMovieDetail({id: 123});

      console.log('----1111 ', movie);
    } catch (err) {
      Alert.alert('Unable to load movie details', `${err}`);
    }
  };
  useEffect(() => {
    fetchMovieDetail();
  }, []);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
