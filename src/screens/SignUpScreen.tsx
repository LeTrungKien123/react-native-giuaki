import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

interface SignUpScreenProps {
  onBack?: () => void;
  onSignIn?: () => void;
  onSignUpSuccess?: (email: string) => void;
}

// Google official colored vector icon
const GoogleIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48">
    <Path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <Path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <Path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <Path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </Svg>
);

// Facebook official blue 'f' icon
const FacebookIcon: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="#1877F2"
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    />
  </Svg>
);

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onBack,
  onSignIn,
  onSignUpSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    if (!fullName.trim()) {
      Alert.alert('Notice', 'Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Notice', 'Please enter your email.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Notice', 'Please enter your password.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Notice', 'Passwords do not match.');
      return;
    }
    onSignUpSuccess?.(email);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Background Soft Glow */}
      <View style={styles.glowBottomRight} />

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.timeText}>9:41</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="cellular" size={14} color="#120D26" />
          <Ionicons name="wifi" size={14} color="#120D26" />
          <Ionicons name="battery-full" size={18} color="#120D26" />
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Back Arrow */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#120D26" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>Sign up</Text>

          {/* Input 1: Full name */}
          <View style={styles.inputWrapper}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#807A7A"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Full name"
              placeholderTextColor="#747688"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Input 2: Email */}
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#807A7A"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="abc@email.com"
              placeholderTextColor="#747688"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Input 3: Password */}
          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#807A7A"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Your password"
              placeholderTextColor="#747688"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#807A7A"
              />
            </TouchableOpacity>
          </View>

          {/* Input 4: Confirm Password */}
          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#807A7A"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Confirm password"
              placeholderTextColor="#747688"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeBtn}>
              <Ionicons
                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#807A7A"
              />
            </TouchableOpacity>
          </View>

          {/* SIGN UP Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSignUp}
            style={styles.signUpButton}>
            <View style={{ width: 30 }} />
            <Text style={styles.signUpButtonText}>SIGN UP</Text>
            <View style={styles.arrowCircle}>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          {/* OR Divider */}
          <View style={styles.orDivider}>
            <Text style={styles.orText}>OR</Text>
          </View>

          {/* Social Logins */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => Alert.alert('Google', 'Sign up with Google...')}
            style={styles.socialBtn}>
            <GoogleIcon size={20} />
            <Text style={styles.socialBtnText}>Login with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => Alert.alert('Facebook', 'Sign up with Facebook...')}
            style={styles.socialBtn}>
            <FacebookIcon size={22} />
            <Text style={styles.socialBtnText}>Login with Facebook</Text>
          </TouchableOpacity>

          {/* Already have an account footer */}
          <View style={styles.footerRow}>
            <Text style={styles.footerPrompt}>Already have an account? </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={onSignIn}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  glowBottomRight: {
    position: 'absolute',
    bottom: -60,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(86, 105, 255, 0.08)',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 4,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#120D26',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scrollContent: {
    paddingHorizontal: 28,
    paddingBottom: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: -4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#120D26',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#120D26',
  },
  eyeBtn: {
    padding: 6,
  },
  signUpButton: {
    height: 56,
    backgroundColor: '#5669FF',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 6,
    shadowColor: '#5669FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  arrowCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3D56F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orDivider: {
    alignItems: 'center',
    marginVertical: 18,
  },
  orText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#9D9898',
  },
  socialBtn: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  socialBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#120D26',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  footerPrompt: {
    fontSize: 14,
    color: '#120D26',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5669FF',
  },
});
