// LIB
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScaledSheet} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// IMPORT
import Play from '@assets/icons/ic_play.svg';
import Logo from '@assets/icons/ic_logo.svg';
import Search from '@assets/icons/ic_search.svg';
import Notification from '@assets/icons/ic_notification.svg';
import {COLORS} from '@constants/colors';
import useHomeLogic from './Home.logic';
import {navigate} from '@/navigation/navigationService';
import HorizontalMovies from '@/components/home/HorizontalMovies';

const HomeScreen = () => {
  const {
    isLoadingDetail,
    isLoading,
    movieDetail,
    movies,
    getNameGenres,
    handlePlayVideo,
    handleAddToMyList,
  } = useHomeLogic();

  return (
    <ScrollView style={styles.container}>
      {/* Poster */}
      <View style={styles.trailerContainer}>
        {isLoadingDetail ? (
          <SkeletonPlaceholder speed={1000}>
            <SkeletonPlaceholder.Item width="100%" height="100%" />
          </SkeletonPlaceholder>
        ) : (
          <Image
            source={{
              uri: `http://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`,
            }}
            style={styles.trailerImage}
            resizeMode="cover"
          />
        )}
        <View style={styles.titleIconContainer}>
          <Logo width={30} height={30} />
          <View style={{flex: 1}} />
          <Search width={30} height={30} />
          <View style={{width: 20}} />
          <Notification width={30} height={30} />
        </View>
        <View style={styles.overlay}>
          {isLoadingDetail ? (
            <SkeletonPlaceholder speed={1200} backgroundColor="#dfdfdf">
              <SkeletonPlaceholder.Item
                width="100%"
                height={30}
                borderRadius={4}
                marginBottom={10}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={30}
                borderRadius={4}
              />
            </SkeletonPlaceholder>
          ) : (
            <>
              <Text style={styles.title}>{movieDetail?.title ?? ''}</Text>
              <Text style={styles.subtitle}>{getNameGenres()}</Text>
            </>
          )}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={handlePlayVideo}>
              <Play width={20} height={20} />
              <View style={{width: 10}} />
              <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listButton}
              onPress={handleAddToMyList}>
              <Ionicons name={'add'} size={20} color="#fff" />
              <View style={{width: 10}} />
              <Text style={styles.playButtonText}>My List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Now playing videos */}
      <HorizontalMovies
        movies={movies[0] ?? []}
        title={'Now playing'}
        isLoading={isLoading[0]}
        onPress={() =>
          navigate('SeeAllScreen', {
            title: 'Now playing',
            endpoint: 'now_playing',
          })
        }
      />

      {/* Top rate videos */}
      <HorizontalMovies
        movies={movies[1] ?? []}
        title={'Top rate'}
        isLoading={isLoading[1]}
        onPress={() =>
          navigate('SeeAllScreen', {title: 'Top rate', endpoint: 'top_rated'})
        }
      />

      {/* Upcomming videos */}
      <HorizontalMovies
        movies={movies[2] ?? []}
        title={'Upcoming'}
        isLoading={isLoading[2]}
        onPress={() =>
          navigate('SeeAllScreen', {title: 'Upcoming', endpoint: 'upcoming'})
        }
      />

      {/* Popular videos */}
      <HorizontalMovies
        movies={movies[3] ?? []}
        title={'Popular'}
        isLoading={isLoading[3]}
        onPress={() =>
          navigate('SeeAllScreen', {title: 'Popular', endpoint: 'popular'})
        }
      />
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#fff',
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
});

export default HomeScreen;
