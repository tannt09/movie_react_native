// LIB
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import YoutubePlayer from 'react-native-youtube-iframe';

// IMPORT
import {VideoState} from '@/redux/Slice/VideoSlice';

const TrailerScene = (trailer: VideoState) => {
  return (
    trailer.videos.length > 0 && (
      <ScrollView nestedScrollEnabled={true}>
        {trailer.videos.map(video => {
          return (
            <View key={video.id}>
              <YoutubePlayer height={300} play={false} videoId={video.key} />
              <Text style={styles.trailerText}>{video.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    )
  );
};

const styles = ScaledSheet.create({
  trailerText: {marginTop: 6, fontSize: 16, fontFamily: 'KoHo-Bold'},
});

export default TrailerScene;
