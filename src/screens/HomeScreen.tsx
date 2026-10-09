import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Event1Image = require('../../assets/images/Event1.png');
const Event2Image = require('../../assets/images/Event2.png');
const Event3Image = require('../../assets/images/Event3.png');

const ATTENDEE_AVATARS = [
  require('../../assets/images/Oval Copy 4.png'),
  require('../../assets/images/Oval Copy.png'),
  require('../../assets/images/Oval.png'),
];

interface HomeScreenProps {
  onOpenMenu?: () => void;
  onNotificationPress?: () => void;
  onEventPress?: (eventId: string) => void;
  onNavigateToMap?: () => void;
  onSearchPress?: () => void;
  onFilterPress?: () => void;
  onSeeAllEvents?: () => void;
  onEventsTabPress?: () => void;
  onProfilePress?: () => void;
  onInvitePress?: () => void;
}

const { width } = Dimensions.get('window');

interface EventItem {
  id: string;
  title: string;
  dateDay: string;
  dateMonth: string;
  image?: any;
  gradientColors: [string, string, ...string[]];
  attendeesCount: string;
  location: string;
  bookmarked: boolean;
}

const UPCOMING_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'International Band Mu...',
    dateDay: '10',
    dateMonth: 'JUNE',
    image: Event1Image,
    gradientColors: ['#FFC371', '#FF5F6D'],
    attendeesCount: '+20 Going',
    location: '36 Guild Street London, UK',
    bookmarked: true,
  },
  {
    id: '2',
    title: 'Jo Malone London’s...',
    dateDay: '10',
    dateMonth: 'JUNE',
    image: Event2Image,
    gradientColors: ['#4FACFE', '#00F2FE'],
    attendeesCount: '+20 Going',
    location: 'Radius Gallery London, UK',
    bookmarked: false,
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenMenu,
  onNotificationPress,
  onEventPress,
  onNavigateToMap,
  onSearchPress,
  onFilterPress,
  onSeeAllEvents,
  onEventsTabPress,
  onProfilePress,
  onInvitePress,
}) => {
  const [activeTab, setActiveTab] = useState<'explore' | 'events' | 'map' | 'profile'>('explore');
  const [selectedCategory, setSelectedCategory] = useState('sports');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Scrollable Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Blue Curved Upper Header */}
        <View style={styles.blueHeader}>
          <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
            {/* Status Bar */}
            <View style={styles.statusBar}>
              <Text style={styles.statusTime}>9:41</Text>
              <View style={styles.statusIcons}>
                <Ionicons name="cellular" size={14} color="#FFFFFF" />
                <Ionicons name="wifi" size={14} color="#FFFFFF" />
                <Ionicons name="battery-full" size={18} color="#FFFFFF" />
              </View>
            </View>

            {/* Header Top Row */}
            <View style={styles.headerTopRow}>
              {/* Hamburger Menu Trigger */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onOpenMenu}
                style={styles.menuIconBtn}>
                <Ionicons name="menu-outline" size={26} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Current Location */}
              <View style={styles.locationWrapper}>
                <View style={styles.locationLabelRow}>
                  <Text style={styles.locationLabel}>Current Location</Text>
                  <Ionicons name="caret-down" size={10} color="#D2D6FF" />
                </View>
                <Text style={styles.locationCity}>New York, USA</Text>
              </View>

              {/* Notification Bell */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onNotificationPress}
                style={styles.notifBtn}>
                <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
                <View style={styles.notifDot} />
              </TouchableOpacity>
            </View>

            {/* Search & Filter Bar */}
            <View style={styles.searchRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onSearchPress}
                style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} color="#FFFFFF" style={{ opacity: 0.8 }} />
                <Text style={styles.searchDivider}>|</Text>
                <Text style={styles.searchInputPlaceholder}>Search...</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onFilterPress}
                style={styles.filtersBtn}>
                <Ionicons name="options-outline" size={18} color="#FFFFFF" />
                <Text style={styles.filtersText}>Filters</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        {/* Floating Category Pills */}
        <View style={styles.categoriesWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}>
            {/* Sports */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedCategory('sports')}
              style={[
                styles.categoryPill,
                { backgroundColor: '#F0635A' },
                selectedCategory === 'sports' && styles.categoryPillActive,
              ]}>
              <Ionicons name="basketball-outline" size={16} color="#FFFFFF" />
              <Text style={styles.categoryPillText}>Sports</Text>
            </TouchableOpacity>

            {/* Music */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedCategory('music')}
              style={[
                styles.categoryPill,
                { backgroundColor: '#F59762' },
                selectedCategory === 'music' && styles.categoryPillActive,
              ]}>
              <Ionicons name="musical-notes-outline" size={16} color="#FFFFFF" />
              <Text style={styles.categoryPillText}>Music</Text>
            </TouchableOpacity>

            {/* Food */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedCategory('food')}
              style={[
                styles.categoryPill,
                { backgroundColor: '#29D697' },
                selectedCategory === 'food' && styles.categoryPillActive,
              ]}>
              <MaterialCommunityIcons name="silverware-fork-knife" size={16} color="#FFFFFF" />
              <Text style={styles.categoryPillText}>Food</Text>
            </TouchableOpacity>

            {/* Art */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedCategory('art')}
              style={[
                styles.categoryPill,
                { backgroundColor: '#46CDFB' },
                selectedCategory === 'art' && styles.categoryPillActive,
              ]}>
              <Ionicons name="color-palette-outline" size={16} color="#FFFFFF" />
              <Text style={styles.categoryPillText}>Art</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Section: Upcoming Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onSeeAllEvents}
            style={styles.seeAllBtn}>
            <Text style={styles.seeAllText}>See All</Text>
            <Ionicons name="caret-forward" size={12} color="#747688" />
          </TouchableOpacity>
        </View>

        {/* Horizontal Event Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventsScroll}>
          {UPCOMING_EVENTS.map((event) => (
            <TouchableOpacity
              key={event.id}
              activeOpacity={0.9}
              onPress={() => onEventPress?.(event.id)}
              style={styles.eventCard}>
              {/* Event Image Banner */}
              <View style={styles.cardImageContainer}>
                {event.image ? (
                  <Image
                    source={event.image}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                ) : (
                  <LinearGradient
                    colors={event.gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cardImageGradient}>
                    <Ionicons name="sparkles" size={36} color="rgba(255,255,255,0.7)" />
                  </LinearGradient>
                )}

                {/* Date Badge (Top-Left) */}
                <View style={styles.dateBadge}>
                  <Text style={styles.dateDay}>{event.dateDay}</Text>
                  <Text style={styles.dateMonth}>{event.dateMonth}</Text>
                </View>

                {/* Bookmark Badge (Top-Right) */}
                <View style={styles.bookmarkBadge}>
                  <Ionicons
                    name="bookmark"
                    size={14}
                    color={event.bookmarked ? '#EB5757' : '#D1D5DB'}
                  />
                </View>
              </View>

              {/* Card Body */}
              <View style={styles.cardBody}>
                <Text style={styles.eventTitle} numberOfLines={1}>
                  {event.title}
                </Text>

                {/* Attendees Row */}
                <View style={styles.attendeesRow}>
                  <View style={styles.avatarGroup}>
                    {ATTENDEE_AVATARS.map((avatarSource, idx) => (
                      <View
                        key={idx}
                        style={[
                          styles.avatarWrapper,
                          idx > 0 && { marginLeft: -7 },
                        ]}>
                        <Image
                          source={avatarSource}
                          style={styles.avatarImage}
                        />
                      </View>
                    ))}
                  </View>
                  <Text style={styles.goingText}>{event.attendeesCount}</Text>
                </View>

                {/* Location Row */}
                <View style={styles.locationRow}>
                  <Ionicons name="location-sharp" size={14} color="#747688" />
                  <Text style={styles.locationText} numberOfLines={1}>
                    {event.location}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* "Invite your friends" Promotion Banner */}
        <View style={styles.inviteBanner}>
          {/* Background Illustration Graphic */}
          <Image
            source={Event3Image}
            style={styles.inviteImage}
            resizeMode="contain"
          />

          <View style={styles.inviteContent}>
            <Text style={styles.inviteTitle}>Invite your friends</Text>
            <Text style={styles.inviteSubtitle}>Get $20 for ticket</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onInvitePress}
              style={styles.inviteBtn}>
              <Text style={styles.inviteBtnText}>INVITE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section: Nearby You */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Nearby You</Text>
          <TouchableOpacity activeOpacity={0.7} style={styles.seeAllBtn}>
            <Text style={styles.seeAllText}>See All</Text>
            <Ionicons name="caret-forward" size={12} color="#747688" />
          </TouchableOpacity>
        </View>

        {/* Nearby Card */}
        <View style={styles.nearbyCard}>
          <LinearGradient
            colors={['#FF6B6B', '#556270']}
            style={styles.nearbyThumb}>
            <Ionicons name="musical-note" size={20} color="#FFFFFF" />
          </LinearGradient>
          <View style={styles.nearbyInfo}>
            <Text style={styles.nearbyDate}>18 June - 9:00 PM</Text>
            <Text style={styles.nearbyTitle} numberOfLines={1}>
              International Gala Music Festival
            </Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={12} color="#747688" />
              <Text style={styles.locationText}>London, UK</Text>
            </View>
          </View>
          <Ionicons name="bookmark" size={18} color="#EB5757" />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Floating Navigation Bar */}
      <View style={styles.bottomNavContainer}>
        {/* Explore */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActiveTab('explore')}
          style={styles.navItem}>
          <Ionicons
            name="compass"
            size={22}
            color={activeTab === 'explore' ? '#5669FF' : '#747688'}
          />
          <Text
            style={[
              styles.navText,
              activeTab === 'explore' && styles.navTextActive,
            ]}>
            Explore
          </Text>
        </TouchableOpacity>

        {/* Events */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setActiveTab('events');
            onEventsTabPress?.();
          }}
          style={styles.navItem}>
          <Ionicons
            name="calendar-outline"
            size={22}
            color={activeTab === 'events' ? '#5669FF' : '#747688'}
          />
          <Text
            style={[
              styles.navText,
              activeTab === 'events' && styles.navTextActive,
            ]}>
            Events
          </Text>
        </TouchableOpacity>

        {/* Center Floating Action Button (FAB) */}
        <View style={styles.fabWrapper}>
          <TouchableOpacity activeOpacity={0.85} style={styles.fabButton}>
            <Ionicons name="add" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Map */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setActiveTab('map');
            onNavigateToMap?.();
          }}
          style={styles.navItem}>
          <Ionicons
            name="location-outline"
            size={22}
            color={activeTab === 'map' ? '#5669FF' : '#747688'}
          />
          <Text
            style={[
              styles.navText,
              activeTab === 'map' && styles.navTextActive,
            ]}>
            Map
          </Text>
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setActiveTab('profile');
            onProfilePress?.();
          }}
          style={styles.navItem}>
          <Ionicons
            name="person-outline"
            size={22}
            color={activeTab === 'profile' ? '#5669FF' : '#747688'}
          />
          <Text
            style={[
              styles.navText,
              activeTab === 'profile' && styles.navTextActive,
            ]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Blue Header Styles
  blueHeader: {
    backgroundColor: '#4A43EC',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerSafeArea: {
    paddingTop: 4,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  statusTime: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  menuIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationWrapper: {
    alignItems: 'center',
  },
  locationLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationLabel: {
    fontSize: 12,
    color: '#D2D6FF',
  },
  locationCity: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  notifBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#00F8FF',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchBar: {
    flex: 1,
    height: 46,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  searchDivider: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 18,
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#FFFFFF',
  },
  searchInputPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.65)',
  },
  filtersBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5D56F3',
    height: 46,
    borderRadius: 23,
    paddingHorizontal: 14,
    gap: 6,
  },
  filtersText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Category Pills
  categoriesWrapper: {
    marginTop: -16,
    zIndex: 10,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryPillActive: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  categoryPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Sections Common
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#120D26',
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 13,
    color: '#747688',
  },

  // Event Cards Scroll
  eventsScroll: {
    paddingHorizontal: 20,
    gap: 14,
  },
  eventCard: {
    width: 235,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  cardImageContainer: {
    width: '100%',
    height: 131,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E8F5FF',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardImageGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 4,
    alignItems: 'center',
    minWidth: 42,
  },
  dateDay: {
    fontSize: 14,
    fontWeight: '800',
    color: '#EB5757',
    lineHeight: 16,
  },
  dateMonth: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#EB5757',
    textTransform: 'uppercase',
  },
  bookmarkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 7,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    marginTop: 10,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#120D26',
  },
  attendeesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    backgroundColor: '#E0E7FF',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  avatarLetter: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  goingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3F38DD',
    marginLeft: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#747688',
    flex: 1,
  },

  // Invite Banner
  inviteBanner: {
    width: width > 348 ? 328 : width - 32,
    maxWidth: 328,
    height: 127,
    alignSelf: 'center',
    marginTop: 24,
    backgroundColor: '#D6FEFF',
    borderRadius: 12,
    position: 'relative',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  inviteImage: {
    position: 'absolute',
    left: -4,
    top: -10,
    width: 351,
    height: 164,
  },
  inviteContent: {
    paddingLeft: 18,
    zIndex: 1,
  },
  inviteTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#120D26',
    lineHeight: 24,
  },
  inviteSubtitle: {
    fontSize: 13,
    color: '#484D70',
    marginTop: 4,
    marginBottom: 10,
  },
  inviteBtn: {
    backgroundColor: '#00F8FF',
    width: 72,
    height: 32,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  // Nearby Card
  nearbyCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  nearbyThumb: {
    width: 55,
    height: 55,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nearbyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nearbyDate: {
    fontSize: 11,
    fontWeight: '600',
    color: '#5669FF',
  },
  nearbyTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#120D26',
    marginTop: 2,
  },

  // Bottom Nav Bar
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 3,
  },
  navText: {
    fontSize: 11,
    color: '#747688',
    fontWeight: '500',
  },
  navTextActive: {
    color: '#5669FF',
    fontWeight: '700',
  },
  fabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
  },
  fabButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#5669FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5669FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
});
