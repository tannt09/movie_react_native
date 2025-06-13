// LIB
import axios from 'axios';
import {useState} from 'react';
import {Alert, View} from 'react-native';
import {
  CardField,
  confirmPayment,
  createPaymentMethod,
} from '@stripe/stripe-react-native';
import {Details} from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput';

// IMPORT
import CustomButton from '@/components/common/CustomButton';

const PaymentCard = () => {
  const [cardDetails, setCardDetails] = useState<Details>();

  const handlePayPress = async () => {
    if (!cardDetails?.complete) {
      Alert.alert('Error', 'Please enter complete card details.');
      return;
    }

    const {paymentMethod, error} = await createPaymentMethod({
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails: {
          email: 'email@stripe.com',
          phone: '+48888000888',
          address: {
            city: 'Houston',
            country: 'US',
            line1: '1459  Circle Drive',
            line2: '',
            postalCode: '77063',
            state: 'Texas',
          },
        },
      },
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      console.log('PaymentMethod ID:', paymentMethod.id);
    }

    console.log('----1111 ', paymentMethod);
    // const response = await axios.post(
    //   'https://your-backend.com/create-payment-intent',
    //   {
    //     amount: 500,
    //   },
    //   {
    //     headers: {'Content-Type': 'application/json'},
    //   },
    // );

    // const {clientSecret} = await response.data;

    // const {paymentIntent, error} = await confirmPayment(clientSecret, {
    //   paymentMethodType: 'Card',
    //   paymentMethodData: {
    //     billingDetails: {
    //       name: 'Test User',
    //     },
    //   },
    // });

    // if (error) {
    //   console.log('Payment failed:', error);
    // } else if (paymentIntent) {
    //   console.log('Payment succeeded:', paymentIntent);
    // }
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        onCardChange={cardDetails => setCardDetails(cardDetails)}
        style={{height: 50, marginVertical: 30}}
      />
      <CustomButton content="Pay" onPress={handlePayPress} />
    </View>
  );
};

export default PaymentCard;
