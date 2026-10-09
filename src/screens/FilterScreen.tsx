import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import Svg, { Rect } from 'react-native-svg';

interface FilterScreenProps {
  onClose?: () => void;
  onReset?: () => void;
  onApply?: (filters: any) => void;
}

interface CategoryOption {
  id: string;
  name: string;
  iconName: any;
  type: 'ionicons' | 'material';
}

const CATEGORIES: CategoryOption[] = [
  { id: 'sports', name: 'Sports', iconName: 'basketball-outline', type: 'ionicons' },
  { id: 'music', name: 'Music', iconName: 'musical-notes-outline', type: 'ionicons' },
  { id: 'art', name: 'Art', iconName: 'color-palette-outline', type: 'ionicons' },
  { id: 'food', name: 'Food', iconName: 'silverware-fork-knife', type: 'material' },
  { id: 'drinks', name: 'Drinks', iconName: 'wine-outline', type: 'ionicons' },
];

export const FilterScreen: React.FC<FilterScreenProps> = ({
  onClose,
  onReset,
  onApply,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['sports', 'art']);
  const [selectedTime, setSelectedTime] = useState<'today' | 'tomorrow' | 'this_week'>('tomorrow');
  const [locationName, setLocationName] = useState('New York, USA');
  const [priceRange, setPriceRange] = useState({ min: 20, max: 120 });

  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedTime('today');
    setPriceRange({ min: 20, max: 120 });
    onReset?.();
  };

  const handleApply = () => {
    onApply?.({
      categories: selectedCategories,
      time: selectedTime,
      location: locationName,
      priceRange,
    });
  };

  // Histogram bar heights to represent price distribution
  const histogramBars = [15, 28, 45, 60, 85, 70, 95, 80, 55, 65, 40, 50, 75, 60, 45, 30, 20];

  return (
    <View style={styles.modalOverlay}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Modal Sheet Container */}
        <View style={styles.sheetContainer}>
          {/* Drag Handle Bar */}
          <TouchableOpacity activeOpacity={0.7} onPress={onClose} style={styles.handleContainer}>
            <View style={styles.handleBar} />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>Filter</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollBody}>
            {/* Category Circular Options */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesRow}>
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategories.includes(cat.id);
                return (
                  <View key={cat.id} style={styles.categoryItem}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => toggleCategory(cat.id)}
                      style={[
                        styles.catCircle,
                        isSelected && styles.catCircleActive,
                      ]}>
                      {cat.type === 'ionicons' ? (
                        <Ionicons
                          name={cat.iconName}
                          size={24}
                          color={isSelected ? '#FFFFFF' : '#747688'}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name={cat.iconName}
                          size={24}
                          color={isSelected ? '#FFFFFF' : '#747688'}
                        />
                      )}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.catName,
                        isSelected && styles.catNameActive,
                      ]}>
                      {cat.name}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>

            {/* Time & Date Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Time & Date</Text>

              {/* Time Filter Pills */}
              <View style={styles.timePillsRow}>
                {(['today', 'tomorrow', 'this_week'] as const).map((t) => {
                  const isActive = selectedTime === t;
                  const label =
                    t === 'today' ? 'Today' : t === 'tomorrow' ? 'Tomorrow' : 'This week';
                  return (
                    <TouchableOpacity
                      key={t}
                      activeOpacity={0.8}
                      onPress={() => setSelectedTime(t)}
                      style={[styles.timePill, isActive && styles.timePillActive]}>
                      <Text
                        style={[
                          styles.timePillText,
                          isActive && styles.timePillTextActive,
                        ]}>
                        {label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Choose from calendar button */}
              <TouchableOpacity activeOpacity={0.7} style={styles.calendarPickerBtn}>
                <View style={styles.calendarPickerLeft}>
                  <Ionicons name="calendar-outline" size={18} color="#5669FF" />
                  <Text style={styles.calendarPickerText}>Choose from calender</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#747688" />
              </TouchableOpacity>
            </View>

            {/* Location Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Location</Text>
              <TouchableOpacity activeOpacity={0.8} style={styles.locationCard}>
                <View style={styles.locationPinBox}>
                  <Ionicons name="location-outline" size={20} color="#5669FF" />
                </View>
                <Text style={styles.locationText}>{locationName}</Text>
                <Ionicons name="chevron-forward" size={18} color="#747688" />
              </TouchableOpacity>
            </View>

            {/* Price Range Section */}
            <View style={styles.section}>
              <View style={styles.priceHeaderRow}>
                <Text style={styles.sectionTitle}>Select price range</Text>
                <Text style={styles.priceRangeVal}>
                  ${priceRange.min}-${priceRange.max}
                </Text>
              </View>

              {/* Histogram Distribution Chart */}
              <View style={styles.histogramContainer}>
                {histogramBars.map((h, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.histogramBar,
                      { height: h * 0.4 },
                      idx >= 3 && idx <= 13 ? styles.histogramBarActive : null,
                    ]}
                  />
                ))}
              </View>

              {/* Slider Track Representation */}
              <View style={styles.sliderTrackContainer}>
                <View style={styles.sliderTrackBg} />
                <View style={styles.sliderTrackActive} />

                {/* Left Knob */}
                <View style={[styles.sliderKnob, { left: '15%' }]}>
                  <Ionicons name="code" size={12} color="#5669FF" style={{ transform: [{ rotate: '90deg' }] }} />
                </View>

                {/* Right Knob */}
                <View style={[styles.sliderKnob, { right: '15%' }]}>
                  <Ionicons name="code" size={12} color="#5669FF" style={{ transform: [{ rotate: '90deg' }] }} />
                </View>
              </View>
            </View>

            <View style={{ height: 20 }} />
          </ScrollView>

          {/* Bottom Action Buttons: RESET & APPLY */}
          <View style={styles.bottomButtonsRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleReset}
              style={styles.resetBtn}>
              <Text style={styles.resetBtnText}>RESET</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleApply}
              style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>APPLY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(18, 13, 38, 0.4)',
    justifyContent: 'flex-end',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    maxHeight: '92%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  handleBar: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E4DFDF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#120D26',
    marginTop: 6,
    marginBottom: 16,
  },
  scrollBody: {
    paddingBottom: 16,
  },
  categoriesRow: {
    gap: 16,
    paddingVertical: 6,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 6,
  },
  catCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  catCircleActive: {
    backgroundColor: '#5669FF',
    borderColor: '#5669FF',
  },
  catName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#747688',
  },
  catNameActive: {
    color: '#120D26',
    fontWeight: '700',
  },
  section: {
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#120D26',
    marginBottom: 12,
  },
  timePillsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  timePill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    backgroundColor: '#FFFFFF',
  },
  timePillActive: {
    backgroundColor: '#5669FF',
    borderColor: '#5669FF',
  },
  timePillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#747688',
  },
  timePillTextActive: {
    color: '#FFFFFF',
  },
  calendarPickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
  },
  calendarPickerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  calendarPickerText: {
    fontSize: 13,
    color: '#747688',
    fontWeight: '500',
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    borderRadius: 14,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
  },
  locationPinBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#ECEBFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#120D26',
    marginLeft: 12,
  },
  priceHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceRangeVal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5669FF',
  },
  histogramContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 44,
    marginTop: 10,
    paddingHorizontal: 12,
  },
  histogramBar: {
    width: 8,
    backgroundColor: '#E4DFDF',
    borderRadius: 4,
  },
  histogramBarActive: {
    backgroundColor: '#CAD1FF',
  },
  sliderTrackContainer: {
    height: 30,
    justifyContent: 'center',
    position: 'relative',
    marginTop: 6,
  },
  sliderTrackBg: {
    height: 3,
    backgroundColor: '#E4DFDF',
    borderRadius: 1.5,
  },
  sliderTrackActive: {
    position: 'absolute',
    left: '15%',
    right: '15%',
    height: 3,
    backgroundColor: '#5669FF',
  },
  sliderKnob: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#5669FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomButtonsRow: {
    flexDirection: 'row',
    gap: 14,
    paddingTop: 8,
  },
  resetBtn: {
    width: '35%',
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#120D26',
    letterSpacing: 0.8,
  },
  applyBtn: {
    flex: 1,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#5669FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5669FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  applyBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
});
