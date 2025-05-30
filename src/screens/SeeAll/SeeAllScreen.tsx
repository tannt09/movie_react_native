// LIB
import React from 'react';
import {
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
import {useSelector} from 'react-redux';

// IMPORT
import ItemMovie from '@/components/common/ItemMovie';
import {RootState} from '@/redux/store';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/models/navigationModels';
import {goBack} from '@/navigation/navigationService';

type SeeAllRouteProp = RouteProp<RootStackParamList, 'SeeAllScreen'>;

const {width} = Dimensions.get('window');
const ITEM_WIDTH = (width - 50) / 2;

const SeeAllScreen = () => {
  const {nowPlayMovies, topRatedMovies, upcomingMovies, popularMovies} =
    useSelector((state: RootState) => state.home);

  const route = useRoute<SeeAllRouteProp>();
  const {title} = route.params;

  const chooseData = () => {
    switch (title) {
      case 'Now playing':
        return nowPlayMovies ?? [];
      case 'Top rate':
        return topRatedMovies ?? [];
      case 'Upcoming':
        return upcomingMovies ?? [];
      case 'Popular':
        return popularMovies ?? [];
      default:
        return [];
    }
  };

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
        data={chooseData()}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <View
            style={[
              styles.itemContainer,
              index % 2 === 0 ? {marginEnd: 8} : {marginStart: 8},
            ]}>
            <ItemMovie movie={item} width={ITEM_WIDTH} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        style={styles.listStyle}
        showsVerticalScrollIndicator={false}
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
});

export default SeeAllScreen;
