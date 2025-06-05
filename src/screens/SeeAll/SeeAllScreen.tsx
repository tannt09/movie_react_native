// LIB
import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import {
  moderateScale,
  ScaledSheet,
} from 'react-native-size-matters';

// IMPORT
import ItemMovie from '@/components/common/ItemMovie';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/models/navigationModels';
import {MovieDetailModel} from '@/models/homeModels';
import useSeeAllLogic from './SeeAll.logic';
import CustomHeader from '@/components/common/CustomHeader';

type SeeAllRouteProp = RouteProp<RootStackParamList, 'SeeAllScreen'>;

const {width} = Dimensions.get('window');
const ITEM_WIDTH = (width - 50) / 2;

const SeeAllScreen = () => {
  const route = useRoute<SeeAllRouteProp>();
  const {title, endpoint} = route.params;

  const {chooseData, handleLoadMore} = useSeeAllLogic(endpoint);

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
      <CustomHeader
        title={title}
        textProp={{paddingStart: moderateScale(30)}}
      />
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
