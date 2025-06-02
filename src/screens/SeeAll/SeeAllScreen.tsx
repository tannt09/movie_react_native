// LIB
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

// IMPORT
import ItemMovie from '@/components/common/ItemMovie';
import {AppDispatch, RootState} from '@/redux/store';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/models/navigationModels';
import {goBack} from '@/navigation/navigationService';
import {fetchMovies} from '@/redux/Slice/HomeSlice';
import {MovieDetailModel} from '@/models/homeModels';

type SeeAllRouteProp = RouteProp<RootStackParamList, 'SeeAllScreen'>;

const {width} = Dimensions.get('window');
const ITEM_WIDTH = (width - 50) / 2;

const SeeAllScreen = () => {
  const {
    nowPlayMovies,
    topRatedMovies,
    upcomingMovies,
    popularMovies,
    isLoadingNowPlayMovies,
    isLoadingTopRatedMovies,
    isLoadingUpcomingMovies,
    isLoadingPopularMovies,
  } = useSelector((state: RootState) => state.home);

  const route = useRoute<SeeAllRouteProp>();
  const {title, endpoint} = route.params;

  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(2);

  const chooseData = () => {
    switch (endpoint) {
      case 'now_playing':
        return {movies: nowPlayMovies ?? [], loading: isLoadingNowPlayMovies};
      case 'top_rated':
        return {movies: topRatedMovies ?? [], loading: isLoadingTopRatedMovies};
      case 'upcoming':
        return {movies: upcomingMovies ?? [], loading: isLoadingUpcomingMovies};
      case 'popular':
        return {movies: popularMovies ?? [], loading: isLoadingPopularMovies};
      default:
        return {movies: [], loading: false};
    }
  };

  const getMoreMovies = (page: number, endpoint: string) => {
    if (chooseData().loading) return;
    dispatch(
      fetchMovies({
        page,
        endpoint,
        handleLoadMore: () => setPage(prev => prev + 1),
      }),
    );
  };

  const handleLoadMore = () => {
    getMoreMovies(page, endpoint);
  };

  const renderFooter = () => {
    if (!chooseData().loading) return null;
    return (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator size="small" color="#999" />
      </View>
    );
  };

  const renderItem = useCallback(
    ({item, index}: {item: MovieDetailModel; index: number}) => {
      const itemStyle =
        index % 2 === 0
          ? [styles.itemContainer, styles.itemMarginRight]
          : [styles.itemContainer, styles.itemMarginLeft];

      return (
        <View style={itemStyle}>
          <ItemMovie movie={item} width={ITEM_WIDTH} />
        </View>
      );
    },
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name={'arrow-back'} size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <FlatList
        data={chooseData().movies}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        style={styles.listStyle}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        // 🔥 Performance Props
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={7}
      />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  titleText: {fontFamily: 'KoHo-Bold', fontSize: 25, marginLeft: 30},
  titleRow: {flexDirection: 'row', alignItems: 'center'},
  listContent: {
    paddingVertical: 10,
    marginTop: 10,
  },
  listStyle: {marginTop: 10, alignSelf: 'center'},
  itemContainer: {
    marginBottom: 16,
  },
  itemMarginRight: {
    marginEnd: 8,
  },
  itemMarginLeft: {
    marginStart: 8,
  },
});

export default SeeAllScreen;
