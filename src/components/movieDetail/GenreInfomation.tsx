// LIB
import {Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// IMPORT
import {COLORS} from '@/constants/colors';
import {MovieDetailModel} from '@/models/homeModels';

const GenreInfomation = ({
  movieDetail,
  isLoading,
}: {
  movieDetail: MovieDetailModel | undefined;
  isLoading: boolean;
}) => {
  return isLoading ? (
    <SkeletonPlaceholder speed={1200}>
      <SkeletonPlaceholder.Item width={'100%'} height={30} marginBottom={12} />
      <SkeletonPlaceholder.Item width={'100%'} height={120} marginBottom={12} />
    </SkeletonPlaceholder>
  ) : (
    <>
      <Text style={styles.description}>
        {`Genre: ${movieDetail?.genres?.map(item => item.name).join(', ')}`}
      </Text>
      <Text style={styles.description}>{movieDetail?.overview ?? ''}</Text>
    </>
  );
};

const styles = ScaledSheet.create({
  description: {
    color: COLORS.DARK_GRAY,
    marginBottom: 12,
    fontFamily: 'KoHo-Medium',
    fontSize: 16,
  },
  descriptionSkeleton: {
    marginBottom: 12,
  },
});

export default GenreInfomation;
