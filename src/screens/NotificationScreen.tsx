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

export interface NotificationItem {
  id: string;
  userName: string;
  actionText: string;
  time: string;
  type: 'invite' | 'follow' | 'like' | 'join';
  avatarBg: string;
  avatarIcon: keyof typeof Ionicons.glyphMap;
  status?: 'pending' | 'accepted' | 'rejected';
}

interface NotificationScreenProps {
  onBack?: () => void;
  onMenuPress?: () => void;
  onSelectEvent?: (eventId?: string) => void;
  onViewEmpty?: () => void;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    userName: 'David Silbia',
    actionText: "Invite Jo Malone London's Mother's",
    time: 'Just now',
    type: 'invite',
    avatarBg: '#F9A825',
    avatarIcon: 'person',
    status: 'pending',
  },
  {
    id: '2',
    userName: 'Adnan Safi',
    actionText: 'Started following you',
    time: '5 min ago',
    type: 'follow',
    avatarBg: '#424242',
    avatarIcon: 'person',
  },
  {
    id: '3',
    userName: 'Joan Baker',
    actionText: 'Invite A virtual Evening of Smooth Jazz',
    time: '20 min ago',
    type: 'invite',
    avatarBg: '#78909C',
    avatarIcon: 'person',
    status: 'pending',
  },
  {
    id: '4',
    userName: 'Ronald C. Kinch',
    actionText: 'Like you events',
    time: '1 hr ago',
    type: 'like',
    avatarBg: '#3F51B5',
    avatarIcon: 'person',
  },
  {
    id: '5',
    userName: 'Clara Tolson',
    actionText: 'Join your Event Gala Music Festival',
    time: '9 hr ago',
    type: 'join',
    avatarBg: '#C62828',
    avatarIcon: 'person',
  },
  {
    id: '6',
    userName: 'Jennifer Fritz',
    actionText: 'Invite you International Kids Safe',
    time: 'Tue , 5:10 pm',
    type: 'invite',
    avatarBg: '#FFB300',
    avatarIcon: 'person',
    status: 'pending',
  },
  {
    id: '7',
    userName: 'Eric G. Prickett',
    actionText: 'Started following you',
    time: 'Wed, 3:30 pm',
    type: 'follow',
    avatarBg: '#90A4AE',
    avatarIcon: 'person',
  },
];

export const NotificationScreen: React.FC<NotificationScreenProps> = ({
  onBack,
  onMenuPress,
  onSelectEvent,
  onViewEmpty,
}) => {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const handleAccept = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'accepted' } : item
      )
    );
  };

  const handleReject = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'rejected' } : item
      )
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Xóa tất cả thông báo',
      'Bạn có chắc muốn xóa tất cả thông báo?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            setNotifications([]);
            onViewEmpty?.();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header: Back arrow, Title "Notification", 3-dots */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={24} color="#120D26" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Notification</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={
              onMenuPress ||
              (() =>
                Alert.alert('Tùy chọn', undefined, [
                  { text: 'Xem màn hình Empty', onPress: onViewEmpty },
                  { text: 'Xóa tất cả thông báo', onPress: handleClearAll },
                  { text: 'Đóng', style: 'cancel' },
                ]))
            }
            style={styles.headerBtn}>
            <Ionicons name="ellipsis-vertical" size={20} color="#120D26" />
          </TouchableOpacity>
        </View>

        {/* List of Notifications */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {notifications.map((item) => (
            <View key={item.id} style={styles.notificationRow}>
              {/* Avatar Icon / Circle */}
              <View
                style={[
                  styles.avatarContainer,
                  { backgroundColor: item.avatarBg },
                ]}>
                <Ionicons name={item.avatarIcon} size={24} color="#FFFFFF" />
              </View>

              {/* Main Content */}
              <View style={styles.contentContainer}>
                {/* Text & Time */}
                <View style={styles.textTimeRow}>
                  <Text style={styles.messageText}>
                    <Text style={styles.userName}>{item.userName} </Text>
                    <Text style={styles.actionText}>{item.actionText}</Text>
                  </Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>

                {/* Invite Action Buttons (Reject / Accept) */}
                {item.type === 'invite' && (
                  <View style={styles.actionsRow}>
                    {item.status === 'pending' ? (
                      <>
                        <TouchableOpacity
                          activeOpacity={0.75}
                          onPress={() => handleReject(item.id)}
                          style={styles.rejectBtn}>
                          <Text style={styles.rejectBtnText}>Reject</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={0.85}
                          onPress={() => handleAccept(item.id)}
                          style={styles.acceptBtn}>
                          <Text style={styles.acceptBtnText}>Accept</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <View
                        style={[
                          styles.statusBadge,
                          item.status === 'accepted'
                            ? styles.statusAccepted
                            : styles.statusRejected,
                        ]}>
                        <Ionicons
                          name={
                            item.status === 'accepted'
                              ? 'checkmark-circle'
                              : 'close-circle'
                          }
                          size={14}
                          color={
                            item.status === 'accepted' ? '#27AE60' : '#EB5757'
                          }
                        />
                        <Text
                          style={[
                            styles.statusText,
                            {
                              color:
                                item.status === 'accepted'
                                  ? '#27AE60'
                                  : '#EB5757',
                            },
                          ]}>
                          {item.status === 'accepted' ? 'Accepted' : 'Rejected'}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>
          ))}

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
    paddingHorizontal: 20,
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
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#120D26',
  },
  scrollContent: {
    paddingTop: 12,
    paddingBottom: 24,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
  },
  avatarContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  contentContainer: {
    flex: 1,
  },
  textTimeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    paddingRight: 8,
  },
  userName: {
    fontWeight: '700',
    color: '#120D26',
  },
  actionText: {
    color: '#50555C',
    fontWeight: '400',
  },
  timeText: {
    fontSize: 12,
    color: '#9E9E9E',
    fontWeight: '400',
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  rejectBtn: {
    paddingVertical: 9,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#747688',
  },
  acceptBtn: {
    paddingVertical: 9,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#5669FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5669FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  acceptBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  statusAccepted: {
    backgroundColor: '#E8F8F0',
  },
  statusRejected: {
    backgroundColor: '#FDECEC',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
