import React, { useEffect, useState, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { supabase } from './lib/supabase';
import Start from './components/Start';
import NewUser from './components/newUser';
import OnboardingStart from './components/onboardingStart';

import OnboardingStep2 from './components/onboardingStep2';
import OnboardingStep3 from './components/onboardingStep3';
import OnboardingStep4 from './components/onboardingStep4';

import HomeScreen from './screens/HomeScreen';
import Instillinger from './components/Instillinger';
import ProfileScreen from './screens/ProfilScreen';
import ChangeAvatar from './components/ChangeAvatar';
import ChangeNiveau from './components/ChangeNiveau';
import PostStart from './components/PostStart';
import MessagesScreen from './components/Post';

import Quiz from './screens/Quiz';
import PlayerScoreboard from './screens/HvadBetyderFlagene/PlayerScoreboard';
import HBFArtikel from './screens/HvadBetyderFlagene/HBFArtikel';
import HBFArtikelStart from './screens/HvadBetyderFlagene/HBFArtikelStart';
import HBFStart from './screens/HvadBetyderFlagene/HBFStart';
import Result from './screens/HvadBetyderFlagene/Result';
import Question1 from './screens/HvadBetyderFlagene/Question1';

import DataScreen from './screens/Lærringscenter/DataScreen';
import ReglerArticles from './screens/Lærringscenter/ReglerArticles';
import DataArticles from './screens/Lærringscenter/DataArticles';
import ReglerScreen from './screens/Lærringscenter/ReglerScreen';
import Reglerarticles from './screens/Lærringscenter/Data';
import NewsScreen from './screens/Lærringscenter/NewsScreen';
import NewsArticles from './screens/Lærringscenter/NewsArticle';
import DriverScreen from './screens/Lærringscenter/DriverScreen';
import DriverArticles from './screens/Lærringscenter/DriverArticles';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Avatar from './components/Avatar';
import Leaderboard from './screens/Stilling/screens/LiveRaceScreen';
import KalenderScreen from './screens/Stilling/screens/Kalender';
import TeamsStandingScreen from './screens/Stilling/screens/TeamStanding';
import DriverStandingScreen from './screens/Stilling/screens/DriverStanding';

// Create a navigation ref
export const navigationRef = createNavigationContainerRef();

// Auth Context
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Home Stack Screens
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Instillinger" component={Instillinger} />
      <Stack.Screen name='Nyheder' component={Nyheder} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ChangeNiveau" component={ChangeNiveau} />
      <Stack.Screen name="ChangeAvatar" component={ChangeAvatar} />
      <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
      <Stack.Screen name="PostStart" component={PostStart} />
      <Stack.Screen name='Leaderboard' component={Leaderboard} />
      <Stack.Screen name='Kalender' component={KalenderScreen} />
      <Stack.Screen name='DriverStanding' component={DriverStandingScreen} />
      <Stack.Screen name='TeamStanding' component={TeamsStandingScreen} />
      <Stack.Screen name='DataScreen' component={DataScreen} />
      <Stack.Screen name='ReglerScreen' component={ReglerScreen} />
      <Stack.Screen name='ReglerArticles' component={ReglerArticles} />
      <Stack.Screen name='DataArticles' component={DataArticles} />
      <Stack.Screen name='DriverArticles' component={DriverArticles} />
      <Stack.Screen name='NewsScreen' component={NewsScreen} />
      <Stack.Screen name='NewsArticles' component={NewsArticles} />
      
      

      
    </Stack.Navigator>
  );
}

// Stilling Stack Screens
const StillingStack = createStackNavigator();

function StillingStackScreen() {
  return (
    <StillingStack.Navigator screenOptions={{ headerShown: false }}>
      <StillingStack.Screen name="Leaderboard" component={Leaderboard} />
      <StillingStack.Screen name="Kalender" component={KalenderScreen} />
      <StillingStack.Screen name="TeamStanding" component={TeamsStandingScreen} />
      <StillingStack.Screen name="DriverStanding" component={DriverStandingScreen} />
    </StillingStack.Navigator>
  );
}

// Læringscenter Stack Screens
const LæringscenterStack = createStackNavigator();

function LæringscenterStackScreen() {
  return (
    <LæringscenterStack.Navigator screenOptions={{ headerShown: false }}>
      <LæringscenterStack.Screen name="ReglerScreen" component={ReglerScreen} />
      <LæringscenterStack.Screen name="ReglerArticles" component={ReglerArticles} />
      <LæringscenterStack.Screen name="DataArticles" component={DataArticles} />
      <LæringscenterStack.Screen name="DataScreen" component={DataScreen} />
      <LæringscenterStack.Screen name="DriverArticles" component={DriverArticles} />
      <LæringscenterStack.Screen name="DriverScreen" component={DriverScreen} />
      <LæringscenterStack.Screen name="NewsScreen" component={NewsScreen} />
      <LæringscenterStack.Screen name="NewsArticles" component={NewsArticles} />
      
    </LæringscenterStack.Navigator>
  );
}

// Chat Stack Screens
const ChatStack = createStackNavigator();

function ChatStackScreen() {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="PostStart" component={PostStart} />
      <ChatStack.Screen name="MessagesScreen" component={MessagesScreen} />
    </ChatStack.Navigator>
  );
}

// Quiz Stack Screens
const QuizStack = createStackNavigator();

function QuizStackScreen() {
  return (
    <QuizStack.Navigator screenOptions={{ headerShown: false }}>
      <QuizStack.Screen name="QuizHome" component={Quiz} />
      <QuizStack.Screen name="HBFStart" component={HBFStart} />
      <QuizStack.Screen name="HBFArtikelStart" component={HBFArtikelStart} />
      <QuizStack.Screen name="HBFArtikel" component={HBFArtikel} />
      <QuizStack.Screen name="Result" component={Result} />
      <QuizStack.Screen name="Question1" component={Question1} />
      <QuizStack.Screen name="PlayerScoreboard" component={PlayerScoreboard} />
      
      {/* Add other quiz-related screens here if needed */}
    </QuizStack.Navigator>
  );
}

// Tab Screens for Main App
function MainApp() {
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#112045' },
        tabBarInactiveTintColor:'white',
        tabBarActiveTintColor: '#CD1F4D',
        tabBarLabelStyle: { color: 'white', fontSize: 12 },
      }}
      initialRouteName='Home'
    >
      <Tab.Screen
        name="Chat"
        component={ChatStackScreen} // <-- use the stack here
        options={{
          tabBarActiveTintColor:'#CD1F4D',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="message-badge" size={32} color={color} />
        }}
      />
      <Tab.Screen
        name="Stlling"
        component={StillingStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation
              name="graph-horizontal"
              size={32}
              color={color}
              style={{ transform: [{ rotate: '-90deg' }] }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
  name='Quiz'
  component={QuizStackScreen}
  options={{
    tabBarIcon: ({ color }) => <MaterialIcons name="videogame-asset" size={32} color={color} />
  }}/>
      <Tab.Screen
        name="Lær' mere"
        component={LæringscenterStackScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="collections-bookmark" size={32} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

// Auth and Onboarding Stack Screens
function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="NewUser" component={NewUser} />
      <Stack.Screen name="Avatar" component={Avatar} />
      <Stack.Screen name="OnboardingStart" component={OnboardingStart} />
      <Stack.Screen name="OnboardingStep2" component={OnboardingStep2} />
      <Stack.Screen name="OnboardingStep3" component={OnboardingStep3} />
      <Stack.Screen name="OnboardingStep4" component={OnboardingStep4} />
      <Stack.Screen name="PostStart" component={PostStart} />
      <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ChangeAvatar" component={ChangeAvatar} />
      <Stack.Screen name="Kalender" component={KalenderScreen} />
      <Stack.Screen name="Leaderboard" component={Leaderboard} />
      <Stack.Screen name="DriverStanding" component={DriverStandingScreen} />
      <Stack.Screen name="TeamStanding" component={TeamsStandingScreen} />
     
      <Stack.Screen name="HBFStart" component={HBFStart} />
      <Stack.Screen name="HBFArtikelStart" component={HBFArtikelStart} />
      <Stack.Screen name="HBFArtikel" component={HBFArtikel} />
      
      <Stack.Screen name='Result' component={Result} />
    </Stack.Navigator>
  );
}

// Root Stack Screens
function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* TabNavigator as the main screen */}
      <Stack.Screen name="MainApp" component={MainApp} />

      {/* AuthAndOnboardingStack as a fallback */}
      <Stack.Screen name="Stack" component={StackNavigator} />

      {/* Rename Profile to ProfileDetails */}
      <Stack.Screen name="ProfileDetails" children={() => <ProfileScreen profileData={profileData} />} />
      {/* Add this line */}
    </Stack.Navigator>
  );
}

// Root Navigation deciding based on session
export default function App() {
  const [session, setSession] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
      } else {
        setProfileData(null);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, niveau, avatar_url')
        .eq('id', userId);

      if (error) {
        console.error('Error fetching profile:', error.message);
        setProfileData(null);
        return;
      }

      if (!data || data.length === 0) {
        // No profile row found for this user
        setProfileData(null);
        console.warn('No profile found for user:', userId);
        return;
      }

      if (data.length > 1) {
        // Multiple profiles found for this user (should not happen)
        setProfileData(data[0]);
        console.warn('Multiple profiles found for user:', userId, data);
        return;
      }

      setProfileData(data[0]);
      console.log('Fetched username:', data[0].username);
    } catch (err) {
      console.error('Unexpected error fetching profile:', err);
      setProfileData(null);
    }
  };

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      <NavigationContainer ref={navigationRef}>
        {session ? (
          profileData && profileData.avatar_url
            ? <RootStack />
            : <StackNavigator initialRouteName="Avatar" />
        ) : (
          <StackNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
