// LIB
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const GridListSkeleton = ({width}: {width: number}) => {
  return (
    <SkeletonPlaceholder speed={1200}>
      <View style={[styles.listStyle, {flexDirection: 'row'}]}>
        <View>
          {[...Array(4)].map((_, i) => (
            <SkeletonPlaceholder.Item
              key={i}
              width={width}
              height={200}
              borderRadius={10}
              style={[styles.itemContainer, styles.itemMarginRight]}
            />
          ))}
        </View>
        <View>
          {[...Array(4)].map((_, i) => (
            <SkeletonPlaceholder.Item
              key={i}
              width={width}
              height={200}
              borderRadius={10}
              style={[styles.itemContainer, styles.itemMarginLeft]}
            />
          ))}
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = ScaledSheet.create({
  listStyle: {marginTop: 10, alignSelf: 'center'},
  itemContainer: {
    marginBottom: 16,
  },
  itemMarginRight: {
    marginEnd: 8,
  },
  itemMarginLeft: {
    marginStart: 8,
  },
});

export default GridListSkeleton;
