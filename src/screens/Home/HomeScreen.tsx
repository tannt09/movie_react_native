// LIB
import {useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
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

const HomeScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ImageBackground
      source={require('@assets/images/bg_welcome.png')}
      style={styles.background}
      resizeMode="cover">
      <Carousel
        data={data}
        renderItem={renderItem}
        onSnapToItem={index => setActiveIndex(index)}
        loop={true}
        width={width * 0.8}
        height={400}
        autoPlay={true}
        autoPlayInterval={2000}
        autoPlayReverse={true}
      />

      <View style={{marginVertical: 10, flexDirection: 'row'}}>
        {data.map((_, index) => {
          return (
            <View
              key={index}
              style={[styles.dot, index === activeIndex && styles.activeDot]}
            />
          );
        })}
      </View>

      <TouchableOpacity style={styles.outlineButton}>
        <Text style={styles.outlineText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.solidButton}>
        <Text style={styles.solidText}>Sign in</Text>
      </TouchableOpacity>
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
  outlineButton: {
    borderWidth: 1,
    borderColor: '#E50914',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    width: '80%',
  },
  outlineText: {
    color: '#E50914',
    fontSize: 16,
    fontWeight: '600',
  },
  solidButton: {
    backgroundColor: '#E50914',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
  },
  solidText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 25,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f14334',
    marginHorizontal: 4,
  },
});

export default HomeScreen;
