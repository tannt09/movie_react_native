// LIB
import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

// IMPORT
import CustomHeader from '@/components/common/CustomHeader';
import Scan from '@assets/icons/ic_scan.svg';
import Paypal from '@assets/icons/ic_paypal.svg';
import Google from '@assets/icons/google.svg';
import ApplePay from '@assets/icons/ic_apple_pay.svg';
import {COLORS} from '@/constants/colors';
import {navigate} from '@/navigation/navigationService';

const paymentOptions = [
  {
    id: 'paypal',
    label: 'PayPal',
    icon: <Paypal />,
  },
  {
    id: 'google',
    label: 'Google Pay',
    icon: <Google />,
  },
  {
    id: 'apple',
    label: 'Apple Pay',
    icon: <ApplePay />,
  },
];

const PaymentMethodScreen = () => {
  const [selected, setSelected] = useState('paypal');

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Payment"
        textProp={{paddingStart: 30}}
        LeftButton={
          <TouchableOpacity>
            <Scan width={26} height={26} />
          </TouchableOpacity>
        }
      />
      <View style={{marginTop: 10}}>
        <Text style={styles.subtitle}>
          Select the payment method you want to use.
        </Text>
      </View>
      <View style={styles.options}>
        {paymentOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={styles.option}
            onPress={() => setSelected(option.id)}>
            <View style={styles.optionLeft}>
              {option.icon}
              <Text style={styles.optionText}>{option.label}</Text>
            </View>
            <View
              style={
                selected === option.id ? styles.radioSelected : styles.radio
              }
            />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.addCardBtn}>
        <Text style={[styles.buttonText, {color: 'red'}]}>Add New Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.solidButton}
        onPress={() => navigate('ReviewSumaryScreen')}>
        <Text style={[styles.buttonText, {color: 'white'}]}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  subtitle: {
    color: COLORS.GRAY,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'KoHo-Medium',
  },
  options: {marginBottom: 24},
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  optionLeft: {flexDirection: 'row', alignItems: 'center'},
  optionText: {fontSize: 16, marginStart: 10, fontFamily: 'KoHo-Medium'},
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.GRAY,
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 6,
    borderColor: 'red',
  },
  addCardBtn: {
    backgroundColor: '#ffeef0',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 18,
    fontFamily: 'KoHo-Bold',
  },
  solidButton: {
    backgroundColor: COLORS.RED,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 10,
    left: 10,
  },
});

export default PaymentMethodScreen;
