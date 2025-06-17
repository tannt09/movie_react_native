// LIB
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

// IMPORT
import Premium from '@assets/icons/ic_premium.svg';
import {navigate} from '@/navigation/navigationService';

const PremiumCard = ({price, period}: {price: string; period: string}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigate('PaymentMethodScreen')}>
      <View style={{alignItems: 'center'}}>
        <Premium width={50} height={50} />
      </View>
      <View style={styles.priceRow}>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.period}>/{period}</Text>
      </View>
      <View style={styles.divider} />

      {[
        'Watch all you want. Ad-free.',
        'Allows streaming of 4K.',
        'Video & Audio Quality is Better.',
      ].map((item, idx) => (
        <View key={idx} style={styles.featureRow}>
          <Text style={styles.check}>✔</Text>
          <Text style={styles.featureText}>{item}</Text>
        </View>
      ))}
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 30,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  price: {
    fontSize: 28,
    fontFamily: 'KoHo-Bold',
  },
  period: {
    fontSize: 16,
    color: '#888',
    marginLeft: 4,
    fontFamily: 'KoHo-Medium',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  check: {
    color: 'red',
    marginRight: 8,
    fontSize: 16,
  },
  featureText: {
    fontSize: 15,
    color: '#444',
    fontFamily: 'KoHo-Medium',
  },
});

export default PremiumCard;
