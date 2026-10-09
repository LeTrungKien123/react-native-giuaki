import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface SearchScreenProps {
  onBack?: () => void;
  onFilterPress?: () => void;
  onSelectEvent?: (eventId: string) => void;
}

interface SearchEventItem {
  id: string;
  title: string;
  dateTime: string;
  gradientColors: [string, string, ...string[]];
  iconName: keyof typeof Ionicons.glyphMap;
}

const SEARCH_RESULTS: SearchEventItem[] = [
  {
    id: '1',
    title: 'A virtual evening of smooth jazz',
    dateTime: '1ST MAY- SAT -2:00 PM',
    gradientColors: ['#1A1443', '#4A43EC'],
    iconName: 'musical-notes',
  },
  {
    id: '2',
    title: 'Jo malone london’s mother’s day',
    dateTime: '1ST MAY- SAT -2:00 PM',
    gradientColors: ['#FFA07A', '#FF6347'],
    iconName: 'sparkles',
  },
  {
    id: '3',
    title: 'Women’s leadership conference',
    dateTime: '1ST MAY- SAT -2:00 PM',
    gradientColors: ['#8A2387', '#E94057'],
    iconName: 'people',
  },
  {
    id: '4',
    title: 'International kids safe parents night out',
    dateTime: '1ST MAY- SAT -2:00 PM',
    gradientColors: ['#2193B0', '#6DD5ED'],
    iconName: 'happy',
  },
  {
    id: '5',
    title: 'International gala music festival',
    dateTime: '1ST MAY- SAT -2:00 PM',
    gradientColors: ['#11998E', '#38EF7D'],
    iconName: 'musical-note',
  },
];

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onBack,
  onFilterPress,
  onSelectEvent,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter events based on search query
  const filteredEvents = SEARCH_RESULTS.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header: Back Arrow & Title */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#120D26" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search</Text>
        </View>

        {/* Search Input Bar with Filter Button */}
        <View style={styles.searchBarRow}>
          <View style={styles.searchBarContainer}>
            <Ionicons name="search-outline" size={20} color="#5669FF" />
            <Text style={styles.divider}>|</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#747688"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="#747688" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onFilterPress}
            style={styles.filterBtn}>
            <Ionicons name="options-outline" size={16} color="#FFFFFF" />
            <Text style={styles.filterBtnText}>Filters</Text>
          </TouchableOpacity>
        </View>

        {/* Results List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}>
          {filteredEvents.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              onPress={() => onSelectEvent?.(item.id)}
              style={styles.eventCard}>
              {/* Thumbnail Image */}
              <LinearGradient
                colors={item.gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.thumbnail}>
                <Ionicons name={item.iconName} size={28} color="#FFFFFF" />
              </LinearGradient>

              {/* Event Info */}
              <View style={styles.eventInfo}>
                <Text style={styles.dateTimeText}>{item.dateTime}</Text>
                <Text style={styles.eventTitle} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {filteredEvents.length === 0 && (
            <View style={styles.emptyResults}>
              <Ionicons name="search-outline" size={48} color="#D1D5DB" />
              <Text style={styles.emptyText}>No events match your search</Text>
            </View>
          )}
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
    gap: 12,
    paddingVertical: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#120D26',
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    marginTop: 4,
  },
  searchBarContainer: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  divider: {
    fontSize: 18,
    color: '#E4DFDF',
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#120D26',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5669FF',
    height: 48,
    borderRadius: 14,
    paddingHorizontal: 14,
    gap: 6,
    shadowColor: '#5669FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  filterBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  listContainer: {
    paddingBottom: 24,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  thumbnail: {
    width: 68,
    height: 68,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventInfo: {
    flex: 1,
    marginLeft: 14,
  },
  dateTimeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#5669FF',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#120D26',
    lineHeight: 20,
  },
  emptyResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#747688',
    fontWeight: '500',
  },
});
