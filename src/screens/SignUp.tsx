import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RoundedButton from '../Index/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {authService} from '../services/api';

type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const SignUp = ({navigation}: SignUpScreenProps) => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleSignUp = async () => {
    const {username, firstName, lastName, email, password, confirmPassword} = formData;

    if (!username || !firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await authService.signUp({
        username,
        firstName,
        lastName,
        email,
        password,
      });
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('SignIn');
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to create account. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#f8f9fa', '#e9ecef']} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.card}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                placeholder="Choose a username"
                style={styles.input}
                placeholderTextColor="#adb5bd"
                value={formData.username}
                onChangeText={value => handleInputChange('username', value)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.row}>
              <View style={styles.halfInputContainer}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  placeholder="Enter first name"
                  style={styles.input}
                  placeholderTextColor="#adb5bd"
                  value={formData.firstName}
                  onChangeText={value => handleInputChange('firstName', value)}
                />
              </View>
              <View style={styles.halfInputContainer}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  placeholder="Enter last name"
                  style={styles.input}
                  placeholderTextColor="#adb5bd"
                  value={formData.lastName}
                  onChangeText={value => handleInputChange('lastName', value)}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="Enter your email"
                style={styles.input}
                placeholderTextColor="#adb5bd"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={value => handleInputChange('email', value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Create a password"
                style={styles.input}
                secureTextEntry
                placeholderTextColor="#adb5bd"
                value={formData.password}
                onChangeText={value => handleInputChange('password', value)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                placeholder="Retype your password"
                style={styles.input}
                secureTextEntry
                placeholderTextColor="#adb5bd"
                value={formData.confirmPassword}
                onChangeText={value => handleInputChange('confirmPassword', value)}
              />
            </View>
            <View style={styles.buttonContainer}>
              <RoundedButton
                title={loading ? 'Creating Account...' : 'Create Account'}
                onPress={handleSignUp}
              />
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.footerLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  halfInputContainer: {
    flex: 1,
    marginBottom: 24,
    marginHorizontal: 4,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonContainer: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#495057',
    fontSize: 16,
  },
  footerLink: {
    color: '#495057',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default SignUp;
