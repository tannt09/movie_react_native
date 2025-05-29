// LIB
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

// IMPORT
import {COLORS} from '@/constants/colors';
import {MovieDetailModel} from '@/models/homeModels';
import ItemMovie from '../common/ItemMovie';

interface HorizontalMoviesProp {
  movies: MovieDetailModel[];
  title: string;
  onPress: () => void;
}

const HorizontalMovies: React.FC<HorizontalMoviesProp> = ({
  movies,
  title,
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginHorizontal: 20}}>
        {movies.map((movie, index) => {
          return (
            <View key={index} style={{marginEnd: 16}}>
              <ItemMovie movie={movie} />
            </View>
          );
        })}
      </ScrollView>
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
});

export default HorizontalMovies;
