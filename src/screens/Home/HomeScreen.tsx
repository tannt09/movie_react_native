// LIB
import {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

// IMPORT
import {fetchMovieDetail} from '@redux/Slice/HomeSlice';
import {AppDispatch, RootState} from '@redux/store';
import Play from '@assets/icons/ic_play.svg';
import Logo from '@assets/icons/ic_logo.svg';
import Search from '@assets/icons/ic_search.svg';
import Notification from '@assets/icons/ic_notification.svg';
import { COLORS } from '@constants/colors';

const HomeScreen = () => {
  const {isLoading, movieDetail} = useSelector(
    (state: RootState) => state.home,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const ids = [278, 238, 240, 424, 389, 129, 497, 680, 372058, 122, 13];
    const index = Math.floor(Math.random() * ids.length);
    const randomId = ids[index];

    dispatch(fetchMovieDetail(randomId));
  }, []);

  const getNameGenres = () => {
    if (!movieDetail?.genres) return '';
    return movieDetail.genres.map(item => item.name).join(', ');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.trailerContainer}>
        <Image
          source={{
            uri: `http://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`,
          }}
          style={styles.trailerImage}
          resizeMode="cover"
        />
        <View style={styles.titleIconContainer}>
          <Logo width={30} height={30} />
          <View style={{flex: 1}} />
          <Search width={30} height={30} />
          <View style={{width: 20}} />
          <Notification width={30} height={30} />
        </View>
        <View style={styles.overlay}>
          <Text style={styles.title}>{movieDetail?.title ?? ''}</Text>
          <Text style={styles.subtitle}>{getNameGenres()}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.playButton}>
              <Play width={20} height={20} />
              <View style={{width: 10}} />
              <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listButton}>
              <Ionicons name={'add'} size={20} color="#fff" />
              <View style={{width: 10}} />
              <Text style={styles.playButtonText}>My List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Now playing</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  trailerContainer: {
    height: 400,
    position: 'relative',
  },
  trailerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  titleIconContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontFamily: 'KoHo-Bold',
  },
  subtitle: {
    color: '#fff',
    marginVertical: 8,
    fontSize: 18,
    fontFamily: 'KoHo-Medium',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  playButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.PRIMARILY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginRight: 10,
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'KoHo-Medium',
  },
  listButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  // section: {
  //   paddingHorizontal: 20,
  //   paddingTop: 20,
  // },
  // sectionHeader: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginBottom: 10,
  // },
  // sectionTitle: {
  //   fontSize: 18,
  //   fontWeight: '600',
  // },
  // seeAll: {
  //   color: '#E21221',
  //   fontWeight: '500',
  // },
});

export default HomeScreen;
