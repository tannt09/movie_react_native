// LIB
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// IMPORT
import {COLORS} from '@/constants/colors';
import {MovieDetailModel} from '@/models/homeModels';
import ItemMovie from '../common/ItemMovie';
import {navigate} from '@/navigation/navigationService';

interface HorizontalMoviesProp {
  movies: MovieDetailModel[];
  title: string;
  isLoading: boolean;
  onPress: () => void;
}

const arr = Array(4).fill(undefined);

const HorizontalMovies: React.FC<HorizontalMoviesProp> = ({
  movies,
  title,
  isLoading,
  onPress,
}) => {
  return (
    <>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? (
        <SkeletonPlaceholder speed={1000}>
          <View style={styles.skeletonContainer}>
            {arr.map((_, index) => {
              return (
                <SkeletonPlaceholder.Item
                  key={index}
                  width={150}
                  height={200}
                  borderRadius={10}
                  style={styles.itemSkeletonContainer}
                />
              );
            })}
          </View>
        </SkeletonPlaceholder>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginHorizontal: 20}}>
          {movies.map((movie, index) => {
            const handlePressItem = () => {
              navigate('MovieDetailsScreen', {id: movie.id});
            };
            return (
              <View key={index} style={{marginEnd: 16}}>
                <ItemMovie movie={movie} onPress={handlePressItem} />
              </View>
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

const styles = ScaledSheet.create({
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'KoHo-Medium',
  },
  seeAll: {
    fontSize: 18,
    color: COLORS.PRIMARILY,
    fontFamily: 'KoHo-Medium',
  },
  skeletonContainer: {flexDirection: 'row', marginStart: 20},
  itemSkeletonContainer: {marginEnd: 20},
});

export default HorizontalMovies;
