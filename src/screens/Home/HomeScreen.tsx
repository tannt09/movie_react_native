// LIB
import {
  Button,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

type ItemType = {
  id: string;
  image: any;
};

const {width} = Dimensions.get('window');

const data: ItemType[] = [
  {id: '1', image: require('@assets/images/bg_home.png')},
  {id: '2', image: require('@assets/images/bg_home.png')},
  {id: '3', image: require('@assets/images/bg_home.png')},
];

const HomeScreen = () => {
  const renderItem = ({item}: {item: ItemType}) => (
    <View style={styles.itemCarouselStyle}>
      <View style={styles.imageContainerStyle}>
        <Image source={item.image} style={styles.imageStyle} />
      </View>
      <Text style={styles.titleTextStyle}>Welcome to Movie</Text>
      <Text style={styles.textStyle}>
        The best movie steaming app of the century to make your days great!
      </Text>
    </View>
  );
  return (
    <ImageBackground
      source={require('@assets/images/bg_welcome.png')}
      style={styles.background}
      resizeMode="cover">
      <Carousel
        data={data}
        renderItem={renderItem}
        loop={true}
        width={width * 0.8}
        height={400}
        autoPlay={true}
        autoPlayInterval={2000}
        autoPlayReverse={true}
      />
      <Button
        title="Go to Movie List"
        onPress={() => {
          // navigation.navigate('MovieListScreen');
        }}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainerStyle: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    height: 300,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemCarouselStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    color: 'white',
    fontSize: 20,
    opacity: 0.8,
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.8,
    marginTop: 20,
    marginHorizontal: 10,
  },
});
export default HomeScreen;
