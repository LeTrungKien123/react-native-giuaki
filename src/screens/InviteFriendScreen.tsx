import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  Animated,
  Easing,
  PanResponder,
  BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export interface FriendItem {
  id: string;
  name: string;
  followers: string;
  avatarBg: string;
  avatarGradient: [string, string, ...string[]];
  initialChecked: boolean;
}

interface InviteFriendScreenProps {
  onClose?: () => void;
  onInviteSuccess?: (count: number) => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_HEIGHT = Math.round(SCREEN_HEIGHT * 0.92);

const FRIENDS_LIST: FriendItem[] = [
  {
    id: '1',
    name: 'Alex Lee',
    followers: '2k Followers',
    avatarBg: '#3F51B5',
    avatarGradient: ['#4A5568', '#2D3748'],
    initialChecked: true,
  },
  {
    id: '2',
    name: 'Micheal Ulasi',
    followers: '56 Followers',
    avatarBg: '#5C6BC0',
    avatarGradient: ['#2B5876', '#4E4376'],
    initialChecked: false,
  },
  {
    id: '3',
    name: 'Cristofer',
    followers: '300 Followers',
    avatarBg: '#78909C',
    avatarGradient: ['#757F9A', '#D7DDE8'],
    initialChecked: true,
  },
  {
    id: '4',
    name: 'David Silbia',
    followers: '5k Followers',
    avatarBg: '#303F9F',
    avatarGradient: ['#5669FF', '#3D56F0'],
    initialChecked: false,
  },
  {
    id: '5',
    name: 'Ashfak Sayem',
    followers: '402 Followers',
    avatarBg: '#FFA000',
    avatarGradient: ['#F7971E', '#FFD200'],
    initialChecked: true,
  },
  {
    id: '6',
    name: 'Rocks Velkeinjen',
    followers: '893 Followers',
    avatarBg: '#8D6E63',
    avatarGradient: ['#BA8B02', '#181818'],
    initialChecked: false,
  },
  {
    id: '7',
    name: 'Roman Kutepov',
    followers: '225 Followers',
    avatarBg: '#E91E63',
    avatarGradient: ['#FF512F', '#DD2476'],
    initialChecked: true,
  },
  {
    id: '8',
    name: 'Cristofer Nolan',
    followers: '322 Followers',
    avatarBg: '#26A69A',
    avatarGradient: ['#00B4DB', '#0083B0'],
    initialChecked: false,
  },
  {
    id: '9',
    name: 'Jhon Wick',
    followers: '12k Followers',
    avatarBg: '#455A64',
    avatarGradient: ['#1F1C2C', '#928DAB'],
    initialChecked: true,
  },
  {
    id: '10',
    name: 'Zenifero Bolex',
    followers: '2k Followers',
    avatarBg: '#607D8B',
    avatarGradient: ['#616161', '#9bc5c3'],
    initialChecked: false,
  },
];

export const InviteFriendScreen: React.FC<InviteFriendScreenProps> = ({
  onClose,
  onInviteSuccess,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>(
    FRIENDS_LIST.filter((f) => f.initialChecked).map((f) => f.id)
  );

  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const isClosing = useRef(false);

  // Smooth entrance: slide up from bottom
  useEffect(() => {
    isClosing.current = false;
    Animated.parallel([
      Animated.timing(translateY, {
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
  }, [translateY, backdropOpacity]);

  // Smooth exit: slide down to bottom
  const handleClose = () => {
    if (isClosing.current) return;
    isClosing.current = true;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SHEET_HEIGHT,
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

  // Android back button
  useEffect(() => {
    const onBackPress = () => {
      handleClose();
      return true;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, []);

  // PanResponder to allow swiping / dragging down to dismiss
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 6 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
          const progress = Math.max(0, 1 - gestureState.dy / (SCREEN_HEIGHT * 0.5));
          backdropOpacity.setValue(progress);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 80 || gestureState.vy > 0.4) {
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

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFriends = FRIENDS_LIST.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = () => {
    const count = selectedIds.length;
    if (count === 0) {
      Alert.alert('Chưa chọn bạn bè', 'Vui lòng chọn ít nhất một người để gửi lời mời.');
      return;
    }

    if (onInviteSuccess) {
      onInviteSuccess(count);
    } else {
      Alert.alert(
        'Đã gửi lời mời!',
        `Bạn đã gửi lời mời thành công đến ${count} người bạn.`,
        [{ text: 'OK', onPress: handleClose }]
      );
    }
  };

  return (
    <View style={styles.backdrop}>
      {/* Dimmed Background Overlay */}
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View
          style={[
            styles.dimmedArea,
            { opacity: backdropOpacity },
          ]}
        />
      </TouchableWithoutFeedback>

      {/* Bottom Sheet Modal Container (Slides up from bottom) */}
      <Animated.View
        style={[
          styles.sheetContainer,
          {
            transform: [{ translateY }],
          },
        ]}>
        {/* Drag Handle Bar with Gesture */}
        <View {...panResponder.panHandlers} style={styles.handleBarWrapper}>
          <View style={styles.handleBar} />
        </View>

        {/* Title */}
        <View style={styles.titleRow}>
          <Text style={styles.sheetTitle}>Invite Friend</Text>
          {onClose && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleClose}
              style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#747688" />
            </TouchableOpacity>
          )}
        </View>

        {/* Search Input Bar */}
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#A0A3BD"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          <TouchableOpacity activeOpacity={0.7} style={styles.searchIconBtn}>
            <Ionicons name="search" size={20} color="#5669FF" />
          </TouchableOpacity>
        </View>

        {/* Friends Scrollable List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollList}>
          {filteredFriends.map((friend) => {
            const isSelected = selectedIds.includes(friend.id);
            return (
              <TouchableOpacity
                key={friend.id}
                activeOpacity={0.75}
                onPress={() => toggleSelect(friend.id)}
                style={styles.friendRow}>
                {/* Avatar */}
                <LinearGradient
                  colors={friend.avatarGradient}
                  style={styles.avatar}>
                  <Ionicons name="person" size={22} color="#FFFFFF" />
                </LinearGradient>

                {/* Info: Name & Followers count */}
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <Text style={styles.friendFollowers}>{friend.followers}</Text>
                </View>

                {/* Checkbox */}
                <View
                  style={[
                    styles.checkbox,
                    isSelected ? styles.checkboxSelected : styles.checkboxUnselected,
                  ]}>
                  {isSelected ? (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  ) : (
                    <Ionicons name="checkmark" size={14} color="#D1D5DB" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          <View style={{ height: 110 }} />
        </ScrollView>

        {/* Floating Bottom INVITE Button */}
        <View style={styles.floatingButtonContainer}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleInvite}
            style={styles.inviteButton}>
            <View style={{ width: 28 }} />
            <Text style={styles.inviteButtonText}>
              INVITE {selectedIds.length > 0 ? `(${selectedIds.length})` : ''}
            </Text>
            <View style={styles.arrowCircle}>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(13, 14, 25, 0.75)',
    justifyContent: 'flex-end',
  },
  dimmedArea: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(13, 14, 25, 0.75)',
  },
  sheetContainer: {
    height: '92%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingTop: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 24,
  },
  handleBarWrapper: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#120D26',
  },
  closeBtn: {
    padding: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E8EC',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#120D26',
    paddingVertical: 8,
  },
  searchIconBtn: {
    padding: 4,
  },
  scrollList: {
    paddingTop: 4,
    paddingBottom: 24,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#120D26',
    marginBottom: 2,
  },
  friendFollowers: {
    fontSize: 12,
    color: '#747688',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#5669FF',
  },
  checkboxUnselected: {
    borderWidth: 1.5,
    borderColor: '#E6E8EC',
    backgroundColor: '#FFFFFF',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
  inviteButton: {
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
  inviteButtonText: {
    fontSize: 16,
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
