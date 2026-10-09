import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Event1Image = require('../../assets/images/Event1.png');

const ATTENDEE_AVATARS = [
  require('../../assets/images/Oval Copy 4.png'),
  require('../../assets/images/Oval Copy.png'),
  require('../../assets/images/Oval.png'),
];

interface EventDetailsScreenProps {
  onBack?: () => void;
  onBuyTicket?: () => void;
  onOrganizerPress?: () => void;
  onInvitePress?: () => void;
  onSharePress?: () => void;
}

const { width } = Dimensions.get('window');

export const EventDetailsScreen: React.FC<EventDetailsScreenProps> = ({
  onBack,
  onBuyTicket,
  onOrganizerPress,
  onInvitePress,
  onSharePress,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleBuy = () => {
    if (onBuyTicket) {
      onBuyTicket();
    } else {
      Alert.alert('Ticket Purchased', 'You have successfully purchased 1 ticket for $120!');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Cover Hero Banner with Event1 Image */}
        <View style={styles.heroContainer}>
          <Image
            source={Event1Image}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.45)']}
            style={styles.heroGradientOverlay}
          />

          {/* Top Bar on Hero */}
          <SafeAreaView edges={['top']} style={styles.heroSafeArea}>
            {/* Status Bar */}
            <View style={styles.statusBar}>
              <Text style={styles.statusTime}>9:41</Text>
              <View style={styles.statusIcons}>
                <Ionicons name="cellular" size={14} color="#FFFFFF" />
                <Ionicons name="wifi" size={14} color="#FFFFFF" />
                <Ionicons name="battery-full" size={18} color="#FFFFFF" />
              </View>
            </View>

            {/* Top Navigation Row */}
            <View style={styles.heroNavRow}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onBack}
                style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <Text style={styles.heroNavTitle}>Event Details</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={onSharePress}
                  style={styles.bookmarkButton}>
                  <Ionicons name="share-social-outline" size={18} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsBookmarked(!isBookmarked)}
                  style={styles.bookmarkButton}>
                  <Ionicons
                    name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                    size={18}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>

          {/* Overlapping Floating Attendees Card */}
          <View style={styles.floatingAttendeesCard}>
            <View style={styles.attendeesLeft}>
              {/* Overlapping Avatar Circles */}
              <View style={styles.avatarGroup}>
                {ATTENDEE_AVATARS.map((source, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.avatarWrapper,
                      idx > 0 && { marginLeft: -8 },
                    ]}>
                    <Image source={source} style={styles.avatarImage} />
                  </View>
                ))}
              </View>
              <Text style={styles.goingText}>+20 Going</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onInvitePress || (() => Alert.alert('Invite', 'Invitation link copied!'))}
              style={styles.inviteButton}>
              <Text style={styles.inviteButtonText}>Invite</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Body */}
        <View style={styles.bodyContent}>
          {/* Main Event Title */}
          <Text style={styles.eventMainTitle}>
            International Band{'\n'}Music Concert
          </Text>

          {/* Info Row 1: Date & Time */}
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="calendar" size={22} color="#5669FF" />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoTitle}>14 December, 2021</Text>
              <Text style={styles.infoSubtitle}>Tuesday, 4:00PM - 9:00PM</Text>
            </View>
          </View>

          {/* Info Row 2: Location */}
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={24} color="#5669FF" />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoTitle}>Gala Convention Center</Text>
              <Text style={styles.infoSubtitle}>36 Guild Street London, UK</Text>
            </View>
          </View>

          {/* Info Row 3: Organizer */}
          <View style={styles.organizerRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onOrganizerPress}
              style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={styles.organizerAvatarWrapper}>
                <LinearGradient
                  colors={['#5669FF', '#3D56F0']}
                  style={styles.organizerAvatar}>
                  <Ionicons name="person" size={22} color="#FFFFFF" />
                </LinearGradient>
              </View>
              <View style={styles.organizerInfo}>
                <Text style={styles.organizerName}>David Silbia</Text>
                <Text style={styles.organizerRole}>Organizer</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsFollowing(!isFollowing)}
              style={[styles.followBtn, isFollowing && styles.followingBtn]}>
              <Text style={[styles.followBtnText, isFollowing && styles.followingBtnText]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* About Event Section */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutHeader}>About Event</Text>
            <Text style={styles.aboutParagraph}>
              Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.{' '}
              <Text style={styles.readMoreText}>Read More...</Text>
            </Text>
          </View>

          {/* Space for bottom floating button */}
          <View style={{ height: 90 }} />
        </View>
      </ScrollView>

      {/* Floating Bottom Button: BUY TICKET $120 */}
      <View style={styles.bottomFixedContainer}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleBuy}
          style={styles.buyTicketButton}>
          <View style={{ width: 30 }} />
          <Text style={styles.buyTicketButtonText}>BUY TICKET $120</Text>
          <View style={styles.arrowCircle}>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  heroContainer: {
    width: '100%',
    height: 240,
    position: 'relative',
    marginBottom: 35,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  heroGradientOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  heroSafeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  heroNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroNavTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    marginLeft: 12,
  },
  bookmarkButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Overlapping Floating Card
  floatingAttendeesCard: {
    position: 'absolute',
    bottom: -25,
    alignSelf: 'center',
    width: width - 60,
    height: 58,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  attendeesLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#E0E7FF',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  goingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3F38DD',
  },
  inviteButton: {
    backgroundColor: '#5669FF',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 14,
  },
  inviteButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Body Content
  bodyContent: {
    paddingHorizontal: 24,
  },
  eventMainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#120D26',
    lineHeight: 36,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(86, 105, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  infoTextWrapper: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#120D26',
    marginBottom: 3,
  },
  infoSubtitle: {
    fontSize: 12,
    color: '#747688',
  },
  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  organizerAvatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    marginRight: 14,
  },
  organizerAvatar: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  organizerInfo: {
    flex: 1,
  },
  organizerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#120D26',
  },
  organizerRole: {
    fontSize: 12,
    color: '#747688',
    marginTop: 2,
  },
  followBtn: {
    backgroundColor: 'rgba(86, 105, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
  },
  followingBtn: {
    backgroundColor: '#5669FF',
  },
  followBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5669FF',
  },
  followingBtnText: {
    color: '#FFFFFF',
  },
  aboutSection: {
    marginTop: 4,
  },
  aboutHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#120D26',
    marginBottom: 8,
  },
  aboutParagraph: {
    fontSize: 15,
    lineHeight: 24,
    color: '#747688',
  },
  readMoreText: {
    color: '#5669FF',
    fontWeight: '600',
  },

  // Floating Bottom Button
  bottomFixedContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 28,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  buyTicketButton: {
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
  buyTicketButtonText: {
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
