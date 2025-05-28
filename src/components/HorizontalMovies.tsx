// LIB
import {Image, ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

// IMPORT
import {COLORS} from '@/constants/colors';
import {MovieDetailModel} from '@/models/homeModels';

interface HorizontalMoviesProp {
  movies: MovieDetailModel[];
  title: string;
}

const HorizontalMovies: React.FC<HorizontalMoviesProp> = ({movies, title}) => {
  return (
    <>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginHorizontal: 20}}>
        {movies.map((movie, index) => {
          return (
            <View key={index} style={styles.movieCard}>
              <Image
                source={{
                  uri: `http://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
                style={styles.movieImage}
                resizeMode="cover"
              />
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>
                  {movie.vote_average.toFixed(1)}
                </Text>
              </View>
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
  movieCard: {
    marginRight: 15,
    position: 'relative',
    width: 150,
    height: 200,
  },
  movieImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.PRIMARILY,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'KoHo-Regular',
  },
});

export default HorizontalMovies;
