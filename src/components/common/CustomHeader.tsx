// LIB
import React, {ReactNode} from 'react';
import {StatusBar, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

// IMPORT
import {goBack} from '@/navigation/navigationService';

interface CustomHeaderProps {
  title: string;
  textProp?: ViewStyle;
  LeftButton?: ReactNode;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  textProp,
  LeftButton,
}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name={'arrow-back'} size={26} color="#000" />
        </TouchableOpacity>
        <View style={[styles.titleContainer, {...textProp}]}>
          <Text style={styles.titleText} numberOfLines={1}>
            {title}
          </Text>
        </View>
        {LeftButton}
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  titleContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {fontFamily: 'KoHo-Bold', fontSize: 25},
});

export default CustomHeader;
