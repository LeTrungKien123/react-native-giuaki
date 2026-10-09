import React, { useState } from 'react';
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

interface MyProfileScreenProps {
  onBack?: () => void;
  onEditProfile?: () => void;
  onChangeInterests?: () => void;
}

interface InterestTag {
  id: string;
  label: string;
  color: string;
}

const INTERESTS: InterestTag[] = [
  { id: '1', label: 'Games Online', color: '#6B7AE8' },
  { id: '2', label: 'Concert', color: '#EE544A' },
  { id: '3', label: 'Music', color: '#F59762' },
  { id: '4', label: 'Art', color: '#7D67EE' },
  { id: '5', label: 'Movie', color: '#29D697' },
  { id: '6', label: 'Others', color: '#00D2FF' },
];

export const MyProfileScreen: React.FC<MyProfileScreenProps> = ({
  onBack,
  onEditProfile,
  onChangeInterests,
}) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header: Back & Title "Profile" */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#120D26" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* User Profile Card */}
          <View style={styles.profileSection}>
            {/* Avatar */}
            <View style={styles.avatarWrapper}>
              <LinearGradient
                colors={['#8E9EAB', '#4A5568']}
                style={styles.avatarGradient}>
                <Ionicons name="person" size={54} color="#FFFFFF" />
              </LinearGradient>
            </View>

            {/* Name */}
            <Text style={styles.userName}>Ashfak Sayem</Text>

            {/* Stats Row: Following & Followers */}
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

            {/* Edit Profile Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onEditProfile || (() => Alert.alert('Edit Profile', 'Edit profile modal'))}
              style={styles.editProfileBtn}>
              <Ionicons name="create-outline" size={18} color="#5669FF" />
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Section: About Me */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.aboutText}>
              Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.{' '}
              <Text
                onPress={() => setReadMore(!readMore)}
                style={styles.readMoreText}>
                {readMore ? 'Show Less ▴' : 'Read More ▾'}
              </Text>
            </Text>
            {readMore && (
              <Text style={[styles.aboutText, { marginTop: 6 }]}>
                Passionate about live concerts, music festivals, and creating community connections across city events.
              </Text>
            )}
          </View>

          {/* Section: Interest */}
          <View style={styles.section}>
            <View style={styles.interestHeaderRow}>
              <Text style={styles.sectionTitle}>Interest</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onChangeInterests || (() => Alert.alert('Change Interest', 'Select new interests'))}
                style={styles.changeBtn}>
                <Ionicons name="create-outline" size={12} color="#5669FF" />
                <Text style={styles.changeBtnText}>CHANGE</Text>
              </TouchableOpacity>
            </View>

            {/* Interest Tags Wrap */}
            <View style={styles.tagsContainer}>
              {INTERESTS.map((item) => (
                <View
                  key={item.id}
                  style={[styles.tagPill, { backgroundColor: item.color }]}>
                  <Text style={styles.tagText}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

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
  scrollContent: {
    paddingBottom: 24,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 24,
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#120D26',
    marginTop: 16,
    marginBottom: 16,
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
    marginBottom: 3,
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
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#5669FF',
    gap: 8,
  },
  editProfileText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5669FF',
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#120D26',
    marginBottom: 10,
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
  interestHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  changeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECEBFC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    gap: 4,
  },
  changeBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#5669FF',
    letterSpacing: 0.5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
