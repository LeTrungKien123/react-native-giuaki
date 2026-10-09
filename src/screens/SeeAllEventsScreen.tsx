import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface SeeAllEventsScreenProps {
  onBack?: () => void;
  onSearchPress?: () => void;
  onSelectEvent?: (eventId: string) => void;
  onMenuPress?: () => void;
}

interface EventListItem {
  id: string;
  dateTime: string;
  title: string;
  location: string;
  gradientColors: [string, string, ...string[]];
  iconName: keyof typeof Ionicons.glyphMap;
}

const EVENTS_LIST: EventListItem[] = [
  {
    id: '1',
    dateTime: 'Wed, Apr 28 • 5:30 PM',
    title: 'Jo Malone London’s Mother’s Day Presents',
    location: 'Radius Gallery • Santa Cruz, CA',
    gradientColors: ['#FFA07A', '#FF6347'],
    iconName: 'sparkles',
  },
  {
    id: '2',
    dateTime: 'Sat, May 1 • 2:00 PM',
    title: 'A Virtual Evening of Smooth Jazz',
    location: 'Lot 13 • Oakland, CA',
    gradientColors: ['#1A1443', '#4A43EC'],
    iconName: 'musical-notes',
  },
  {
    id: '3',
    dateTime: 'Sat, Apr 24 • 1:30 PM',
    title: 'Women’s Leadership Conference 2021',
    location: '53 Bush St • San Francisco, CA',
    gradientColors: ['#8A2387', '#E94057'],
    iconName: 'people',
  },
  {
    id: '4',
    dateTime: 'Fri, Apr 23 • 6:00 PM',
    title: 'International Kids Safe Parents Night Out',
    location: 'Lot 13 • Oakland, CA',
    gradientColors: ['#2193B0', '#6DD5ED'],
    iconName: 'happy',
  },
  {
    id: '5',
    dateTime: 'Mon, Jun 21 • 10:00 PM',
    title: 'Collectivity Plays the Music of Jimi',
    location: 'Longboard Margarita Bar',
    gradientColors: ['#3A7BD5', '#3A6073'],
    iconName: 'headset',
  },
  {
    id: '6',
    dateTime: 'Sun, Apr 25 • 10:15 AM',
    title: 'International Gala Music Festival',
    location: '36 Guild Street London, UK',
    gradientColors: ['#11998E', '#38EF7D'],
    iconName: 'musical-note',
  },
];

export const SeeAllEventsScreen: React.FC<SeeAllEventsScreenProps> = ({
  onBack,
  onSearchPress,
  onSelectEvent,
  onMenuPress,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header: Back, Title "Events", Search & 3-dots */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onBack}
              style={styles.headerBtn}>
              <Ionicons name="arrow-back" size={24} color="#120D26" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Events</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onSearchPress}
              style={styles.headerBtn}>
              <Ionicons name="search-outline" size={22} color="#120D26" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onMenuPress}
              style={styles.headerBtn}>
              <Ionicons name="ellipsis-vertical" size={20} color="#120D26" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Events List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}>
          {EVENTS_LIST.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              onPress={() => onSelectEvent?.(item.id)}
              style={styles.card}>
              {/* Thumbnail Image */}
              <LinearGradient
                colors={item.gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.thumbnail}>
                <Ionicons name={item.iconName} size={28} color="#FFFFFF" />
              </LinearGradient>

              {/* Event Details */}
              <View style={styles.cardInfo}>
                <Text style={styles.dateTimeText}>{item.dateTime}</Text>
                <Text style={styles.eventTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location-sharp" size={13} color="#747688" />
                  <Text style={styles.locationText} numberOfLines={1}>
                    {item.location}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  listContent: {
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 14,
  },
  dateTimeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#5669FF',
    marginBottom: 3,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#120D26',
    lineHeight: 19,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 11,
    color: '#747688',
    flex: 1,
  },
});
