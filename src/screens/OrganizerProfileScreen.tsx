import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export type OrganizerTab = 'about' | 'event' | 'reviews';

interface OrganizerProfileScreenProps {
  initialTab?: OrganizerTab;
  onBack?: () => void;
  onSelectEvent?: (eventId: string) => void;
  onMenuPress?: () => void;
}

interface OrganizerEvent {
  id: string;
  dateTime: string;
  title: string;
  gradientColors: [string, string, ...string[]];
  iconName: keyof typeof Ionicons.glyphMap;
}

interface ReviewItem {
  id: string;
  name: string;
  date: string;
  stars: number;
  comment: string;
  avatarColor: string;
}

const ORGANIZER_EVENTS: OrganizerEvent[] = [
  {
    id: '1',
    dateTime: '1ST MAY- SAT -2:00 PM',
    title: 'A virtual evening of smooth jazz',
    gradientColors: ['#1A1443', '#4A43EC'],
    iconName: 'musical-notes',
  },
  {
    id: '2',
    dateTime: '1ST MAY- SAT -2:00 PM',
    title: 'Jo malone london’s mother’s day',
    gradientColors: ['#FFA07A', '#FF6347'],
    iconName: 'sparkles',
  },
  {
    id: '3',
    dateTime: '1ST MAY- SAT -2:00 PM',
    title: 'Women’s leadership conference',
    gradientColors: ['#8A2387', '#E94057'],
    iconName: 'people',
  },
];

const REVIEWS: ReviewItem[] = [
  {
    id: '1',
    name: 'Rocks Velkeinjen',
    date: '10 Feb',
    stars: 4,
    comment:
      'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.',
    avatarColor: '#E0A96D',
  },
  {
    id: '2',
    name: 'Angelina Zolly',
    date: '10 Feb',
    stars: 4,
    comment:
      'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.',
    avatarColor: '#D4A5A5',
  },
  {
    id: '3',
    name: 'Zenifero Bolex',
    date: '10 Feb',
    stars: 4,
    comment:
      'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.',
    avatarColor: '#9FA8A3',
  },
];

export const OrganizerProfileScreen: React.FC<OrganizerProfileScreenProps> = ({
  initialTab = 'about',
  onBack,
  onSelectEvent,
  onMenuPress,
}) => {
  const [activeTab, setActiveTab] = useState<OrganizerTab>(initialTab);
  const [isFollowing, setIsFollowing] = useState(false);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header: Back & 3-dots Menu */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={24} color="#120D26" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onMenuPress}
            style={styles.headerBtn}>
            <Ionicons name="ellipsis-vertical" size={20} color="#120D26" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Organizer Info Header */}
          <View style={styles.profileSection}>
            {/* Avatar */}
            <View style={styles.avatarWrapper}>
              <LinearGradient
                colors={['#5669FF', '#3D56F0']}
                style={styles.avatarGradient}>
                <Ionicons name="person" size={50} color="#FFFFFF" />
              </LinearGradient>
            </View>

            {/* Name */}
            <Text style={styles.organizerName}>David Silbia</Text>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statCol}>
                <Text style={styles.statCount}>350</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statCol}>
                <Text style={styles.statCount}>346</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
            </View>

            {/* Action Buttons: Follow & Massages */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setIsFollowing(!isFollowing)}
                style={[
                  styles.followBtn,
                  isFollowing && styles.followingBtn,
                ]}>
                <Ionicons
                  name={isFollowing ? 'checkmark' : 'person-add-outline'}
                  size={18}
                  color="#FFFFFF"
                />
                <Text style={styles.followBtnText}>
                  {isFollowing ? 'Following' : '+ Follow'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => Alert.alert('Message', 'Open chat with David Silbia')}
                style={styles.messageBtn}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={18}
                  color="#5669FF"
                />
                <Text style={styles.messageBtnText}>Massages</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tab Navigation: ABOUT | EVENT | REVIEWS */}
          <View style={styles.tabsHeader}>
            {(['about', 'event', 'reviews'] as const).map((tab) => {
              const isActive = activeTab === tab;
              const label =
                tab === 'about' ? 'ABOUT' : tab === 'event' ? 'EVENT' : 'REVIEWS';
              return (
                <TouchableOpacity
                  key={tab}
                  activeOpacity={0.7}
                  onPress={() => setActiveTab(tab)}
                  style={[styles.tabItem, isActive && styles.tabItemActive]}>
                  <Text
                    style={[
                      styles.tabLabel,
                      isActive && styles.tabLabelActive,
                    ]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Tab 1: ABOUT Content */}
          {activeTab === 'about' && (
            <View style={styles.tabContentAbout}>
              <Text style={styles.aboutText}>
                Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.{' '}
                <Text
                  onPress={() => setReadMore(!readMore)}
                  style={styles.readMoreText}>
                  {readMore ? 'Show Less' : 'Read More'}
                </Text>
              </Text>
              {readMore && (
                <Text style={[styles.aboutText, { marginTop: 8 }]}>
                  Organizing premier live jazz, cultural galas, and global community conferences since 2018. Connect with us for future collaborations and special passes.
                </Text>
              )}
            </View>
          )}

          {/* Tab 2: EVENT Content */}
          {activeTab === 'event' && (
            <View style={styles.tabContentEvent}>
              {ORGANIZER_EVENTS.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  activeOpacity={0.85}
                  onPress={() => onSelectEvent?.(event.id)}
                  style={styles.eventCard}>
                  {/* Thumbnail Image */}
                  <LinearGradient
                    colors={event.gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.eventThumbnail}>
                    <Ionicons name={event.iconName} size={28} color="#FFFFFF" />
                  </LinearGradient>

                  {/* Info */}
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventDateTime}>{event.dateTime}</Text>
                    <Text style={styles.eventTitle} numberOfLines={2}>
                      {event.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Tab 3: REVIEWS Content */}
          {activeTab === 'reviews' && (
            <View style={styles.tabContentReviews}>
              {REVIEWS.map((review) => (
                <View key={review.id} style={styles.reviewItem}>
                  {/* Reviewer Avatar */}
                  <View
                    style={[
                      styles.reviewerAvatar,
                      { backgroundColor: review.avatarColor },
                    ]}>
                    <Ionicons name="person" size={20} color="#FFFFFF" />
                  </View>

                  {/* Review Details */}
                  <View style={styles.reviewDetails}>
                    <View style={styles.reviewHeaderRow}>
                      <Text style={styles.reviewerName}>{review.name}</Text>
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>

                    {/* Star Rating */}
                    <View style={styles.starRow}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons
                          key={star}
                          name={star <= review.stars ? 'star' : 'star-outline'}
                          size={13}
                          color="#FFA000"
                        />
                      ))}
                    </View>

                    {/* Review Text */}
                    <Text style={styles.reviewComment}>{review.comment}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={{ height: 40 }} />
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
  },
  headerBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -4,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 20,
  },
  avatarWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  organizerName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#120D26',
    marginTop: 14,
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 28,
  },
  statCol: {
    alignItems: 'center',
  },
  statCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#120D26',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#747688',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E4DFDF',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 14,
    width: '100%',
    paddingHorizontal: 12,
  },
  followBtn: {
    flex: 1,
    height: 48,
    backgroundColor: '#5669FF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#5669FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  followingBtn: {
    backgroundColor: '#3D56F0',
  },
  followBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  messageBtn: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#5669FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  messageBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5669FF',
  },

  // Tabs Navigation Header
  tabsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginTop: 6,
    marginBottom: 18,
  },
  tabItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: '#5669FF',
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#747688',
    letterSpacing: 0.5,
  },
  tabLabelActive: {
    color: '#5669FF',
    fontWeight: '700',
  },

  // Tab 1: About
  tabContentAbout: {
    paddingTop: 8,
  },
  aboutText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#747688',
  },
  readMoreText: {
    color: '#5669FF',
    fontWeight: '600',
  },

  // Tab 2: Event
  tabContentEvent: {
    paddingTop: 4,
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
    shadowRadius: 6,
    elevation: 2,
  },
  eventThumbnail: {
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
  eventDateTime: {
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

  // Tab 3: Reviews
  tabContentReviews: {
    paddingTop: 4,
    gap: 16,
  },
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  reviewerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  reviewDetails: {
    flex: 1,
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#120D26',
  },
  reviewDate: {
    fontSize: 12,
    color: '#747688',
  },
  starRow: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 6,
  },
  reviewComment: {
    fontSize: 13,
    lineHeight: 20,
    color: '#747688',
  },
});
