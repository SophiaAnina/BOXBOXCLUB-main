import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, View, AppState, Text, TouchableOpacity, ScrollView } from 'react-native'
import { supabase } from '../lib/supabase'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Frida from '../assets/FridaFart/frida-dæk.svg';
import RacetrackRed from '../assets/svg/RacetrackRed.svg';

import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else 
    supabase.auth.stopAutoRefresh()
  })

export default function OnboardingStep4({ }) {
  
  const [fontsLoaded] = useFonts({ DynaPuff_400Regular, AnekDevanagari_400Regular, SpecialGothicExpandedOne_400Regular });
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { email, password } = route.params || {}; // fallback to empty object

  async function signInWithEmail(email, password) {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert('Error signing in:', error.message);
      } else {
        navigation.navigate('Home'); // Navigate to the home screen after successful sign-in
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (email && password) {
      signInWithEmail(email, password);
    }
  }, [email, password]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('OnboardingStep3')} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="white" />
          <Text style={styles.backButtonText}>Tilbage</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Lad os så komme igang!</Text>
        <Frida width={300} height={300} style={styles.frida} />
      </View>
      <Text style={styles.title}>Det var det</Text>
      <Text style={styles.text}>Lad os komme igang! </Text>
     
        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={signInWithEmail.bind(this, email, password)}
        >
          <Text style={styles.buttonText}>Til Appen</Text>
        </TouchableOpacity>
        <RacetrackRed />
        <View>
          <Frida />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  header: {
    paddingTop: 30,
    backgroundColor: '#CD1F4D',
    aspectRatio: 1,
  },
  headerText: {
    position: 'absolute',
    top: '30%',
    left: '15%',
    color: 'white',
    fontFamily: 'DynaPuff_400Regular',
    fontSize: 24,
    transform: [{ rotate: '-16.957deg' }],
    width: 175,
  },
  frida: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    right: -20,
    bottom: -35,
  },
  title: {
    fontSize: 27,
    marginTop: 65,
    marginBottom: 18,
    fontWeight: "bold",
    color: '#112045',
    fontFamily: 'SpecialGothicExpandedOne_400Regular',
    width: '100%',
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#112045',
    width: '100%',
    textAlign: 'center',
    marginTop: 24,
  },
  input: {
    backgroundColor: '#E6E5E5',
    borderRadius: 6,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'AnekDevanagari_400Regular',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  longText: {
    color: 'white',
  },
  textContainer: {
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    width: '65%',
  },
  
  button: {
    marginTop: 30,
    marginBottom: 80,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginLeft: 60,
    marginRight: 60,
    backgroundColor: '#CD1F4D',
    borderRadius: 16,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'AnekDevanagari_600SemiBold',
    textAlign: 'center',
  },
  backButton: {
    borderColor: 'white',
    borderWidth: 2,
    width: 120,
    paddingVertical: 10,
    marginLeft: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'AnekDevanagari_600SemiBold',
    justifyContent: 'space-between',
  },
})