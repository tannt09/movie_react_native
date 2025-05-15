// LIB
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

// IMPORT
import MediaIcon from '@assets/icons/ic_logo.svg';
import LoadingDots from '@/components/LoadingDots';
import {navigate} from '@/navigation/navigationService';

const SplashScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('HomeScreen');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', position: 'relative'}}>
      <MediaIcon width={100} height={100} style={styles.logoStyle} />
      <View style={{position: 'absolute', bottom: 30, start: 0, end: 0}}>
        <LoadingDots />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoStyle: {alignSelf: 'center'},
});

export default SplashScreen;
