import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Rect, Path, G } from 'react-native-svg';

interface EmptyEventsScreenProps {
  onBack?: () => void;
  onExploreEvents?: () => void;
  onMenuPress?: () => void;
}

// Vector illustration for Empty Calendar with Clock badge
const CalendarEmptyIllustration: React.FC<{ size?: number }> = ({ size = 150 }) => (
  <Svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    {/* Soft Circular Background */}
    <Circle cx="80" cy="80" r="70" fill="#F4F6F9" />

    {/* Calendar Card Body */}
    <Rect
      x="40"
      y="48"
      width="80"
      height="68"
      rx="10"
      fill="#FFFFFF"
      stroke="#D1D5DB"
      strokeWidth="2"
    />

    {/* Calendar Red Header */}
    <Path
      d="M40 58 C40 52.48 44.48 48 50 48 L110 48 C115.52 48 120 52.48 120 58 L120 68 L40 68 Z"
      fill="#EB5757"
    />

    {/* Calendar Rings / Hangers */}
    <Rect x="54" y="42" width="6" height="12" rx="3" fill="#D1D5DB" />
    <Rect x="100" y="42" width="6" height="12" rx="3" fill="#D1D5DB" />

    {/* Calendar Grid Dots */}
    <G fill="#2F80ED" opacity="0.8">
      <Rect x="52" y="76" width="6" height="6" rx="2" />
      <Rect x="66" y="76" width="6" height="6" rx="2" />
      <Rect x="80" y="76" width="6" height="6" rx="2" />
      <Rect x="94" y="76" width="6" height="6" rx="2" />

      <Rect x="52" y="88" width="6" height="6" rx="2" />
      <Rect x="66" y="88" width="6" height="6" rx="2" />
      <Rect x="80" y="88" width="6" height="6" rx="2" />

      <Rect x="52" y="100" width="6" height="6" rx="2" />
      <Rect x="66" y="100" width="6" height="6" rx="2" />
    </G>

    {/* Clock Badge (Bottom Right) */}
    <Circle cx="106" cy="106" r="22" fill="#FFFFFF" stroke="#E4DFDF" strokeWidth="2" />
    <Circle cx="106" cy="106" r="18" fill="#4FACFE" />
    <Circle cx="106" cy="106" r="14" fill="#FFFFFF" />

    {/* Clock Hands */}
    <Path
      d="M106 97 L106 106 L112 106"
      stroke="#120D26"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const EmptyEventsScreen: React.FC<EmptyEventsScreenProps> = ({
  onBack,
  onExploreEvents,
  onMenuPress,
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header: Back, Title, 3-dots Menu */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={24} color="#120D26" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Events</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onMenuPress}
            style={styles.headerBtn}>
            <Ionicons name="ellipsis-vertical" size={20} color="#120D26" />
          </TouchableOpacity>
        </View>

        {/* Toggle Pill Segment Bar: UPCOMING / PAST EVENTS */}
        <View style={styles.segmentContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('upcoming')}
            style={[
              styles.segmentBtn,
              activeTab === 'upcoming' && styles.segmentBtnActive,
            ]}>
            <Text
              style={[
                styles.segmentText,
                activeTab === 'upcoming' && styles.segmentTextActive,
              ]}>
              UPCOMING
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('past')}
            style={[
              styles.segmentBtn,
              activeTab === 'past' && styles.segmentBtnActive,
            ]}>
            <Text
              style={[
                styles.segmentText,
                activeTab === 'past' && styles.segmentTextActive,
              ]}>
              PAST EVENTS
            </Text>
          </TouchableOpacity>
        </View>

        {/* Empty State Illustration & Description */}
        <View style={styles.emptyContent}>
          <CalendarEmptyIllustration size={160} />

          <Text style={styles.emptyTitle}>
            {activeTab === 'upcoming' ? 'No Upcoming Event' : 'No Past Events'}
          </Text>

          <Text style={styles.emptyDescription}>
            Lorem ipsum dolor sit amet,{'\n'}consectetur
          </Text>
        </View>

        {/* Bottom Button: EXPLORE EVENTS */}
        <View style={styles.bottomBtnWrapper}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onExploreEvents}
            style={styles.exploreBtn}>
            <View style={{ width: 30 }} />
            <Text style={styles.exploreBtnText}>EXPLORE EVENTS</Text>
            <View style={styles.arrowCircle}>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </View>
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
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  headerBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#120D26',
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F4F7',
    borderRadius: 24,
    padding: 4,
    marginTop: 10,
    marginBottom: 40,
  },
  segmentBtn: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#747688',
    letterSpacing: 0.5,
  },
  segmentTextActive: {
    color: '#5669FF',
  },
  emptyContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#120D26',
    marginTop: 28,
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 15,
    color: '#747688',
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomBtnWrapper: {
    paddingTop: 16,
  },
  exploreBtn: {
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
  exploreBtnText: {
    fontSize: 15,
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
