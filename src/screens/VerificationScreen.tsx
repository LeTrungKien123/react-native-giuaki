import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface VerificationScreenProps {
  email?: string;
  phoneNumber?: string;
  onBack?: () => void;
  onVerifySuccess?: () => void;
}

export const VerificationScreen: React.FC<VerificationScreenProps> = ({
  email,
  phoneNumber = '+1 2620 0323 7631',
  onBack,
  onVerifySuccess,
}) => {
  // Empty code boxes by default
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(20);

  // Single ref holding array of native text inputs (prevents hook rule violation)
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Target destination to display: either entered email or phone number
  const targetDestination = email || phoneNumber;

  // Reset OTP whenever email changes
  useEffect(() => {
    setOtp(['', '', '', '']);
    setFocusedIndex(0);
    setTimerSeconds(20);
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 150);
    return () => clearTimeout(timer);
  }, [email]);

  // Countdown timer for resend
  useEffect(() => {
    if (timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerSeconds]);

  // Handle text input changes for each box
  const handleOtpChange = (text: string, index: number) => {
    // Only accept numeric digits
    const cleaned = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];

    if (cleaned.length > 0) {
      newOtp[index] = cleaned[cleaned.length - 1];
      setOtp(newOtp);

      // Auto advance to next box
      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  // Handle backspace when input is already empty
  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleContinue = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length < 4) {
      Alert.alert('Notice', 'Please enter the complete 4-digit code.');
      return;
    }
    Alert.alert('Success', `Verification code ${fullOtp} verified for ${targetDestination}!`);
    onVerifySuccess?.();
  };

  const handleResend = () => {
    if (timerSeconds > 0) return;
    setTimerSeconds(20);
    Alert.alert('Code Sent', `A new verification code has been sent to ${targetDestination}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topContainer}>
        {/* Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.timeText}>9:41</Text>
          <View style={styles.statusIcons}>
            <Ionicons name="cellular" size={14} color="#120D26" />
            <Ionicons name="wifi" size={14} color="#120D26" />
            <Ionicons name="battery-full" size={18} color="#120D26" />
          </View>
        </View>

        {/* Back Arrow */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#120D26" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Verification</Text>

        {/* Subtitle with dynamic target name */}
        <Text style={styles.subtitle}>
          We’ve send you the verification{'\n'}code on{' '}
          <Text style={styles.targetHighlight}>{targetDestination}</Text>
        </Text>

        {/* 4 OTP Native Input Boxes */}
        <View style={styles.otpRow}>
          {[0, 1, 2, 3].map((index) => {
            const digit = otp[index];
            const isActive = index === focusedIndex;

            return (
              <TextInput
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                style={[
                  styles.otpBox,
                  isActive && styles.otpBoxActive,
                  digit ? styles.otpBoxFilled : null,
                ]}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                textAlignVertical="center"
                value={digit}
                placeholder="—"
                placeholderTextColor="#C4C4C4"
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                onFocus={() => setFocusedIndex(index)}
              />
            );
          })}
        </View>

        {/* CONTINUE Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleContinue}
          style={styles.continueButton}>
          <View style={{ width: 30 }} />
          <Text style={styles.continueButtonText}>CONTINUE</Text>
          <View style={styles.arrowCircle}>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* Resend Timer */}
        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Re-send code in </Text>
          <TouchableOpacity onPress={handleResend} disabled={timerSeconds > 0}>
            <Text style={styles.resendTimer}>
              0:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topContainer: {
    paddingHorizontal: 28,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#747688',
    lineHeight: 22,
    marginBottom: 28,
  },
  targetHighlight: {
    color: '#120D26',
    fontWeight: '600',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 36,
  },
  otpBox: {
    width: 55,
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    backgroundColor: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    color: '#120D26',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 0,
    includeFontPadding: false,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  otpBoxActive: {
    borderColor: '#5669FF',
    borderWidth: 1.5,
    backgroundColor: '#F9FAFF',
  },
  otpBoxFilled: {
    borderColor: '#E4DFDF',
    backgroundColor: '#FFFFFF',
  },
  continueButton: {
    height: 56,
    backgroundColor: '#5669FF',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    shadowColor: '#5669FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  continueButtonText: {
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
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  resendText: {
    fontSize: 14,
    color: '#120D26',
  },
  resendTimer: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5669FF',
  },
});
