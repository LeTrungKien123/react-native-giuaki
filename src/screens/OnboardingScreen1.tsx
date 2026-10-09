import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { HomeExploreMockup } from '../components/onboarding/MockupScreens';
import { OnboardingBottomSheet } from '../components/onboarding/OnboardingBottomSheet';

interface OnboardingScreen1Props {
  onSkip?: () => void;
  onNext?: () => void;
}

const { height } = Dimensions.get('window');

export const OnboardingScreen1: React.FC<OnboardingScreen1Props> = ({
  onSkip,
  onNext,
}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topArea} edges={['top']}>
        {/* Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.timeText}>9:41</Text>
          <View style={styles.statusIcons}>
            <Ionicons name="cellular" size={14} color="#120D26" />
            <Ionicons name="wifi" size={14} color="#120D26" />
            <Ionicons name="battery-full" size={18} color="#120D26" />
          </View>
        </View>

        {/* Mockup Preview */}
        <View style={styles.mockupWrapper}>
          <HomeExploreMockup />
        </View>
      </SafeAreaView>

      {/* Bottom Sheet */}
      <OnboardingBottomSheet
        title={`Explore Upcoming and\nNearby Events`}
        subtitle="In publishing and graphic design, Lorem is a placeholder text commonly"
        activeIndex={0}
        onSkip={onSkip}
        onNext={onNext}
        nextLabel="Next"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    justifyContent: 'space-between',
  },
  topArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 4,
    marginBottom: 8,
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
  mockupWrapper: {
    flex: 1,
    marginTop: 4,
    marginBottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
