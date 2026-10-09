import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Alert,
  Animated,
  Easing,
  PanResponder,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface ShareScreenProps {
  onClose?: () => void;
  onOpenInvite?: () => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_HEIGHT = 440;

interface ShareOption {
  id: string;
  name: string;
  iconName: string;
  iconFamily: 'Ionicons' | 'FontAwesome5' | 'MaterialCommunityIcons';
  bgColor?: string;
  gradientColors?: [string, string, ...string[]];
}

const SHARE_OPTIONS: ShareOption[] = [
  {
    id: 'copy',
    name: 'Copy Link',
    iconName: 'copy-outline',
    iconFamily: 'Ionicons',
    bgColor: '#E6E8EC',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    iconName: 'whatsapp',
    iconFamily: 'FontAwesome5',
    bgColor: '#25D366',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    iconName: 'facebook-f',
    iconFamily: 'FontAwesome5',
    bgColor: '#1877F2',
  },
  {
    id: 'messenger',
    name: 'Messenger',
    iconName: 'facebook-messenger',
    iconFamily: 'FontAwesome5',
    gradientColors: ['#00B2FE', '#006AFF', '#A033FF', '#FF5280'],
  },
  {
    id: 'twitter',
    name: 'Twitter',
    iconName: 'twitter',
    iconFamily: 'FontAwesome5',
    bgColor: '#1DA1F2',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    iconName: 'instagram',
    iconFamily: 'FontAwesome5',
    gradientColors: ['#405DE6', '#833AB4', '#C13584', '#E1306C', '#FD1D1D', '#F77737', '#FCAF45'],
  },
  {
    id: 'skype',
    name: 'Skype',
    iconName: 'skype',
    iconFamily: 'FontAwesome5',
    bgColor: '#00AFF0',
  },
  {
    id: 'massage',
    name: 'Massage',
    iconName: 'chatbubble',
    iconFamily: 'Ionicons',
    bgColor: '#4CD964',
  },
];

export const ShareScreen: React.FC<ShareScreenProps> = ({
  onClose,
  onOpenInvite,
}) => {
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const isClosing = useRef(false);

  // Smooth slide up from bottom on mount
  useEffect(() => {
    isClosing.current = false;
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 290,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 290,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, backdropOpacity]);

  // Smooth slide down to bottom on exit
  const handleClose = () => {
    if (isClosing.current) return;
    isClosing.current = true;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SHEET_HEIGHT,
        duration: 240,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 240,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };

  const handleOpenInvite = () => {
    if (isClosing.current) return;
    isClosing.current = true;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SHEET_HEIGHT,
        duration: 220,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onOpenInvite?.();
    });
  };

  // Android back button
  useEffect(() => {
    const onBackPress = () => {
      handleClose();
      return true;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, []);

  // PanResponder to allow dragging down the sheet
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 6 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
          const progress = Math.max(0, 1 - gestureState.dy / SHEET_HEIGHT);
          backdropOpacity.setValue(progress);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 70 || gestureState.vy > 0.4) {
          handleClose();
        } else {
          Animated.parallel([
            Animated.spring(translateY, {
              toValue: 0,
              bounciness: 4,
              useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            }),
          ]).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 0,
            bounciness: 4,
            useNativeDriver: true,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      },
    })
  ).current;

  const handleSelectShare = (item: ShareOption) => {
    if (item.id === 'copy') {
      Alert.alert('Sao chép liên kết', 'Đã sao chép liên kết sự kiện vào bộ nhớ tạm!');
    } else {
      Alert.alert(`Chia sẻ qua ${item.name}`, `Đang mở ứng dụng ${item.name}...`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Event Details Screen Simulation */}
      <View style={styles.backgroundEventContainer}>
        {/* Hero Concert Banner */}
        <View style={styles.heroBanner}>
          <LinearGradient
            colors={['#1E130C', '#8A1515', '#451B2E', '#16192E']}
            style={styles.heroGradient}>
            <View style={styles.crowdVisual}>
              <Ionicons name="musical-notes" size={40} color="rgba(255,255,255,0.25)" />
              <FontAwesome5 name="guitar" size={32} color="rgba(255,255,255,0.2)" />
            </View>
          </LinearGradient>

          {/* Top Bar */}
          <SafeAreaView edges={['top']} style={styles.topSafeArea}>
            <View style={styles.topBar}>
              <TouchableOpacity activeOpacity={0.7} style={styles.backBtn} onPress={handleClose}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.topTitle}>Event Details</Text>
              <View style={styles.bookmarkBadge}>
                <Ionicons name="bookmark" size={18} color="#FFFFFF" />
              </View>
            </View>
          </SafeAreaView>

          {/* Floating Attendees Card */}
          <View style={styles.attendeesCard}>
            <View style={styles.attendeesLeft}>
              <View style={styles.avatarGroup}>
                <View style={[styles.avatarDot, { backgroundColor: '#FFA07A' }]}>
                  <Text style={styles.avatarLetter}>A</Text>
                </View>
                <View style={[styles.avatarDot, { backgroundColor: '#5669FF', marginLeft: -8 }]}>
                  <Text style={styles.avatarLetter}>B</Text>
                </View>
                <View style={[styles.avatarDot, { backgroundColor: '#4CAF50', marginLeft: -8 }]}>
                  <Text style={styles.avatarLetter}>C</Text>
                </View>
              </View>
              <Text style={styles.goingText}>+20 Going</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleOpenInvite}
              style={styles.inviteBtn}>
              <Text style={styles.inviteBtnText}>Invite</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Event Info Header */}
        <View style={styles.eventInfoContainer}>
          <Text style={styles.eventMainTitle}>
            International Band{'\n'}Music Concert
          </Text>

          <View style={styles.dateRow}>
            <View style={styles.calendarIconBox}>
              <Ionicons name="calendar" size={22} color="#5669FF" />
            </View>
            <View>
              <Text style={styles.dateTitle}>14 December, 2021</Text>
              <Text style={styles.dateSubtitle}>Tuesday, 4:00PM - 9:00PM</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Dimmed Overlay */}
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View
          style={[
            styles.dimmedBackdrop,
            { opacity: backdropOpacity },
          ]}
        />
      </TouchableWithoutFeedback>

      {/* Bottom Sheet "Share with friends" (Slides up from bottom) */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.bottomSheet,
          {
            transform: [{ translateY }],
          },
        ]}>
        {/* Handle Bar */}
        <View style={styles.handleBarWrapper}>
          <View style={styles.handleBar} />
        </View>

        {/* Title */}
        <Text style={styles.sheetTitle}>Share with friends</Text>

        {/* Share Options Grid (2 rows x 4 cols) */}
        <View style={styles.gridContainer}>
          {SHARE_OPTIONS.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.75}
              onPress={() => handleSelectShare(item)}
              style={styles.shareItem}>
              {item.gradientColors ? (
                <LinearGradient
                  colors={item.gradientColors}
                  style={styles.iconCircle}>
                  {item.iconFamily === 'Ionicons' && (
                    <Ionicons name={item.iconName as any} size={22} color="#FFFFFF" />
                  )}
                  {item.iconFamily === 'FontAwesome5' && (
                    <FontAwesome5 name={item.iconName} size={20} color="#FFFFFF" />
                  )}
                </LinearGradient>
              ) : (
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: item.bgColor || '#F2F2F2' },
                  ]}>
                  {item.iconFamily === 'Ionicons' && (
                    <Ionicons
                      name={item.iconName as any}
                      size={22}
                      color={item.id === 'copy' ? '#747688' : '#FFFFFF'}
                    />
                  )}
                  {item.iconFamily === 'FontAwesome5' && (
                    <FontAwesome5 name={item.iconName} size={20} color="#FFFFFF" />
                  )}
                </View>
              )}
              <Text style={styles.shareItemText} numberOfLines={1}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Cancel Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleClose}
          style={styles.cancelBtn}>
          <Text style={styles.cancelBtnText}>CANCEL</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
  },
  backgroundEventContainer: {
    ...StyleSheet.absoluteFill,
  },
  heroBanner: {
    height: 240,
    position: 'relative',
  },
  heroGradient: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crowdVisual: {
    flexDirection: 'row',
    gap: 30,
    opacity: 0.6,
  },
  topSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bookmarkBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attendeesCard: {
    position: 'absolute',
    bottom: -22,
    left: 40,
    right: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  attendeesLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarGroup: {
    flexDirection: 'row',
  },
  avatarDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarLetter: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  goingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3F38DD',
  },
  inviteBtn: {
    backgroundColor: '#3F38DD',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 16,
  },
  inviteBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  eventInfoContainer: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
  eventMainTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#120D26',
    lineHeight: 32,
    marginBottom: 20,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  calendarIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EEF0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#120D26',
    marginBottom: 3,
  },
  dateSubtitle: {
    fontSize: 12,
    color: '#747688',
  },
  dimmedBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 24,
  },
  handleBarWrapper: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#120D26',
    marginTop: 10,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
    marginBottom: 24,
  },
  shareItem: {
    width: (SCREEN_WIDTH - 48 - 36) / 4,
    alignItems: 'center',
    gap: 6,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  shareItemText: {
    fontSize: 11,
    color: '#747688',
    textAlign: 'center',
    fontWeight: '500',
  },
  cancelBtn: {
    backgroundColor: '#F0F2F5',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5B6275',
    letterSpacing: 0.5,
  },
});
