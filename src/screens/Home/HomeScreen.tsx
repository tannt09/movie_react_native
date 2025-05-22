// LIB
import {useEffect} from 'react';
import {Text, View} from 'react-native';

// IMPORT
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovieDetail} from '@redux/Slice/HomeSlice';
import {AppDispatch, RootState} from '@redux/store';

const HomeScreen = () => {
  const {isLoading, movieDetail} = useSelector(
    (state: RootState) => state.home,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMovieDetail(123));
  }, []);

  return (
    <View>
      {/* <MediaIcon /> */}
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
