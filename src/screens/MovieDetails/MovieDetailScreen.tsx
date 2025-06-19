// LIB
import React, {useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ScaledSheet} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

// IMPORT
import {RootStackParamList} from '@/models/navigationModels';
import {AppDispatch, RootState} from '@/redux/store';
import {fetchMovieDetail} from '@/redux/Slice/MovieDetailSlice';
import CustomTabView from '@/components/common/CustomTabView';
import {fetchTrailerVideo} from '@/redux/Slice/VideoSlice';
import TrailerScene from './TrailersScene';
import PosterImage from '@/components/movieDetail/PosterImage';
import TitleTab from '@/components/movieDetail/TitleTab';
import MovieInfomation from '@/components/movieDetail/MovieInfomation';
import ButtonContainer from '@/components/movieDetail/ButtonContainer';
import GenreInfomation from '@/components/movieDetail/GenreInfomation';
import {goBack} from '@/navigation/navigationService';

type MovieDetailsRouteProp = RouteProp<
  RootStackParamList,
  'MovieDetailsScreen'
>;

const routes = [
  {key: 'first', title: 'Trailer'},
  {key: 'second', title: 'Similar movies'},
  {key: 'third', title: 'Comments'},
];

const MovieDetailsScreen = () => {
  const route = useRoute<MovieDetailsRouteProp>();
  const {id} = route.params;

  const dispatch = useDispatch<AppDispatch>();

  const {movieDetail, isLoading} = useSelector(
    (state: RootState) => state.movieDetail,
  );
  const trailer = useSelector((state: RootState) => state.video);

  const renderScene = ({
    route,
  }: {
    route: {
      key: string;
    };
  }) => {
    switch (route.key) {
      case 'first':
        return TrailerScene(trailer);
      case 'second':
        return <Text>Similar movies</Text>;
      case 'third':
        return <Text>Comments</Text>;
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch(fetchMovieDetail(id));
    dispatch(fetchTrailerVideo({id}));
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        <PosterImage
          poster_path={movieDetail?.poster_path ?? ''}
          isLoading={isLoading}
        />

        <View style={styles.content}>
          <TitleTab title={movieDetail?.title ?? ''} isLoading={isLoading} />

          <MovieInfomation movieDetail={movieDetail} isLoading={isLoading} />

          <ButtonContainer />

          <GenreInfomation movieDetail={movieDetail} isLoading={isLoading} />

          <CustomTabView
            renderScene={renderScene}
            routes={routes}
            height={364}
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.backIcon} onPress={goBack}>
        <Ionicons name="chevron-back" size={24} color="#fff" />
      </TouchableOpacity> 
    </>
  );
};

const styles = ScaledSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  content: {padding: 16},
  backIcon: {
    position: 'absolute',
    top: 30,
    left: 10,
    backgroundColor: '#00000088',
    borderRadius: 20,
    padding: 5,
  },
});

export default MovieDetailsScreen;
