//LIB
import {Text, View} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

//IMPORT
import MyListIcon from '@assets/icons/ic_my_list.svg';
import ShareIcon from '@assets/icons/ic_share.svg';

const TitleTab = ({title, isLoading}: {title: string; isLoading: boolean}) => {
  return isLoading ? (
    <SkeletonPlaceholder speed={1200} backgroundColor="#dfdfdf">
      <View style={styles.subInfo}>
        <SkeletonPlaceholder.Item width="60%" height={30} borderRadius={4} />
        <View style={{flex: 1}}/>
        <SkeletonPlaceholder.Item width="10%" height={30} borderRadius={4} />
        <SkeletonPlaceholder.Item width="10%" height={30} borderRadius={4} marginStart={moderateScale(10)}/>
      </View>
    </SkeletonPlaceholder>
  ) : (
    <View style={styles.subInfo}>
      <Text style={styles.title}>{title}</Text>
      <View style={{flex: 1}} />
      <MyListIcon width={20} height={20} />
      <View style={{width: moderateScale(10)}} />
      <ShareIcon width={22} height={22} />
    </View>
  );
};

const styles = ScaledSheet.create({
  subInfo: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  title: {fontSize: 24, marginBottom: 6, fontFamily: 'KoHo-Bold'},
});

export default TitleTab;
