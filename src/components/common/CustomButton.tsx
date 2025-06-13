// LIB
import React from 'react';
import {Text, TouchableOpacity, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

// IMPORT
import {COLORS} from '@/constants/colors';

interface CustomBottomProps {
  content: string;
  styleButton?: ViewStyle;
  textColor?: string;
  backgroundColor?: string;
  onPress: () => void;
}

const CustomButton: React.FC<CustomBottomProps> = ({
  content,
  styleButton,
  textColor = 'white',
  backgroundColor = COLORS.RED,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.solidButton,
        styleButton,
        {backgroundColor: backgroundColor},
      ]}
      onPress={onPress}>
      <Text style={[styles.buttonText, {color: textColor}]}>{content}</Text>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  solidButton: {
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'KoHo-Bold',
  },
});

export default CustomButton;
