import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, {
  Circle,
  Ellipse,
  Path,
  G,
  Text as SvgText,
} from 'react-native-svg';

interface EmptyNotificationScreenProps {
  onBack?: () => void;
  onMenuPress?: () => void;
  onViewNotifications?: () => void;
}

const { width } = Dimensions.get('window');

// Custom Vector Illustration: Bell with smiling face and "0" badge
const BellEmptyIllustration: React.FC<{ size?: number }> = ({ size = 200 }) => (
  <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    {/* Soft circular aura background */}
    <Circle cx="100" cy="100" r="82" fill="#F8FAFC" />

    {/* Ground drop shadow */}
    <Ellipse cx="100" cy="158" rx="46" ry="7" fill="#EDF2F7" />
    <Ellipse cx="100" cy="156" rx="32" ry="4" fill="#E2E8F0" />

    {/* Soundwaves on top-left */}
    <Path
      d="M 64 68 A 20 20 0 0 0 54 88"
      stroke="#D3DBE8"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <Path
      d="M 52 58 A 34 34 0 0 0 38 88"
      stroke="#E2E8F0"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />

    {/* Bell Clapper (Bottom center) */}
    <Circle cx="100" cy="140" r="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
    <Circle cx="100" cy="140" r="9" fill="#EEF2F6" />

    {/* Bell Body */}
    <G filter="drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.05))">
      {/* Top Handle loop */}
      <Path
        d="M 94 56 C 94 48 106 48 106 56"
        stroke="#E2E8F0"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bell Main Flare Dome */}
      <Path
        d="M 85 76 C 85 62 115 62 115 76 C 115 96 126 118 135 126 C 138 129 136 134 131 134 L 69 134 C 64 134 62 129 65 126 C 74 118 85 96 85 76 Z"
        fill="#FFFFFF"
        stroke="#E2E8F0"
        strokeWidth="1.5"
      />

      {/* Subtle shine highlight */}
      <Path
        d="M 90 76 C 90 70 98 67 104 67"
        stroke="#F1F5F9"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cute smiling mouth */}
      <Path
        d="M 93 103 Q 100 110 107 103"
        stroke="#4A54EC"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </G>

    {/* Circular Blue Badge with "0" */}
    <G>
      <Circle
        cx="132"
        cy="130"
        r="14"
        fill="#5669FF"
        stroke="#FFFFFF"
        strokeWidth="3"
      />
      <SvgText
        x="132"
        y="135"
        fill="#FFFFFF"
        fontSize="13"
        fontWeight="bold"
        textAnchor="middle">
        0
      </SvgText>
    </G>
  </Svg>
);

export const EmptyNotificationScreen: React.FC<EmptyNotificationScreenProps> = ({
  onBack,
  onMenuPress,
  onViewNotifications,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header: Back Button, Title "Notification", 3-dots menu */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={24} color="#120D26" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Notification</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onMenuPress}
            style={styles.headerBtn}>
            <Ionicons name="ellipsis-vertical" size={20} color="#120D26" />
          </TouchableOpacity>
        </View>

        {/* Center Content: Illustration & Empty State Info */}
        <View style={styles.centerContent}>
          <View style={styles.illustrationWrapper}>
            <BellEmptyIllustration size={190} />
          </View>

          <Text style={styles.title}>No Notifications!</Text>

          <Text style={styles.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
            eiusmod tempor
          </Text>

          {/* Action to switch to populated Notification screen for testing */}
          {onViewNotifications && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onViewNotifications}
              style={styles.viewSampleBtn}>
              <Text style={styles.viewSampleText}>Xem danh sách thông báo</Text>
              <Ionicons name="arrow-forward" size={16} color="#5669FF" />
            </TouchableOpacity>
          )}
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
    marginLeft: -4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#120D26',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  illustrationWrapper: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#344457',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#747688',
    textAlign: 'center',
    lineHeight: 23,
    maxWidth: 290,
    paddingHorizontal: 12,
  },
  viewSampleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 28,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#EEF0FF',
    borderRadius: 20,
  },
  viewSampleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5669FF',
  },
});
