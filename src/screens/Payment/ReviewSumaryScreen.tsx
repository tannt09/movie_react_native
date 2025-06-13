// LIB
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

// IMPORT
import CustomHeader from '@/components/common/CustomHeader';
import PremiumCard from '@/components/payment/PremiumCard';
import Paypal from '@assets/icons/ic_paypal.svg';
import CustomButton from '@/components/common/CustomButton';
import {navigate} from '@/navigation/navigationService';

const ReviewSumaryScreen = () => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Review Sumary" textProp={{paddingStart: 30}} />
      <View style={{height: 20}} />
      <PremiumCard price={'$9.99'} period={'month'} />

      {/* Pricing Box */}
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>$9.99</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tax</Text>
          <Text style={styles.value}>$0</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.value}>$9.99</Text>
        </View>
      </View>

      {/* Payment Method Box */}
      <View style={styles.paymentBox}>
        <View style={styles.paymentRow}>
          <Paypal />
          <Text style={styles.paymentText}>PayPal</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      <CustomButton
        content={'Continue'}
        styleButton={{
          position: 'absolute',
          bottom: 20,
          right: 10,
          left: 10,
        }}
        onPress={() => navigate('PaymentCard')}
      />
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
  box: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'KoHo-Regular',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'KoHo-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  paymentBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    fontFamily: 'KoHo-SemiBold',
    marginStart: 5,
  },
  changeText: {
    color: 'red',
    fontSize: 18,
    ontFamily: 'KoHo-SemiBold',
  },
});

export default ReviewSumaryScreen;
