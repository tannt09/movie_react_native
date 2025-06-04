// LIB
import {Alert, Button, SafeAreaView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import YoutubePlayer from 'react-native-youtube-iframe';

// IMPORT
import {RootState} from '@/redux/store';
import CustomHeader from '@/components/common/CustomHeader';
import {useCallback, useState} from 'react';

const WatchTrailersScreen = () => {
  const {videos} = useSelector((state: RootState) => state.video);
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={videos[0].key}
        onChangeState={onStateChange}
      />
      <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} />
    </View>
  );
  //   return (
  //     <View style={styles.container}>
  //       <CustomHeader
  //         title={videos[0].name ?? ''}
  //         textProp={{paddingStart: moderateScale(30)}}
  //       />
  //       {videos.length > 0 && (
  //         <View style={{backgroundColor: 'blue'}}>
  //           <YoutubePlayer height={300} play={true} videoId={videos[0].key} />
  //         </View>
  //       )}
  //     </View>
  //   );
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
