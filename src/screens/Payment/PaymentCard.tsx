// LIB
import axios from 'axios';
import {useState} from 'react';
import {Alert, View} from 'react-native';
import {
  CardField,
  confirmPayment,
  createPaymentMethod,
  handleNextAction,
} from '@stripe/stripe-react-native';
import {Details} from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput';
import {Result} from '@stripe/stripe-react-native/lib/typescript/src/types/PaymentMethod';

// IMPORT
import CustomButton from '@/components/common/CustomButton';
import {isNullOrEmpty} from '@/utils/checkEmpty';

const PaymentCard = () => {
  const [cardDetails, setCardDetails] = useState<Details>();

  const onCreatePaymentMethod = async () => {
    try {
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

      return {
        paymentMethod,
        error,
      };
    } catch (error) {
      throw error;
    }
  };

  const onCreatePaymentIntent = async ({
    amount,
    paymentMethod,
  }: {
    amount: number;
    paymentMethod: Result;
  }) => {
    try {
      const response = await axios.post(
        'http://10.86.142.57:3000/payment/create-payment-intent',
        {
          amount: amount,
          payment_method_id: paymentMethod.id,
        },
        {
          headers: {'Content-Type': 'application/json'},
        },
      );
      const {clientSecret, status, requiresAction} = response.data;

      return {
        clientSecret,
        status,
        requiresAction,
      };
    } catch (error) {
      throw error;
    }
  };

  const handlePayPress = async () => {
    try {
      // Check card details complete
      if (!cardDetails?.complete) {
        Alert.alert('Error', 'Please enter complete card details!');
        return;
      }

      const {paymentMethod, error} = await onCreatePaymentMethod();

      if (error || !paymentMethod) {
        Alert.alert('Error when create payment method', error?.message);
        return;
      }

      const {clientSecret, status, requiresAction} =
        await onCreatePaymentIntent({
          amount: 500,
          paymentMethod: paymentMethod,
        });

      // Check if payment requires action
      if (!isNullOrEmpty(clientSecret) && requiresAction !== true) {
        Alert.alert('Success!: The payment was confirmed successfully!');
        return;
      }

      // Handle if payment requires action
      const paymentIntent = await handleNextAction(clientSecret);

      if (!paymentIntent.paymentIntent?.id) {
        Alert.alert('Handle next action faild!');
        return;
      }

      const paymentData = await confirmPayment(paymentIntent.paymentIntent.id);

      if (paymentData.error) {
        console.log('Payment failed:', paymentData.error);
      } else if (paymentData.paymentIntent) {
        console.log('Payment succeeded:', paymentData.paymentIntent);
      }
    } catch (err) {
      let errorMessage = 'Something went wrong';

      if (axios.isAxiosError(err)) {
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else {
          errorMessage = err.message;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      Alert.alert('Payment failed: ', errorMessage);
    }
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
