// LIB
import {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

// IMPORT
import CustomHeader from '@/components/common/CustomHeader';
import {AppDispatch, RootState} from '@/redux/store';
import {MovieDetailModel} from '@/models/homeModels';
import ItemMovie from '@/components/common/ItemMovie';
import {fetchSearchMovies} from '@/redux/Slice/ExploreSlice';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = (width - 50) / 2;

const ExploreScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading, exploreMovies, totalPage} = useSelector(
    (state: RootState) => state.explore,
  );

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  const getSearchMovies = (page: number, searchText: string) => {
    if (isLoading || page > totalPage) return;
    dispatch(
      fetchSearchMovies({
        page,
        searchText,
        handleLoadMore: () => setPage(prev => prev + 1),
      }),
    );
  };

  const handleLoadMore = () => {
    getSearchMovies(page, searchText);
  };

  useEffect(() => {
    getSearchMovies(page, searchText);
  }, []);

  const renderFooter = () => {
    if (!isLoading) return null;
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

  console;

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Explore" textProp={{alignItems: 'center'}} />
      <FlatList
        data={exploreMovies}
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
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 40,
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
