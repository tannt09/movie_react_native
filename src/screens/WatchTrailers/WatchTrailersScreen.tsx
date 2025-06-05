// LIB
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import YoutubePlayer from 'react-native-youtube-iframe';

// IMPORT
import {RootState} from '@/redux/store';
import CustomHeader from '@/components/common/CustomHeader';

const WatchTrailersScreen = () => {
  const {videos} = useSelector((state: RootState) => state.video);

  return (
    <View style={styles.container}>
      <CustomHeader
        title={videos[0].name ?? ''}
        textProp={{paddingStart: moderateScale(30)}}
      />
      {videos.length > 0 && (
        <YoutubePlayer height={300} play={true} videoId={videos[0].key} />
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 30,
  },
});

export default WatchTrailersScreen;
