import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { EventHubLogo } from '../components/EventHubLogo';

interface SplashScreenProps {
  onContinue?: () => void;
}

const { width, height } = Dimensions.get('window');

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  return (
    <View style={styles.container}>
      {/* Background Soft Pastel Glows */}
      <View style={styles.glowTopRight} />
      <View style={styles.glowCenter} />

      <SafeAreaView style={styles.safeArea}>
        {/* Status Bar Indicator */}
        <View style={styles.statusBar}>
          <Text style={styles.timeText}>9:41</Text>
          <View style={styles.statusIcons}>
            <Ionicons name="cellular" size={14} color="#120D26" />
            <Ionicons name="wifi" size={14} color="#120D26" />
            <Ionicons name="battery-full" size={18} color="#120D26" />
          </View>
        </View>

        {/* Center Logo */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onContinue}
          style={styles.logoCenterContainer}>
          <EventHubLogo size={56} layout="horizontal" />
        </TouchableOpacity>

        {/* Bottom subtle indicator */}
        <View style={styles.bottomHint}>
          <TouchableOpacity onPress={onContinue} style={styles.continuePill}>
            <Text style={styles.continueText}>Tap to Start</Text>
            <Ionicons name="arrow-forward" size={14} color="#5669FF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  glowTopRight: {
    position: 'absolute',
    top: -50,
    right: -40,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(235, 87, 87, 0.06)',
  },
  glowCenter: {
    position: 'absolute',
    top: height * 0.35,
    right: -60,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(86, 105, 255, 0.08)',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 8,
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
  logoCenterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  bottomHint: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  continuePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(86, 105, 255, 0.08)',
  },
  continueText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5669FF',
  },
});
