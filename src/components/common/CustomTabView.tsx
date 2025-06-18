// LIB
import React from 'react';
import {Animated, Dimensions, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {TabView, SceneRendererProps} from 'react-native-tab-view';

// IMPORT
import {COLORS} from '@/constants/colors';

interface CustomTabViewProp {
  renderScene: (
    props: SceneRendererProps & {route: {key: string}},
  ) => React.ReactNode;
  routes: {key: string; title: string}[];
  height?: number;
}

const CustomTabView: React.FC<CustomTabViewProp> = ({
  renderScene,
  routes,
  height = 400,
}) => {
  const [index, setIndex] = React.useState(0);

  const renderTabBar = (props: SceneRendererProps) => {
    const inputRange = routes.map((_, i) => i);

    return (
      <View style={styles.tabBar}>
        {routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: number) =>
              inputIndex === i ? 1 : 0.4,
            ),
          });

          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              <Animated.Text style={[styles.titleText, {opacity}]}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{height}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{width: Dimensions.get('window').width}}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'KoHo-Bold',
    fontSize: 16,
    color: COLORS.PRIMARILY,
  },
});

export default CustomTabView;
