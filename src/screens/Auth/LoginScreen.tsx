// LIB
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// IMPORT
import MediaIcon from '@assets/icons/ic_logo.svg';
import MailIcon from '@assets/icons/ic_email.svg';
import PassWordIcon from '@assets/icons/ic_password.svg';
import FacebookIcon from '@assets/icons/facebook.svg';
import GoogleIcon from '@assets/icons/google.svg';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checkAccountEmpty, setCheckAccountEmpty] = useState(false);

  useEffect(() => {
    if (email !== '' && password !== '') {
      setCheckAccountEmpty(false);
    } else {
      setCheckAccountEmpty(true);
    }
  }, [email, password]);

  return (
    <View style={styles.container}>
      <MediaIcon style={styles.logoStyle} />
      <Text style={styles.title}>Login to Your Account</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <MailIcon style={{marginEnd: 10}} />
        <TextInput
          value={email}
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => setEmail(text)}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <PassWordIcon style={{marginEnd: 10}} />
        <TextInput
          value={password}
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={styles.input}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {/* Remember Me */}
      <View style={styles.rememberMe}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <Ionicons
            name={rememberMe ? 'check-square' : 'square'}
            size={20}
            color="#e53935"
          />
        </TouchableOpacity>
        <Text style={styles.rememberMeText}> Remember me</Text>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, {opacity: checkAccountEmpty ? 0.5 : 1}]}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotText}>
          Forgot <Text style={{fontWeight: '600'}}>password?</Text>
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>or continue with</Text>
        <View style={styles.line} />
      </View>

      {/* Social Login Buttons */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FacebookIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <GoogleIcon />
        </TouchableOpacity>
      </View>

      {/* Sign Up */}
      <Text style={styles.signupText}>
        Don’t have an account? <Text style={{color: '#e53935'}}>Sign up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 20,
    fontWeight: '500',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 48,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 2,
  },
  rememberMeText: {
    marginLeft: 6,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#e53935',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    marginVertical: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
  forgotText: {
    color: '#e53935',
    textAlign: 'center',
    marginTop: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 8,
    color: '#999',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  signupText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },
  logoStyle: {alignSelf: 'center', marginBottom: 30},
});

export default LoginScreen;
