// LIB
import {useState} from 'react';
import {ScrollView, Switch, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';

// IMPORT
import Logo from '@assets/icons/ic_logo.svg';
import Premium from '@assets/icons/ic_ premium.svg';
import {navigate} from '@/navigation/navigationService';
import {COLORS} from '@/constants/colors';

const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Logo width={26} height={26} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>Flutter Dev</Text>
          <Text style={styles.email}>flutter@gmail.com</Text>
        </View>
      </View>

      {/* Premium */}
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => navigate('PaymentScreen')}>
        <View style={styles.premiumBox}>
          <Premium width={50} height={50} />
          <View style={styles.premiumContent}>
            <Text style={styles.premiumTitle}>Join Premium!</Text>
            <Text style={styles.premiumDesc}>
              Enjoy watching Full-HD movies, without restrictions and without
              ads
            </Text>
          </View>
          <Feather name={'chevron-right'} size={26} color="#000" />
        </View>
      </TouchableOpacity>

      <View style={styles.menu}>
        {[
          {label: 'Edit Profile', icon: 'user'},
          {label: 'Notification', icon: 'bell'},
          {label: 'Download', icon: 'download'},
          {label: 'Security', icon: 'lock'},
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.row}>
              <Feather name={item.icon} size={26} />
              <Text style={styles.menuText}>{item.label}</Text>
            </View>
            <Feather name="chevron-right" size={26} />
          </TouchableOpacity>
        ))}

        <View style={styles.itemLanguage}>
          <View style={styles.row}>
            <Feather name="globe" size={26} />
            <Text style={styles.menuText}>Language</Text>
          </View>
          <View style={{flex: 1}} />
          <Text style={styles.menuValue}>English(US)</Text>
          <Feather name="chevron-right" size={26} />
        </View>

        <View style={styles.menuItem}>
          <View style={styles.row}>
            <Feather name="moon" size={26} />
            <Text style={styles.menuText}>Dark Mode</Text>
          </View>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
        </View>

        {[
          {label: 'Help Center', icon: 'help-circle'},
          {label: 'Privacy Policy', icon: 'shield'},
          {label: 'Log out', icon: 'log-out'},
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.row}>
              <Feather name={item.icon} size={26} />
              <Text style={styles.menuText}>{item.label}</Text>
            </View>
            <Feather name="chevron-right" size={26} />
          </TouchableOpacity>
        ))}
      </View>
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
  header: {flex: 1, marginBottom: 16, marginTop: 10},
  userInfo: {flex: 1, alignItems: 'center', marginTop: 20},
  name: {fontSize: 22, fontFamily: 'KoHo-SemiBold'},
  email: {fontSize: 18, color: COLORS.GRAY, fontFamily: 'KoHo-Medium'},
  premiumBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'red',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 24,
    marginBottom: 16,
  },
  premiumContent: {flex: 1, marginStart: 16, marginEnd: 20},
  premiumTitle: {color: 'red', fontSize: 20, fontFamily: 'KoHo-SemiBold'},
  premiumDesc: {
    marginTop: 4,
    fontSize: 16,
    color: COLORS.GRAY,
    fontFamily: 'KoHo-Medium',
  },
  menu: {marginTop: 8},
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  menuText: {marginLeft: 12, fontSize: 18, fontFamily: 'KoHo-SemiBold'},
  menuValue: {color: COLORS.GRAY},
});

export default ProfileScreen;
