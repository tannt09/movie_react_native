// LIB
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';

//IMPORT
import PlayIcon from '@assets/icons/ic_play.svg';
import DownloadIcon from '@assets/icons/ic_red_download.svg';
import {COLORS} from '@/constants/colors';

const {width} = Dimensions.get('window');
const WIDTH = (width - 42) / 2;

const ButtonContainer = () => {
  return (
    <View style={styles.buttonsRow}>
      <TouchableOpacity
        style={[styles.downloadButton, {backgroundColor: COLORS.PRIMARILY}]}>
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
  );
};

const styles = ScaledSheet.create({
  buttonsRow: {
    flexDirection: 'row',
    marginBottom: 24,
    marginTop: 8,
    justifyContent: 'center',
  },
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
  downloadText: {marginLeft: 6, fontFamily: 'KoHo-Medium', fontSize: 16},
});

export default ButtonContainer;
