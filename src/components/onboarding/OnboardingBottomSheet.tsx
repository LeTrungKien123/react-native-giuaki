import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface OnboardingBottomSheetProps {
  title: string;
  subtitle?: string;
  activeIndex: 0 | 1 | 2;
  onSkip?: () => void;
  onNext?: () => void;
  nextLabel?: string;
}

export const OnboardingBottomSheet: React.FC<OnboardingBottomSheetProps> = ({
  title,
  subtitle = 'In publishing and graphic design, Lorem is a placeholder text commonly',
  activeIndex,
  onSkip,
  onNext,
  nextLabel = 'Next',
}) => {
  return (
    <View style={styles.sheetContainer}>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Subtitle description */}
      <Text style={styles.subtitle}>{subtitle}</Text>

      {/* Bottom controls row */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSkip}
          style={styles.actionBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* 3 Pagination Dots */}
        <View style={styles.dotsRow}>
          {[0, 1, 2].map((idx) => {
            const isActive = idx === activeIndex;
            return (
              <View
                key={idx}
                style={[styles.dot, isActive ? styles.activeDot : styles.inactiveDot]}
              />
            );
          })}
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onNext}
          style={styles.actionBtn}>
          <Text style={styles.nextText}>{nextLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: '#5669FF',
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    paddingTop: 34,
    paddingBottom: 32,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 250,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 12,
    paddingHorizontal: 16,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 28,
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  nextText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 22,
    backgroundColor: '#FFFFFF',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});
