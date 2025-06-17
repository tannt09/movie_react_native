// LIB
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';

// IMPORT
import {RootStackParamList} from '@/models/navigationModels';
import {goBack} from '@/navigation/navigationService';
import {AppDispatch, RootState} from '@/redux/store';
import {fetchMovieDetail} from '@/redux/Slice/MovieDetailSlice';
import MyListIcon from '@assets/icons/ic_my_list.svg';
import ShareIcon from '@assets/icons/ic_share.svg';
import StarIcon from '@assets/icons/ic_star.svg';
import PlayIcon from '@assets/icons/ic_play.svg';
import DownloadIcon from '@assets/icons/ic_red_download.svg';
import {COLORS} from '@/constants/colors';

type MovieDetailsRouteProp = RouteProp<
  RootStackParamList,
  'MovieDetailsScreen'
>;

const {width} = Dimensions.get('window');
const WIDTH = (width - 42) / 2;

const MovieDetailsScreen = () => {
  const route = useRoute<MovieDetailsRouteProp>();
  const {id} = route.params;

  const dispatch = useDispatch<AppDispatch>();

  const {movieDetail, isLoading} = useSelector(
    (state: RootState) => state.movieDetail,
  );

  useEffect(() => {
    dispatch(fetchMovieDetail(id));
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Poster Image */}
      <View style={styles.posterContainer}>
        <Image
          source={{
            uri: `http://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`,
          }}
          style={styles.poster}
          resizeMode={'cover'}
        />
        <TouchableOpacity style={styles.backIcon} onPress={goBack}>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Title tab */}
        <View style={styles.subInfo}>
          <Text style={styles.title}>{movieDetail?.title}</Text>
          <View style={{flex: 1}} />
          <MyListIcon width={20} height={20} />
          <View style={{width: moderateScale(10)}} />
          <ShareIcon width={22} height={22} />
        </View>

        {/* Movie infomation */}
        <View style={styles.subInfo}>
          <StarIcon />
          <Text style={styles.rating}>{movieDetail?.vote_average ?? 0}</Text>
          <Feather name="chevron-right" size={20} color={COLORS.RED} />
          <Text style={styles.date}>{movieDetail?.release_date}</Text>
          <View style={[styles.ageContainer, {marginStart: moderateScale(10)}]}>
            <Text style={[styles.date, {color: COLORS.PRIMARILY}]}>13+</Text>
          </View>
          <View style={[styles.ageContainer, {marginStart: moderateScale(6)}]}>
            <Text style={[styles.date, {color: COLORS.PRIMARILY}]}>
              {movieDetail?.origin_country ?? ''}
            </Text>
          </View>
        </View>

        {/* Button container */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[
              styles.downloadButton,
              {backgroundColor: COLORS.PRIMARILY},
            ]}>
            <PlayIcon />
            <Text style={[styles.downloadText, {color: '#fff'}]}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.downloadButton, {marginStart: moderateScale(10)}]}>
            <DownloadIcon />
            <Text style={[styles.downloadText, {color: COLORS.PRIMARILY}]}>
              Download
            </Text>
          </TouchableOpacity>
        </View>

        {/* Genre infomation */}
        <Text style={styles.description}>
          {`Genre: ${movieDetail?.genres?.map(item => item.name).join(', ')}`}
        </Text>
        <Text style={styles.description}>{movieDetail?.overview ?? ''}</Text>

        <View style={styles.tabs}>
          <Text style={[styles.tabText, styles.activeTab]}>Trailer</Text>
          <Text style={styles.tabText}>Similar movies</Text>
          <Text style={styles.tabText}>Comments</Text>
        </View>

        {/* Trailer Preview */}
        <View style={styles.trailerBox}>
          <Image
            source={{
              uri: 'https://cdn.vox-cdn.com/thumbor/_nVtKN1C0hWLO8ZbImIOGJ_RxqY=/0x0:1280x720/1400x1400/filters:focal(640x360:641x361)/cdn.vox-cdn.com/uploads/chorus_asset/file/23708783/sonic.jpg',
            }}
            style={styles.trailerImage}
          />
          <Text style={styles.trailerText}>Let’s GOOOO!!!</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  posterContainer: {position: 'relative'},
  ageContainer: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderColor: COLORS.PRIMARILY,
  },
  poster: {width: '100%', height: 300},
  backIcon: {
    position: 'absolute',
    top: 30,
    left: 10,
    backgroundColor: '#00000088',
    borderRadius: 20,
    padding: 5,
  },
  content: {padding: 16},
  title: {fontSize: 24, marginBottom: 6, fontFamily: 'KoHo-Bold'},
  subInfo: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  rating: {color: COLORS.RED, marginStart: 8, fontFamily: 'KoHo-SemiBold'},
  date: {color: COLORS.DARK_GRAY, fontFamily: 'KoHo-Medium'},
  buttonsRow: {
    flexDirection: 'row',
    marginBottom: 24,
    marginTop: 8,
    justifyContent: 'center',
  },
  downloadText: {marginLeft: 6, fontFamily: 'KoHo-Medium', fontSize: 16},
  downloadButton: {
    width: WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.PRIMARILY,
    borderWidth: 2,
    paddingVertical: 6,
    borderRadius: 25,
  },
  description: {color: COLORS.DARK_GRAY, marginBottom: 12, fontFamily: 'KoHo-Medium', fontSize: 16},
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  tabText: {color: '#888', fontWeight: '600'},
  activeTab: {color: 'red', textDecorationLine: 'underline'},
  trailerBox: {marginTop: 10},
  trailerImage: {width: '100%', height: 180, borderRadius: 12},
  trailerText: {marginTop: 6, fontWeight: '600', fontSize: 16},
});

export default MovieDetailsScreen;
