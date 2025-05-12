import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Icon name="mail" size={20} color="#999" style={styles.icon} />
      <Text style={styles.title}>Login to Your Account</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="mail" size={20} color="#999" style={styles.icon} />
        <TextInput placeholder="Email" style={styles.input} />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#999" style={styles.icon} />
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Remember Me */}
      <View style={styles.rememberMe}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <Icon
            name={rememberMe ? 'check-square' : 'square'}
            size={20}
            color="#e53935"
          />
        </TouchableOpacity>
        <Text style={styles.rememberMeText}> Remember me</Text>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotText}>
          Forgot <Text style={{ fontWeight: '600' }}>password?</Text>
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
          <FontAwesome name="facebook" size={24} color="#1877F2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="#DB4437" />
        </TouchableOpacity>
      </View>

      {/* Sign Up */}
      <Text style={styles.signupText}>
        Don’t have an account? <Text style={{ color: '#e53935' }}>Sign up</Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  logo: {
    fontSize: 40,
    color: '#e53935',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
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
  icon: {
    marginRight: 8,
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
});
