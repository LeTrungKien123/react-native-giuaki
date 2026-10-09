import React, { useState } from 'react';
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

interface ResetPasswordScreenProps {
  onBack?: () => void;
  onSendSuccess?: (email: string) => void;
}

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  onBack,
  onSendSuccess,
}) => {
  const [email, setEmail] = useState('');

  const handleSend = () => {
    if (!email.trim()) {
      Alert.alert('Notice', 'Please enter your email address.');
      return;
    }
    Alert.alert(
      'Reset Link Sent',
      `A password reset link has been sent to ${email}. Check your inbox!`
    );
    onSendSuccess?.(email);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
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
        <Text style={styles.title}>Resset Password</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Please enter your email address to{'\n'}request a password reset
        </Text>

        {/* Email Input */}
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
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />
        </View>

        {/* SEND Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSend}
          style={styles.sendButton}>
          <View style={{ width: 30 }} />
          <Text style={styles.sendButtonText}>SEND</Text>
          <View style={styles.arrowCircle}>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
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
    marginBottom: 26,
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
    marginBottom: 28,
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
  sendButton: {
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
  sendButtonText: {
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
});
