// LIB
import {Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

//IMPORT
import StarIcon from '@assets/icons/ic_star.svg';
import {COLORS} from '@/constants/colors';
import {MovieDetailModel} from '@/models/homeModels';

const MovieInfomation = ({
  movieDetail,
  isLoading,
}: {
  movieDetail: MovieDetailModel | undefined;
  isLoading: boolean;
}) => {
  return isLoading ? (
    <SkeletonPlaceholder speed={1200}>
      <SkeletonPlaceholder.Item width="100%" height={30} />
    </SkeletonPlaceholder>
  ) : (
    <View style={styles.subInfo}>
      <StarIcon />
      <Text style={styles.rating}>{movieDetail?.vote_average ?? 0}</Text>
      <Feather name="chevron-right" size={20} color={COLORS.RED} />
      <Text style={styles.date}>
        {movieDetail?.release_date ?? 'YYYY-MM-DD'}
      </Text>
      <View style={[styles.ageContainer, {marginStart: moderateScale(10)}]}>
        <Text style={[styles.date, {color: COLORS.PRIMARILY}]}>13+</Text>
      </View>
      <View style={[styles.ageContainer, {marginStart: moderateScale(6)}]}>
        <Text style={[styles.date, {color: COLORS.PRIMARILY}]}>
          {movieDetail?.origin_country ?? ''}
        </Text>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  subInfo: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  rating: {color: COLORS.RED, marginStart: 8, fontFamily: 'KoHo-SemiBold'},
  date: {color: COLORS.DARK_GRAY, fontFamily: 'KoHo-Medium'},
  ageContainer: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderColor: COLORS.PRIMARILY,
  },
});

export default MovieInfomation;
