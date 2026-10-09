import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { SplashScreen } from './SplashScreen';
import { OnboardingScreen1 } from './OnboardingScreen1';
import { OnboardingScreen2 } from './OnboardingScreen2';
import { OnboardingScreen3 } from './OnboardingScreen3';
import { SignInScreen } from './SignInScreen';
import { SignUpScreen } from './SignUpScreen';
import { VerificationScreen } from './VerificationScreen';
import { ResetPasswordScreen } from './ResetPasswordScreen';
import { MenuWhiteScreen } from './MenuWhiteScreen';
import { HomeScreen } from './HomeScreen';
import { EventDetailsScreen } from './EventDetailsScreen';
import { MapViewScreen } from './MapViewScreen';
import { SearchScreen } from './SearchScreen';
import { EmptyEventsScreen } from './EmptyEventsScreen';
import { SeeAllEventsScreen } from './SeeAllEventsScreen';
import { FilterScreen } from './FilterScreen';
import { MyProfileScreen } from './MyProfileScreen';
import { OrganizerProfileScreen } from './OrganizerProfileScreen';
import { EmptyNotificationScreen } from './EmptyNotificationScreen';
import { NotificationScreen } from './NotificationScreen';
import { InviteFriendScreen } from './InviteFriendScreen';
import { ShareScreen } from './ShareScreen';

export type ScreenKey =
  | 'splash'
  | 'onboarding1'
  | 'onboarding2'
  | 'onboarding3'
  | 'signin'
  | 'signup'
  | 'verification'
  | 'resetpassword'
  | 'menuwhite'
  | 'home'
  | 'eventdetails'
  | 'mapview'
  | 'search'
  | 'emptyevents'
  | 'seeallevents'
  | 'filter'
  | 'myprofile'
  | 'organizer_about'
  | 'organizer_event'
  | 'organizer_reviews'
  | 'emptynotification'
  | 'notifications'
  | 'invitefriend'
  | 'sharesheet';

interface ScreenTab {
  key: ScreenKey;
  label: string;
  badge: string;
}

const TAB_ORDER: Record<ScreenKey, number> = {
  splash: 0,
  onboarding1: 1,
  onboarding2: 2,
  onboarding3: 3,
  signin: 4,
  signup: 5,
  verification: 6,
  resetpassword: 7,
  menuwhite: 8,
  home: 9,
  eventdetails: 10,
  mapview: 11,
  search: 12,
  emptyevents: 13,
  seeallevents: 14,
  filter: 15,
  myprofile: 16,
  organizer_about: 17,
  organizer_event: 18,
  organizer_reviews: 19,
  emptynotification: 20,
  notifications: 21,
  invitefriend: 22,
  sharesheet: 23,
};

const TABS: ScreenTab[] = [
  { key: 'splash', label: 'Splash', badge: '1' },
  { key: 'onboarding1', label: 'Onboard 1', badge: '2' },
  { key: 'onboarding2', label: 'Onboard 2', badge: '3' },
  { key: 'onboarding3', label: 'Onboard 3', badge: '4' },
  { key: 'signin', label: 'Sign In', badge: '5' },
  { key: 'signup', label: 'Sign Up', badge: '6' },
  { key: 'verification', label: 'Verify', badge: '7' },
  { key: 'resetpassword', label: 'Reset Pass', badge: '8' },
  { key: 'menuwhite', label: 'Menu White', badge: '9' },
  { key: 'home', label: 'Home', badge: '10' },
  { key: 'eventdetails', label: 'Event Details', badge: '11' },
  { key: 'mapview', label: 'Map View', badge: '12' },
  { key: 'search', label: 'Search', badge: '13' },
  { key: 'emptyevents', label: 'Empty Events', badge: '14' },
  { key: 'seeallevents', label: 'See All Events', badge: '15' },
  { key: 'filter', label: 'Filter', badge: '16' },
  { key: 'myprofile', label: 'My Profile', badge: '17' },
  { key: 'organizer_about', label: 'Org - About', badge: '18' },
  { key: 'organizer_event', label: 'Org - Event', badge: '19' },
  { key: 'organizer_reviews', label: 'Org - Review', badge: '20' },
  { key: 'emptynotification', label: 'Empty Notif', badge: '21' },
  { key: 'notifications', label: 'Notification', badge: '22' },
  { key: 'invitefriend', label: 'Invite Friend', badge: '23' },
  { key: 'sharesheet', label: 'Share', badge: '24' },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const EventHubContainer: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenKey>('splash');
  const [activeScreen, setActiveScreen] = useState<ScreenKey>('splash');
  const [outgoingScreen, setOutgoingScreen] = useState<ScreenKey | null>(null);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  const transitionProgress = useRef(new Animated.Value(1)).current;

  const [recipientEmail, setRecipientEmail] = useState('abc@email.com');
  const [previousScreen, setPreviousScreen] = useState<ScreenKey>('signup');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Smooth Screen Navigation Handler
  const navigateTo = (
    nextScreen: ScreenKey,
    forcedDirection?: 'forward' | 'backward'
  ) => {
    if (nextScreen === activeScreen) return;

    // Between home and menuwhite, handle with slide-in drawer
    if (
      (activeScreen === 'home' && nextScreen === 'menuwhite') ||
      (activeScreen === 'menuwhite' && nextScreen === 'home')
    ) {
      setActiveScreen(nextScreen);
      setCurrentScreen(nextScreen);
      if (nextScreen === 'menuwhite') {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
      return;
    }

    // Bottom sheet screens (invitefriend, sharesheet) animate vertically from bottom
    const isBottomSheet =
      nextScreen === 'sharesheet' ||
      nextScreen === 'invitefriend' ||
      activeScreen === 'sharesheet' ||
      activeScreen === 'invitefriend';

    if (isBottomSheet) {
      setOutgoingScreen(null);
      setActiveScreen(nextScreen);
      setCurrentScreen(nextScreen);
      return;
    }

    const calculatedDir =
      forcedDirection ||
      (TAB_ORDER[nextScreen] >= TAB_ORDER[activeScreen] ? 'forward' : 'backward');

    setTransitionDirection(calculatedDir);
    setOutgoingScreen(activeScreen);
    setActiveScreen(nextScreen);
    setCurrentScreen(nextScreen);

    transitionProgress.stopAnimation();
    transitionProgress.setValue(0);

    Animated.timing(transitionProgress, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setOutgoingScreen(null);
      }
    });
  };

  // Natural flow handlers
  const handleSplashContinue = () => navigateTo('onboarding1', 'forward');
  const handleOnboard1Next = () => navigateTo('onboarding2', 'forward');
  const handleOnboard2Next = () => navigateTo('onboarding3', 'forward');
  const handleOnboard3Next = () => navigateTo('signin', 'forward');
  const handleSkip = () => navigateTo('signin', 'forward');

  // Auth flow handlers
  const handleToSignUp = () => navigateTo('signup', 'forward');
  const handleToSignIn = () => navigateTo('signin', 'backward');
  const handleToForgotPassword = () => navigateTo('resetpassword', 'forward');
  const handleSignUpSuccess = (email?: string) => {
    if (email) setRecipientEmail(email);
    setPreviousScreen('signup');
    navigateTo('verification', 'forward');
  };
  const handleVerifySuccess = () => navigateTo('home', 'forward');
  const handleResetSendSuccess = (email: string) => {
    setRecipientEmail(email);
    setPreviousScreen('resetpassword');
    navigateTo('verification', 'forward');
  };

  // Menu navigation
  const handleMenuNavigate = (id: string) => {
    setIsMenuOpen(false);
    if (id === 'signout') {
      navigateTo('signin', 'backward');
    } else if (id === 'calender') {
      navigateTo('emptyevents', 'forward');
    } else if (id === 'profile') {
      navigateTo('myprofile', 'forward');
    } else {
      navigateTo('home', 'forward');
    }
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    if (activeScreen === 'menuwhite' || currentScreen === 'menuwhite') {
      setActiveScreen('home');
      setCurrentScreen('home');
    }
  };

  // Screen content renderer
  const renderScreenContent = (screen: ScreenKey) => {
    switch (screen) {
      case 'splash':
        return <SplashScreen onContinue={handleSplashContinue} />;
      case 'onboarding1':
        return <OnboardingScreen1 onSkip={handleSkip} onNext={handleOnboard1Next} />;
      case 'onboarding2':
        return <OnboardingScreen2 onSkip={handleSkip} onNext={handleOnboard2Next} />;
      case 'onboarding3':
        return <OnboardingScreen3 onSkip={handleSkip} onNext={handleOnboard3Next} />;
      case 'signin':
        return (
          <SignInScreen
            onSignUp={handleToSignUp}
            onForgotPassword={handleToForgotPassword}
            onSuccessLogin={() => navigateTo('home', 'forward')}
          />
        );
      case 'signup':
        return (
          <SignUpScreen
            onBack={handleToSignIn}
            onSignIn={handleToSignIn}
            onSignUpSuccess={handleSignUpSuccess}
          />
        );
      case 'verification':
        return (
          <VerificationScreen
            email={recipientEmail}
            onBack={() => navigateTo(previousScreen, 'backward')}
            onVerifySuccess={handleVerifySuccess}
          />
        );
      case 'resetpassword':
        return (
          <ResetPasswordScreen
            onBack={handleToSignIn}
            onSendSuccess={handleResetSendSuccess}
          />
        );
      case 'home':
      case 'menuwhite':
        return (
          <HomeScreen
            onOpenMenu={() => setIsMenuOpen(true)}
            onNotificationPress={() => navigateTo('notifications', 'forward')}
            onEventPress={() => navigateTo('eventdetails', 'forward')}
            onNavigateToMap={() => navigateTo('mapview', 'forward')}
            onSearchPress={() => navigateTo('search', 'forward')}
            onFilterPress={() => navigateTo('filter', 'forward')}
            onSeeAllEvents={() => navigateTo('seeallevents', 'forward')}
            onEventsTabPress={() => navigateTo('emptyevents', 'forward')}
            onProfilePress={() => navigateTo('myprofile', 'forward')}
            onInvitePress={() => navigateTo('invitefriend', 'forward')}
          />
        );
      case 'eventdetails':
        return (
          <EventDetailsScreen
            onBack={() => navigateTo('home', 'backward')}
            onBuyTicket={() => {}}
            onOrganizerPress={() => navigateTo('organizer_about', 'forward')}
            onInvitePress={() => navigateTo('invitefriend', 'forward')}
            onSharePress={() => navigateTo('sharesheet', 'forward')}
          />
        );
      case 'mapview':
        return (
          <MapViewScreen
            onBack={() => navigateTo('home', 'backward')}
            onSelectEvent={() => navigateTo('eventdetails', 'forward')}
          />
        );
      case 'search':
        return (
          <SearchScreen
            onBack={() => navigateTo('home', 'backward')}
            onFilterPress={() => navigateTo('filter', 'forward')}
            onSelectEvent={() => navigateTo('eventdetails', 'forward')}
          />
        );
      case 'emptyevents':
        return (
          <EmptyEventsScreen
            onBack={() => navigateTo('home', 'backward')}
            onExploreEvents={() => navigateTo('seeallevents', 'forward')}
            onMenuPress={() => navigateTo('seeallevents', 'forward')}
          />
        );
      case 'seeallevents':
        return (
          <SeeAllEventsScreen
            onBack={() => navigateTo('home', 'backward')}
            onSearchPress={() => navigateTo('search', 'forward')}
            onSelectEvent={() => navigateTo('eventdetails', 'forward')}
            onMenuPress={() => navigateTo('emptyevents', 'forward')}
          />
        );
      case 'filter':
        return (
          <FilterScreen
            onClose={() => navigateTo('search', 'backward')}
            onApply={() => navigateTo('seeallevents', 'forward')}
            onReset={() => {}}
          />
        );
      case 'myprofile':
        return (
          <MyProfileScreen
            onBack={() => navigateTo('home', 'backward')}
            onEditProfile={() => {}}
            onChangeInterests={() => {}}
          />
        );
      case 'organizer_about':
        return (
          <OrganizerProfileScreen
            initialTab="about"
            onBack={() => navigateTo('eventdetails', 'backward')}
            onSelectEvent={() => navigateTo('eventdetails', 'forward')}
          />
        );
      case 'organizer_event':
        return (
          <OrganizerProfileScreen
            initialTab="event"
            onBack={() => navigateTo('eventdetails', 'backward')}
            onSelectEvent={() => navigateTo('eventdetails', 'forward')}
          />
        );
      case 'organizer_reviews':
        return (
          <OrganizerProfileScreen
            initialTab="reviews"
            onBack={() => navigateTo('eventdetails', 'backward')}
            onSelectEvent={() => navigateTo('eventdetails', 'forward')}
          />
        );
      case 'emptynotification':
        return (
          <EmptyNotificationScreen
            onBack={() => navigateTo('home', 'backward')}
            onViewNotifications={() => navigateTo('notifications', 'forward')}
          />
        );
      case 'notifications':
        return (
          <NotificationScreen
            onBack={() => navigateTo('home', 'backward')}
            onViewEmpty={() => navigateTo('emptynotification', 'forward')}
            onSelectEvent={() => navigateTo('eventdetails', 'forward')}
          />
        );
      case 'invitefriend':
        return (
          <InviteFriendScreen
            onClose={() => navigateTo('eventdetails', 'backward')}
            onInviteSuccess={() => navigateTo('eventdetails', 'backward')}
          />
        );
      case 'sharesheet':
        return (
          <ShareScreen
            onClose={() => navigateTo('eventdetails', 'backward')}
            onOpenInvite={() => navigateTo('invitefriend', 'forward')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Views with Butter-Smooth Transitions */}
      <View style={styles.screenContent}>
        {outgoingScreen && (
          <Animated.View
            key={`outgoing-${outgoingScreen}`}
            style={[
              StyleSheet.absoluteFill,
              styles.screenWrapper,
              {
                opacity: transitionProgress.interpolate({
                  inputRange: [0, 0.7, 1],
                  outputRange: [1, 0.3, 0],
                }),
                transform: [
                  {
                    translateX: transitionProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                        0,
                        transitionDirection === 'forward'
                          ? -SCREEN_WIDTH * 0.22
                          : SCREEN_WIDTH * 0.28,
                      ],
                    }),
                  },
                ],
              },
            ]}
            pointerEvents="none">
            {renderScreenContent(outgoingScreen)}
          </Animated.View>
        )}

        <Animated.View
          key={`active-${activeScreen}`}
          style={[
            StyleSheet.absoluteFill,
            styles.screenWrapper,
            outgoingScreen
              ? {
                  opacity: transitionProgress.interpolate({
                    inputRange: [0, 0.3, 1],
                    outputRange: [0, 0.7, 1],
                  }),
                  transform: [
                    {
                      translateX: transitionProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                          transitionDirection === 'forward'
                            ? SCREEN_WIDTH * 0.28
                            : -SCREEN_WIDTH * 0.22,
                          0,
                        ],
                      }),
                    },
                  ],
                }
              : null,
          ]}>
          {renderScreenContent(activeScreen)}
        </Animated.View>

        {/* Facebook-style Slide Drawer Menu from left */}
        {(isMenuOpen || activeScreen === 'menuwhite' || currentScreen === 'menuwhite') && (
          <MenuWhiteScreen
            onClose={handleCloseMenu}
            onNavigate={handleMenuNavigate}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  toolbarSafeArea: {
    backgroundColor: '#1E2038',
    zIndex: 999,
  },
  toolbarContainer: {
    backgroundColor: '#1E2038',
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  toolbarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  toolbarTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#00F8FF',
  },
  toolbarTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  toggleCollapseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(86, 105, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  toggleCollapseText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#00F8FF',
  },
  tabsScrollContent: {
    flexDirection: 'row',
    gap: 6,
    paddingTop: 4,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  activeTabButton: {
    backgroundColor: '#5669FF',
  },
  tabBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabBadge: {
    backgroundColor: '#FFFFFF',
  },
  tabBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  activeTabBadgeText: {
    color: '#5669FF',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A8ACD2',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  screenContent: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  screenWrapper: {
    backgroundColor: '#FFFFFF',
  },
});
