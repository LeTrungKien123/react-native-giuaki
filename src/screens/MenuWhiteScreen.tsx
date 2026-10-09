import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface MenuWhiteScreenProps {
  onClose?: () => void;
  onNavigate?: (screen: string) => void;
}

interface MenuItem {
  id: string;
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  badge?: number;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'profile', title: 'My Profile', iconName: 'person-outline' },
  { id: 'massage', title: 'Massage', iconName: 'chatbubble-ellipses-outline', badge: 3 },
  { id: 'calender', title: 'Calender', iconName: 'calendar-outline' },
  { id: 'bookmark', title: 'Bookmark', iconName: 'bookmark-outline' },
  { id: 'contact', title: 'Contact Us', iconName: 'mail-outline' },
  { id: 'settings', title: 'Settings', iconName: 'settings-outline' },
  { id: 'help', title: 'Helps & FAQs', iconName: 'help-circle-outline' },
  { id: 'signout', title: 'Sign Out', iconName: 'log-out-outline' },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(Math.round(SCREEN_WIDTH * 0.78), 320);

export const MenuWhiteScreen: React.FC<MenuWhiteScreenProps> = ({
  onClose,
  onNavigate,
}) => {
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const isClosing = useRef(false);

  // Entrance slide-in animation from left
  useEffect(() => {
    isClosing.current = false;
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateX, backdropOpacity]);

  // Smooth exit slide-out animation to left
  const handleClose = () => {
    if (isClosing.current) return;
    isClosing.current = true;

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -DRAWER_WIDTH,
        duration: 250,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 250,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };

  const handleItemPress = (itemId: string) => {
    if (isClosing.current) return;
    isClosing.current = true;

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -DRAWER_WIDTH,
        duration: 220,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 220,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      onNavigate?.(itemId);
    });
  };

  // Android hardware back button listener
  useEffect(() => {
    const onBackPress = () => {
      handleClose();
      return true;
    };
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );
    return () => subscription.remove();
  }, []);

  // PanResponder to allow swiping left to dismiss
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dx < -8 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx <= 0) {
          translateX.setValue(gestureState.dx);
          const ratio = Math.max(0, 1 + gestureState.dx / DRAWER_WIDTH);
          backdropOpacity.setValue(ratio);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -DRAWER_WIDTH * 0.28 || gestureState.vx < -0.4) {
          handleClose();
        } else {
          Animated.parallel([
            Animated.spring(translateX, {
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
          Animated.spring(translateX, {
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

  return (
    <View style={styles.overlayRoot} pointerEvents="box-none">
      {/* Semi-transparent dark backdrop */}
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.backdrop,
            { opacity: backdropOpacity },
          ]}
        />
      </TouchableWithoutFeedback>

      {/* Slide Drawer Panel from left */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.drawerContainer,
          {
            width: DRAWER_WIDTH,
            transform: [{ translateX }],
          },
        ]}>
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left']}>
          <View style={styles.innerContainer}>
            {/* Top Header Row with Profile Info & Close Button */}
            <View style={styles.topHeader}>
              <View style={styles.userSection}>
                <View style={styles.avatarWrapper}>
                  <LinearGradient
                    colors={['#8E9EAB', '#4A5568']}
                    style={styles.avatar}>
                    <Ionicons name="person" size={34} color="#FFFFFF" />
                  </LinearGradient>
                </View>
                <Text style={styles.userName}>Ashfak Sayem</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleClose}
                style={styles.closeBtn}>
                <Ionicons name="close" size={22} color="#747688" />
              </TouchableOpacity>
            </View>

            {/* Menu Navigation List */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.menuList}>
              {MENU_ITEMS.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.65}
                  onPress={() => handleItemPress(item.id)}
                  style={styles.menuRow}>
                  <View style={styles.menuIconContainer}>
                    <Ionicons name={item.iconName} size={22} color="#747688" />
                    {item.badge !== undefined && (
                      <View style={styles.badgeCircle}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Bottom "Upgrade Pro" Button */}
            <View style={styles.bottomUpgradeContainer}>
              <TouchableOpacity activeOpacity={0.85} style={styles.upgradeBtn}>
                <MaterialCommunityIcons name="crown" size={18} color="#00D2FF" />
                <Text style={styles.upgradeBtnText}>Upgrade Pro</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayRoot: {
    ...StyleSheet.absoluteFill,
    zIndex: 9999,
    elevation: 9999,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: '#000000',
    shadowOffset: { width: 6, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 20,
    overflow: 'hidden',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  userSection: {
    alignItems: 'flex-start',
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#120D26',
    letterSpacing: -0.2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuList: {
    paddingVertical: 4,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },
  menuIconContainer: {
    width: 30,
    alignItems: 'flex-start',
    position: 'relative',
  },
  badgeCircle: {
    position: 'absolute',
    top: -4,
    right: 2,
    backgroundColor: '#F59762',
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  menuTitle: {
    fontSize: 15,
    color: '#120D26',
    fontWeight: '500',
    marginLeft: 12,
  },
  bottomUpgradeContainer: {
    paddingTop: 16,
    alignItems: 'flex-start',
  },
  upgradeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F9FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  upgradeBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00D2FF',
  },
});
