// LIB
import {useCallback} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  TextInput,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

// IMPORT
import CustomHeader from '@/components/common/CustomHeader';
import {MovieDetailModel} from '@/models/homeModels';
import ItemMovie from '@/components/common/ItemMovie';
import GridListSkeleton from '@/components/common/GridListSkeleton';
import useExploreLogic from './Explore.logic';
import { COLORS } from '@/constants/colors';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = (width - 50) / 2;

const ExploreScreen = () => {
  const {
    flatListRef,
    isLoading,
    searchText,
    exploreMovies,
    handleChangeSearchText,
    handleLoadMore,
  } = useExploreLogic();

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator size="small" color={COLORS.GRAY} />
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
      <CustomHeader title="Explore" textProp={{alignItems: 'center'}} />
      <TextInput
        style={styles.input}
        placeholder="Search name..."
        value={searchText}
        onChangeText={handleChangeSearchText}
      />
      {isLoading && exploreMovies.length === 0 ? (
        <GridListSkeleton width={ITEM_WIDTH} />
      ) : (
        <FlatList
          ref={flatListRef}
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
      )}
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
    paddingBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});

export default ExploreScreen;
