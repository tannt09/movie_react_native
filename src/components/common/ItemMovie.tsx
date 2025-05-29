// LIB
import React from 'react';
import {Image, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

// IMPORT
import {COLORS} from '@/constants/colors';
import {MovieDetailModel} from '@/models/homeModels';

interface ItemMovieProp {
  movie: MovieDetailModel;
  width?: number;
}

const ItemMovie: React.FC<ItemMovieProp> = ({movie, width = 150}) => {
  return (
    <View style={[styles.movieCard, {width}]}>
      <Image
        source={{
          uri: `http://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={styles.movieImage}
        resizeMode="cover"
      />
      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>{movie.vote_average.toFixed(1)}</Text>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  movieCard: {
    position: 'relative',
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

export default ItemMovie;
