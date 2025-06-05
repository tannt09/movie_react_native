// LIB
import {useCallback, useEffect} from 'react';
import {Dimensions, FlatList, ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

// IMPORT
import CustomHeader from '@/components/common/CustomHeader';
import {AppDispatch, RootState} from '@/redux/store';
import {fetchTrendingVideos} from '@/redux/Slice/ExploreSlice';
import {MovieDetailModel} from '@/models/homeModels';
import ItemMovie from '@/components/common/ItemMovie';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = (width - 50) / 2;

const ExploreScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading, exploreMovies} = useSelector(
    (state: RootState) => state.explore,
  );

  useEffect(() => {
    dispatch(fetchTrendingVideos());
  }, []);

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
    <View style={styles.container}>
      <CustomHeader title="Explore" textProp={{alignItems: 'center'}} />
      <FlatList
        data={exploreMovies}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        style={styles.listStyle}
        showsVerticalScrollIndicator={false}
        // 🔥 Performance Props
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={7}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  itemContainer: {
    marginBottom: 16,
  },
  itemMarginRight: {
    marginEnd: 8,
  },
  itemMarginLeft: {
    marginStart: 8,
  },
  listStyle: {marginTop: 10, alignSelf: 'center'},
  listContent: {
    paddingVertical: 10,
    marginTop: 10,
  },
});

export default ExploreScreen;
