// LIB
import {ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

// IMPORT
import CustomHeader from '@/components/common/CustomHeader';
import PremiumCard from '@/components/payment/PremiumCard';

const PaymentScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <CustomHeader title="" />
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>Subscribe to Premium</Text>
        <Text style={styles.subtitle}>
          Enjoy watching Full-HD movies, without{'\n'}restrictions and without
          ads
        </Text>
      </View>
      <PremiumCard price={'$9.99'} period={'month'} />
      <PremiumCard price={'$99.99'} period={'year'} />
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    color: 'red',
    fontFamily: 'KoHo-Bold',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
    fontFamily: 'KoHo-Regular',
  },
});

export default PaymentScreen;
