import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Event1Image = require('../../../assets/images/Event1.png');
const Event2Image = require('../../../assets/images/Event2.png');

const MOCK_AVATARS = [
  require('../../../assets/images/Oval Copy 4.png'),
  require('../../../assets/images/Oval Copy.png'),
  require('../../../assets/images/Oval.png'),
];

// ==========================================
// 1. HOME / EXPLORE MOCKUP (Onboarding 1)
// ==========================================
export const HomeExploreMockup: React.FC = () => {
  return (
    <View style={styles.phoneFrame}>
      {/* Top App Bar inside Mockup */}
      <View style={styles.homeHeader}>
        <View style={styles.homeHeaderTop}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="menu-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.locationContainer}>
            <View style={styles.locationRow}>
              <Text style={styles.locationLabel}>Current Location</Text>
              <Ionicons name="chevron-down" size={12} color="#D2D6FF" />
            </View>
            <Text style={styles.locationCity}>New York, USA</Text>
          </View>

          <View style={styles.notifBadgeWrapper}>
            <View style={styles.headerIconBtn}>
              <Ionicons name="notifications-outline" size={18} color="#FFFFFF" />
            </View>
            <View style={styles.redBadge} />
          </View>
        </View>

        {/* Search Bar & Filter */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={16} color="#FFFFFF" style={{ opacity: 0.8 }} />
            <Text style={styles.searchPlaceholder}>Search...</Text>
          </View>
          <View style={styles.filterBtn}>
            <Ionicons name="options-outline" size={14} color="#FFFFFF" />
            <Text style={styles.filterText}>Filters</Text>
          </View>
        </View>

        {/* Category Pills */}
        <View style={styles.categoryRow}>
          <View style={[styles.categoryPill, { backgroundColor: '#F0635A' }]}>
            <Ionicons name="basketball-outline" size={12} color="#FFFFFF" />
            <Text style={styles.categoryText}>Sports</Text>
          </View>
          <View style={[styles.categoryPill, { backgroundColor: '#F59762' }]}>
            <Ionicons name="musical-notes-outline" size={12} color="#FFFFFF" />
            <Text style={styles.categoryText}>Music</Text>
          </View>
          <View style={[styles.categoryPill, { backgroundColor: '#29D697' }]}>
            <MaterialCommunityIcons name="silverware-fork-knife" size={12} color="#FFFFFF" />
            <Text style={styles.categoryText}>Food</Text>
          </View>
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.homeContent}>
        {/* Section: Upcoming Events */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <Text style={styles.seeAllText}>See All &gt;</Text>
        </View>

        {/* Horizontal Event Cards */}
        <View style={styles.eventCardsScroll}>
          {/* Card 1 */}
          <View style={styles.eventCard}>
            <View style={styles.cardImageContainer}>
              <Image
                source={Event1Image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              {/* Date Badge */}
              <View style={styles.dateBadge}>
                <Text style={styles.dateBadgeDay}>10</Text>
                <Text style={styles.dateBadgeMonth}>JUNE</Text>
              </View>
              {/* Bookmark */}
              <View style={styles.bookmarkBadge}>
                <Ionicons name="bookmark" size={10} color="#EB5757" />
              </View>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                International Band Mu...
              </Text>
              {/* Avatars Going */}
              <View style={styles.avatarRow}>
                <View style={styles.avatarGroup}>
                  {MOCK_AVATARS.map((source, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.avatarMiniWrap,
                        idx > 0 && { marginLeft: -5 },
                      ]}>
                      <Image source={source} style={styles.avatarMiniImg} />
                    </View>
                  ))}
                </View>
                <Text style={styles.goingText}>+20 Going</Text>
              </View>
              {/* Location */}
              <View style={styles.locationBottomRow}>
                <Ionicons name="location-sharp" size={10} color="#747688" />
                <Text style={styles.locationBottomText} numberOfLines={1}>
                  36 Guild Street London, UK
                </Text>
              </View>
            </View>
          </View>

          {/* Card 2 (peeking) */}
          <View style={[styles.eventCard, { width: 90, opacity: 0.95 }]}>
            <View style={styles.cardImageContainer}>
              <Image
                source={Event2Image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.dateBadge}>
                <Text style={styles.dateBadgeDay}>10</Text>
                <Text style={styles.dateBadgeMonth}>JUNE</Text>
              </View>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                Jo Malone...
              </Text>
              <View style={styles.avatarRow}>
                <View style={styles.avatarGroup}>
                  {MOCK_AVATARS.slice(0, 2).map((source, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.avatarMiniWrap,
                        idx > 0 && { marginLeft: -5 },
                      ]}>
                      <Image source={source} style={styles.avatarMiniImg} />
                    </View>
                  ))}
                </View>
                <Text style={styles.goingText}>+20...</Text>
              </View>
              <View style={styles.locationBottomRow}>
                <Ionicons name="location-sharp" size={10} color="#747688" />
                <Text style={styles.locationBottomText} numberOfLines={1}>
                  Radius Gal...
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Section: Nearby You */}
        <View style={[styles.sectionHeaderRow, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>Nearby You</Text>
          <Text style={styles.seeAllText}>See All &gt;</Text>
        </View>

        <View style={styles.nearbyCard}>
          <LinearGradient
            colors={['#FF6B6B', '#556270']}
            style={styles.nearbyThumb}
          />
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.nearbyDate}>18 June - 9:00 PM</Text>
            <Text style={styles.nearbyTitle} numberOfLines={1}>
              International Gala Music
            </Text>
          </View>
          <Ionicons name="bookmark-outline" size={14} color="#EB5757" />
        </View>
      </View>
    </View>
  );
};

// ==========================================
// 2. CALENDAR MOCKUP (Onboarding 2)
// ==========================================
export const CalendarMockup: React.FC = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // 31 days grid layout
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <View style={styles.phoneFrame}>
      {/* Calendar Header */}
      <View style={styles.calHeader}>
        <View style={styles.calHeaderTitleRow}>
          <Ionicons name="arrow-back" size={18} color="#120D26" />
          <View style={styles.calTitleDropdown}>
            <Text style={styles.calTitle}>Calendar</Text>
            <Ionicons name="caret-down" size={12} color="#120D26" />
          </View>
        </View>
        <Ionicons name="ellipsis-vertical" size={18} color="#120D26" />
      </View>

      {/* Month Selector */}
      <View style={styles.monthNavRow}>
        <Ionicons name="chevron-back" size={16} color="#747688" />
        <Text style={styles.monthText}>March 2021</Text>
        <Ionicons name="chevron-forward" size={16} color="#747688" />
      </View>

      {/* Weekdays */}
      <View style={styles.weekdaysRow}>
        {daysOfWeek.map((day, idx) => (
          <Text key={idx} style={styles.weekdayLabel}>
            {day}
          </Text>
        ))}
      </View>

      {/* Dates Grid */}
      <View style={styles.datesGrid}>
        {dates.map((date) => {
          const isSelected = date === 14;
          const isBlue = date === 18;
          const isCyan = date === 22;
          const isPurple = date === 26;
          const isPeach = date === 10;

          return (
            <View key={date} style={styles.dateCell}>
              <View
                style={[
                  styles.dateCircle,
                  isSelected && styles.dateSelected,
                  isBlue && styles.dateBlue,
                  isCyan && styles.dateCyan,
                  isPurple && styles.datePurple,
                  isPeach && styles.datePeach,
                ]}>
                <Text
                  style={[
                    styles.dateNumText,
                    (isSelected || isBlue) && styles.dateActiveText,
                  ]}>
                  {date}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Date Event Divider */}
      <View style={styles.eventScheduleSection}>
        <View style={styles.calDateTag}>
          <Ionicons name="calendar-outline" size={12} color="#5669FF" />
          <Text style={styles.calDateTagText}>MON, 18TH MARCH, 2021</Text>
        </View>

        {/* Event Card 1 (Peach/Coral) */}
        <View style={[styles.calEventCard, { backgroundColor: '#FFEDE8' }]}>
          <LinearGradient
            colors={['#FF8E53', '#FE6B8B']}
            style={styles.calEventThumb}>
            <Ionicons name="musical-notes" size={14} color="#FFFFFF" />
          </LinearGradient>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={[styles.calEventTime, { color: '#E5533D' }]}>
              10:00 am - 12:00 pm
            </Text>
            <Text style={styles.calEventTitle}>Gala Music Festival</Text>
          </View>
        </View>

        {/* Event Card 2 (Lavender) */}
        <View style={[styles.calEventCard, { backgroundColor: '#ECEBFC' }]}>
          <LinearGradient
            colors={['#667EEA', '#764BA2']}
            style={styles.calEventThumb}>
            <Ionicons name="sparkles" size={14} color="#FFFFFF" />
          </LinearGradient>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={[styles.calEventTime, { color: '#5669FF' }]}>
              12:00 pm - 02:00 pm
            </Text>
            <Text style={styles.calEventTitle}>Women's Leadership</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// ==========================================
// 3. MAP MOCKUP (Onboarding 3)
// ==========================================
export const MapMockup: React.FC = () => {
  return (
    <View style={styles.phoneFrame}>
      {/* Top Search & Filter Floating Bar */}
      <View style={styles.mapSearchHeader}>
        <View style={styles.mapSearchRow}>
          <Ionicons name="arrow-back" size={18} color="#120D26" />
          <View style={styles.mapSearchBar}>
            <Ionicons name="search-outline" size={14} color="#747688" />
            <Text style={styles.mapSearchPlaceholder} numberOfLines={1}>
              Search event, location ect...
            </Text>
          </View>
          <View style={styles.mapTargetBtn}>
            <Ionicons name="locate" size={14} color="#5669FF" />
          </View>
        </View>

        {/* Category Pills floating over map */}
        <View style={styles.mapCategoryRow}>
          <View style={[styles.mapCatPill, { borderColor: '#F0635A' }]}>
            <Ionicons name="basketball-outline" size={12} color="#F0635A" />
            <Text style={[styles.mapCatText, { color: '#F0635A' }]}>Sports</Text>
          </View>
          <View style={[styles.mapCatPill, { borderColor: '#5669FF' }]}>
            <Ionicons name="musical-notes-outline" size={12} color="#5669FF" />
            <Text style={[styles.mapCatText, { color: '#5669FF' }]}>Music</Text>
          </View>
          <View style={[styles.mapCatPill, { borderColor: '#29D697' }]}>
            <MaterialCommunityIcons name="silverware-fork-knife" size={12} color="#29D697" />
            <Text style={[styles.mapCatText, { color: '#29D697' }]}>Food</Text>
          </View>
        </View>
      </View>

      {/* Map Graphic Canvas */}
      <View style={styles.mapCanvas}>
        {/* Stylized Map Roads and City Blocks */}
        <View style={styles.mapRoadHorizontal1} />
        <View style={styles.mapRoadHorizontal2} />
        <View style={styles.mapRoadVertical1} />
        <View style={styles.mapRoadVertical2} />
        <View style={styles.mapGreenArea} />

        {/* Pin 1: Music concert (Purple) */}
        <View style={[styles.mapPinContainer, { top: 22, left: 16 }]}>
          <View style={[styles.mapPinBubble, { borderColor: '#5669FF' }]}>
            <Ionicons name="musical-notes" size={10} color="#5669FF" />
            <View style={{ marginLeft: 3 }}>
              <Text style={styles.mapPinPrice}>Ticket: $20</Text>
              <Text style={styles.mapPinSub}>Music concert</Text>
            </View>
          </View>
          <View style={[styles.mapPinTriangle, { borderTopColor: '#5669FF' }]} />
        </View>

        {/* Pin 2: Food festival (Green) */}
        <View style={[styles.mapPinContainer, { top: 78, left: 10 }]}>
          <View style={[styles.mapPinBubble, { borderColor: '#29D697' }]}>
            <MaterialCommunityIcons name="silverware-fork-knife" size={10} color="#29D697" />
            <View style={{ marginLeft: 3 }}>
              <Text style={styles.mapPinPrice}>Ticket: $50</Text>
              <Text style={styles.mapPinSub}>Food festival</Text>
            </View>
          </View>
          <View style={[styles.mapPinTriangle, { borderTopColor: '#29D697' }]} />
        </View>

        {/* Pin 3: Football Match (Orange) */}
        <View style={[styles.mapPinContainer, { top: 40, right: 18 }]}>
          <View style={[styles.mapPinBubble, { borderColor: '#F0635A' }]}>
            <Ionicons name="football" size={10} color="#F0635A" />
            <View style={{ marginLeft: 3 }}>
              <Text style={styles.mapPinPrice}>Ticket: $35</Text>
              <Text style={styles.mapPinSub}>Football Match</Text>
            </View>
          </View>
          <View style={[styles.mapPinTriangle, { borderTopColor: '#F0635A' }]} />
        </View>

        {/* Pin 4: Art Show (Blue) */}
        <View style={[styles.mapPinContainer, { top: 120, right: 50 }]}>
          <View style={[styles.mapPinBubble, { borderColor: '#00C9FF' }]}>
            <Ionicons name="color-palette" size={10} color="#00C9FF" />
            <View style={{ marginLeft: 3 }}>
              <Text style={styles.mapPinPrice}>Ticket: $30</Text>
              <Text style={styles.mapPinSub}>Art show</Text>
            </View>
          </View>
          <View style={[styles.mapPinTriangle, { borderTopColor: '#00C9FF' }]} />
        </View>

        {/* User Location Pulse Beacon */}
        <View style={styles.userLocationBeacon}>
          <View style={styles.beaconOuterPulse} />
          <View style={styles.beaconCenterDot} />
        </View>

        {/* Bottom Floating Event Card Peek */}
        <View style={styles.mapBottomCard}>
          <LinearGradient
            colors={['#8A2387', '#E94057', '#F27121']}
            style={styles.mapBottomCardThumb}
          />
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.mapBottomCardTitle} numberOfLines={1}>
              Women Leadership Summit
            </Text>
            <Text style={styles.mapBottomCardSub}>2.4 km away • 18 June</Text>
          </View>
          <Ionicons name="bookmark" size={14} color="#EB5757" />
        </View>
      </View>
    </View>
  );
};

// ==========================================
// STYLES
// ==========================================
const styles = StyleSheet.create({
  phoneFrame: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  // 1. Home Mockup Styles
  homeHeader: {
    backgroundColor: '#4A43EC',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  homeHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIconBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationContainer: {
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  locationLabel: {
    fontSize: 10,
    color: '#D2D6FF',
  },
  locationCity: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  notifBadgeWrapper: {
    position: 'relative',
  },
  redBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00F8FF',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 28,
    gap: 6,
  },
  searchPlaceholder: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5D56F3',
    paddingHorizontal: 8,
    height: 28,
    borderRadius: 14,
    gap: 4,
  },
  filterText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  categoryText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  homeContent: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#120D26',
  },
  seeAllText: {
    fontSize: 10,
    color: '#747688',
  },
  eventCardsScroll: {
    flexDirection: 'row',
    gap: 8,
  },
  eventCard: {
    width: 170,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardImageContainer: {
    width: '100%',
    height: 70,
    borderRadius: 8,
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
    top: 5,
    left: 5,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignItems: 'center',
  },
  dateBadgeDay: {
    fontSize: 9,
    fontWeight: '800',
    color: '#EB5757',
  },
  dateBadgeMonth: {
    fontSize: 7,
    fontWeight: '700',
    color: '#EB5757',
  },
  bookmarkBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 4,
    padding: 3,
  },
  cardBody: {
    marginTop: 5,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#120D26',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarMiniWrap: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#E0E7FF',
    overflow: 'hidden',
  },
  avatarMiniImg: {
    width: '100%',
    height: '100%',
  },
  avatarCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  avatarLetter: {
    fontSize: 7,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  goingText: {
    fontSize: 9,
    color: '#3F38DD',
    fontWeight: '600',
    marginLeft: 4,
  },
  locationBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 2,
  },
  locationBottomText: {
    fontSize: 8,
    color: '#747688',
    flex: 1,
  },
  nearbyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 6,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  nearbyThumb: {
    width: 38,
    height: 38,
    borderRadius: 6,
  },
  nearbyDate: {
    fontSize: 8,
    color: '#5669FF',
    fontWeight: '600',
  },
  nearbyTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#120D26',
  },

  // 2. Calendar Mockup Styles
  calHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  calHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  calTitleDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  calTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#120D26',
  },
  monthNavRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginVertical: 4,
  },
  monthText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#120D26',
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    marginVertical: 4,
  },
  weekdayLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#747688',
    width: 24,
    textAlign: 'center',
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  dateCell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    marginVertical: 2,
  },
  dateCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateSelected: {
    backgroundColor: '#F59762',
  },
  dateBlue: {
    backgroundColor: '#5669FF',
  },
  dateCyan: {
    backgroundColor: '#00F8FF',
  },
  datePurple: {
    backgroundColor: '#9B51E0',
  },
  datePeach: {
    backgroundColor: '#FFA07A',
  },
  dateNumText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#120D26',
  },
  dateActiveText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  eventScheduleSection: {
    paddingHorizontal: 12,
    marginTop: 6,
  },
  calDateTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  calDateTagText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#5669FF',
    letterSpacing: 0.4,
  },
  calEventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 6,
    marginBottom: 6,
  },
  calEventThumb: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calEventTime: {
    fontSize: 8,
    fontWeight: '600',
  },
  calEventTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#120D26',
  },

  // 3. Map Mockup Styles
  mapSearchHeader: {
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  mapSearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mapSearchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F9',
    borderRadius: 16,
    paddingHorizontal: 8,
    height: 26,
    gap: 4,
  },
  mapSearchPlaceholder: {
    fontSize: 9,
    color: '#747688',
    flex: 1,
  },
  mapTargetBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ECEBFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapCategoryRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  mapCatPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    gap: 3,
    backgroundColor: '#FFFFFF',
  },
  mapCatText: {
    fontSize: 8,
    fontWeight: '600',
  },
  mapCanvas: {
    flex: 1,
    backgroundColor: '#F4F5F7',
    position: 'relative',
    overflow: 'hidden',
  },
  mapRoadHorizontal1: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: '#E4E7EB',
  },
  mapRoadHorizontal2: {
    position: 'absolute',
    top: 110,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: '#E4E7EB',
  },
  mapRoadVertical1: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 70,
    width: 10,
    backgroundColor: '#E4E7EB',
  },
  mapRoadVertical2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 60,
    width: 8,
    backgroundColor: '#E4E7EB',
  },
  mapGreenArea: {
    position: 'absolute',
    top: 60,
    left: 85,
    width: 60,
    height: 45,
    borderRadius: 8,
    backgroundColor: '#E2F0D9',
  },
  mapPinContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  mapPinBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mapPinPrice: {
    fontSize: 7,
    fontWeight: '700',
    color: '#120D26',
  },
  mapPinSub: {
    fontSize: 6,
    color: '#747688',
  },
  mapPinTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  userLocationBeacon: {
    position: 'absolute',
    top: 90,
    left: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  beaconOuterPulse: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(86, 105, 255, 0.25)',
  },
  beaconCenterDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5669FF',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  mapBottomCard: {
    position: 'absolute',
    bottom: 6,
    left: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapBottomCardThumb: {
    width: 32,
    height: 32,
    borderRadius: 6,
  },
  mapBottomCardTitle: {
    fontSize: 9,
    fontWeight: '700',
    color: '#120D26',
  },
  mapBottomCardSub: {
    fontSize: 8,
    color: '#747688',
  },
});
