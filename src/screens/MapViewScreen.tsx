import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface MapViewScreenProps {
  onBack?: () => void;
  onSelectEvent?: (eventId: string) => void;
}

const { width, height } = Dimensions.get('window');

export const MapViewScreen: React.FC<MapViewScreenProps> = ({
  onBack,
  onSelectEvent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('sports');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Stylized Vector Map Canvas */}
      <View style={styles.mapCanvas}>
        {/* Map Roads & Blocks */}
        <View style={styles.roadDiagonal1} />
        <View style={styles.roadDiagonal2} />
        <View style={styles.roadVertical1} />
        <View style={styles.roadHorizontal1} />
        <View style={styles.roadHorizontal2} />

        {/* Road Labels */}
        <Text style={[styles.mapLabel, { top: 220, left: 130, transform: [{ rotate: '-25deg' }] }]}>
          Northup Way
        </Text>
        <Text style={[styles.mapLabel, { top: 380, right: 80, transform: [{ rotate: '30deg' }] }]}>
          Northup Way
        </Text>
        <Text style={[styles.mapLabel, { top: 300, left: 45, transform: [{ rotate: '90deg' }] }]}>
          164th Ave NE
        </Text>
        <Text style={[styles.mapLabel, { top: 520, left: 160 }]}>
          NE 8th St
        </Text>

        {/* Area Label */}
        <View style={styles.areaLabelContainer}>
          <Text style={styles.areaLabelTitle}>NORTHEAST</Text>
          <Text style={styles.areaLabelSub}>BELLEVUE</Text>
        </View>

        {/* Interactive Map Pins */}
        {/* Pin 1: Food (Green) */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelectEvent?.('food-festival')}
          style={[styles.mapPinWrapper, { top: 190, right: 90 }]}>
          <View style={[styles.pinBadge, { backgroundColor: '#29D697' }]}>
            <MaterialCommunityIcons name="silverware-fork-knife" size={16} color="#FFFFFF" />
          </View>
          <View style={[styles.pinArrow, { borderTopColor: '#29D697' }]} />
        </TouchableOpacity>

        {/* Pin 2: Music (Purple/Blue) */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelectEvent?.('music-concert')}
          style={[styles.mapPinWrapper, { top: 240, left: 75 }]}>
          <View style={[styles.pinBadge, { backgroundColor: '#6C63FF' }]}>
            <Ionicons name="musical-notes" size={16} color="#FFFFFF" />
          </View>
          <View style={[styles.pinArrow, { borderTopColor: '#6C63FF' }]} />
        </TouchableOpacity>

        {/* Pin 3: Art (Cyan) */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelectEvent?.('art-exhibit')}
          style={[styles.mapPinWrapper, { top: 310, right: 75 }]}>
          <View style={[styles.pinBadge, { backgroundColor: '#00C9FF' }]}>
            <Ionicons name="color-palette" size={16} color="#FFFFFF" />
          </View>
          <View style={[styles.pinArrow, { borderTopColor: '#00C9FF' }]} />
        </TouchableOpacity>

        {/* Pin 4: Sports (Red) */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelectEvent?.('sports-match')}
          style={[styles.mapPinWrapper, { top: 380, left: 110 }]}>
          <View style={[styles.pinBadge, { backgroundColor: '#F0635A' }]}>
            <Ionicons name="basketball" size={16} color="#FFFFFF" />
          </View>
          <View style={[styles.pinArrow, { borderTopColor: '#F0635A' }]} />
        </TouchableOpacity>

        {/* Floating Layer / Filter FAB */}
        <TouchableOpacity activeOpacity={0.85} style={styles.mapLayerBtn}>
          <Ionicons name="layers" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Floating Top Controls */}
      <SafeAreaView edges={['top']} style={styles.topSafeArea}>
        {/* Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.statusTime}>9:41</Text>
          <View style={styles.statusIcons}>
            <Ionicons name="cellular" size={14} color="#120D26" />
            <Ionicons name="wifi" size={14} color="#120D26" />
            <Ionicons name="battery-full" size={18} color="#120D26" />
          </View>
        </View>

        {/* Search Header Row */}
        <View style={styles.searchRow}>
          <View style={styles.searchBarCard}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onBack}
              style={styles.backBtn}>
              <Ionicons name="arrow-back" size={20} color="#120D26" />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Find for food or restaurant..."
              placeholderTextColor="#747688"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <TouchableOpacity activeOpacity={0.85} style={styles.gpsTargetBtn}>
            <Ionicons name="locate" size={22} color="#5669FF" />
          </TouchableOpacity>
        </View>

        {/* Category Pills Bar floating over map */}
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
                styles.catPill,
                selectedCategory === 'sports' && styles.catPillActive,
              ]}>
              <Ionicons name="basketball-outline" size={16} color="#F0635A" />
              <Text style={[styles.catPillText, { color: '#F0635A' }]}>Sports</Text>
            </TouchableOpacity>

            {/* Music */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedCategory('music')}
              style={[
                styles.catPill,
                selectedCategory === 'music' && styles.catPillActive,
              ]}>
              <Ionicons name="musical-notes-outline" size={16} color="#5669FF" />
              <Text style={[styles.catPillText, { color: '#5669FF' }]}>Music</Text>
            </TouchableOpacity>

            {/* Food */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedCategory('food')}
              style={[
                styles.catPill,
                selectedCategory === 'food' && styles.catPillActive,
              ]}>
              <MaterialCommunityIcons name="silverware-fork-knife" size={16} color="#29D697" />
              <Text style={[styles.catPillText, { color: '#29D697' }]}>Food</Text>
            </TouchableOpacity>

            {/* Art */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedCategory('art')}
              style={[
                styles.catPill,
                selectedCategory === 'art' && styles.catPillActive,
              ]}>
              <Ionicons name="color-palette-outline" size={16} color="#00C9FF" />
              <Text style={[styles.catPillText, { color: '#00C9FF' }]}>Art</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Bottom Floating Event Card */}
      <View style={styles.bottomCardWrapper}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onSelectEvent?.('jo-malone')}
          style={styles.eventPreviewCard}>
          {/* Card Thumbnail */}
          <LinearGradient
            colors={['#FFA07A', '#FF7F50', '#FF6347']}
            style={styles.cardThumbnail}>
            <Ionicons name="sparkles" size={24} color="#FFFFFF" />
          </LinearGradient>

          {/* Card Details */}
          <View style={styles.cardInfo}>
            <Text style={styles.cardDate}>Wed, Apr 28 • 5:30 PM</Text>
            <Text style={styles.cardTitle} numberOfLines={2}>
              Jo Malone London’s Mother’s{'\n'}Day Presents
            </Text>
            <View style={styles.cardLocationRow}>
              <Ionicons name="location-sharp" size={12} color="#747688" />
              <Text style={styles.cardLocationText} numberOfLines={1}>
                Radius Gallery • Santa Cruz, CA
              </Text>
            </View>
          </View>

          {/* Bookmark Icon */}
          <View style={styles.bookmarkWrapper}>
            <Ionicons name="bookmark" size={18} color="#EB5757" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    position: 'relative',
  },

  // Map Background Canvas
  mapCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F7F8FA',
    overflow: 'hidden',
  },
  roadDiagonal1: {
    position: 'absolute',
    top: -50,
    left: 40,
    width: 14,
    height: height + 100,
    backgroundColor: '#E7ECF0',
    transform: [{ rotate: '25deg' }],
  },
  roadDiagonal2: {
    position: 'absolute',
    top: -50,
    right: 70,
    width: 12,
    height: height + 100,
    backgroundColor: '#E7ECF0',
    transform: [{ rotate: '-20deg' }],
  },
  roadVertical1: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 80,
    width: 10,
    backgroundColor: '#E7ECF0',
  },
  roadHorizontal1: {
    position: 'absolute',
    top: 250,
    left: 0,
    right: 0,
    height: 12,
    backgroundColor: '#E7ECF0',
    transform: [{ rotate: '-10deg' }],
  },
  roadHorizontal2: {
    position: 'absolute',
    top: 480,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: '#E7ECF0',
  },
  mapLabel: {
    position: 'absolute',
    fontSize: 9,
    fontWeight: '600',
    color: '#B0B5C1',
    letterSpacing: 0.5,
  },
  areaLabelContainer: {
    position: 'absolute',
    top: 280,
    right: 50,
    alignItems: 'center',
  },
  areaLabelTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#9EABB8',
    letterSpacing: 1.5,
  },
  areaLabelSub: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B0B5C1',
    letterSpacing: 1,
  },

  // Map Pins
  mapPinWrapper: {
    position: 'absolute',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  pinBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  mapLayerBtn: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#5669FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5669FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  // Top Controls
  topSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 4,
    zIndex: 10,
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
    color: '#120D26',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchBarCard: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  backBtn: {
    paddingRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 13,
    color: '#120D26',
  },
  gpsTargetBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  // Categories Floating Bar
  categoriesWrapper: {
    marginTop: 12,
  },
  categoriesScroll: {
    gap: 8,
  },
  catPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  catPillActive: {
    borderWidth: 1.5,
    borderColor: '#5669FF',
  },
  catPillText: {
    fontSize: 13,
    fontWeight: '700',
  },

  // Bottom Floating Event Preview Card
  bottomCardWrapper: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  eventPreviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 6,
  },
  cardThumbnail: {
    width: 68,
    height: 68,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cardDate: {
    fontSize: 11,
    fontWeight: '600',
    color: '#5669FF',
    marginBottom: 3,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#120D26',
    lineHeight: 18,
  },
  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 3,
  },
  cardLocationText: {
    fontSize: 11,
    color: '#747688',
    flex: 1,
  },
  bookmarkWrapper: {
    padding: 6,
    alignSelf: 'flex-start',
  },
});
