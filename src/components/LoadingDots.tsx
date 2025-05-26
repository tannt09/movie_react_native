// LIB
import { COLORS } from '@constants/colors';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

const LoadingDots = ({
  interval = 500,
  dotCount = 3,
}: {
  interval?: number;
  dotCount?: number;
}) => {
  const arr = Array.from({length: dotCount});
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDots(prev => (prev < dotCount - 1 ? prev + 1 : 0));
    }, interval);

    return () => clearInterval(timer);
  }, [interval, dotCount]);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        {arr.map((_, index) => {
          return (
            <View
              key={index}
              style={[styles.dot, index === dots && styles.activeDot]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: COLORS.PRIMARILY,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 30,
    height: 10,
    borderRadius: 6,
    backgroundColor: COLORS.PRIMARILY,
    marginHorizontal: 4,
  },
});

export default LoadingDots;
