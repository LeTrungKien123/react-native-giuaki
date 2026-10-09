import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Circle,
  Path,
} from 'react-native-svg';

interface EventHubLogoProps {
  size?: number;
  layout?: 'horizontal' | 'vertical';
  showText?: boolean;
}

export const EventHubLogoIcon: React.FC<{ size?: number }> = ({ size = 44 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <Defs>
        <LinearGradient id="eventHubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#00F8FF" />
          <Stop offset="30%" stopColor="#00C9FF" />
          <Stop offset="70%" stopColor="#5669FF" />
          <Stop offset="100%" stopColor="#4A43EC" />
        </LinearGradient>
      </Defs>

      {/* Outer Glow / Ring */}
      <Circle
        cx="50"
        cy="50"
        r="44"
        stroke="url(#eventHubGrad)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeDasharray="210 60"
        strokeDashoffset="-20"
      />

      {/* Inner stylized 'e' swirl curve */}
      <Path
        d="M 50 24 
           C 66 24, 76 34, 76 50 
           C 76 54, 73 57, 68 57 
           L 32 57 
           C 33 67, 41 74, 52 74 
           C 60 74, 66 70, 70 65
           C 71.5 63, 74 63, 76 65
           C 77.5 67, 77 70, 74 74
           C 68 81, 59 86, 50 86
           C 30 86, 18 70, 18 50
           C 18 30, 31 16, 50 16
           C 62 16, 73 22, 80 32
           C 82 35, 80 38, 77 39
           C 74 40, 72 38, 70 35
           C 65 28, 58 24, 50 24 Z
           M 33 46 
           L 65 46 
           C 64 36, 58 31, 50 31 
           C 41 31, 35 37, 33 46 Z"
        fill="url(#eventHubGrad)"
      />
    </Svg>
  );
};

export const EventHubLogo: React.FC<EventHubLogoProps> = ({
  size = 46,
  layout = 'horizontal',
  showText = true,
}) => {
  if (layout === 'vertical') {
    return (
      <View style={styles.verticalContainer}>
        <EventHubLogoIcon size={size * 1.3} />
        {showText && (
          <Text style={[styles.brandText, styles.verticalText]}>
            <Text style={styles.brandPrimary}>Event</Text>
            <Text style={styles.brandSecondary}>Hub</Text>
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.horizontalContainer}>
      <EventHubLogoIcon size={size} />
      {showText && (
        <Text style={styles.brandText}>
          <Text style={styles.brandPrimary}>vent</Text>
          <Text style={styles.brandSecondary}>Hub</Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verticalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  brandText: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  verticalText: {
    fontSize: 32,
    marginTop: 4,
  },
  brandPrimary: {
    color: '#120D26',
    fontWeight: '800',
  },
  brandSecondary: {
    color: '#00F8FF',
    fontWeight: '800',
  },
});
