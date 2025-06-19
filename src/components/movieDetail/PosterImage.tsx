// LIB
import {Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const PosterImage = ({
  poster_path,
  isLoading,
}: {
  poster_path: string;
  isLoading: boolean;
}) => {
  return isLoading ? (
    <SkeletonPlaceholder speed={1000}>
      <SkeletonPlaceholder.Item width="100%" height={400} />
    </SkeletonPlaceholder>
  ) : (
    <Image
      source={{
        uri: `http://image.tmdb.org/t/p/w500${poster_path}`,
      }}
      style={styles.poster}
      resizeMode={'cover'}
    />
  );
};

const styles = ScaledSheet.create({
  poster: {width: '100%', height: 400},
});

export default PosterImage;
