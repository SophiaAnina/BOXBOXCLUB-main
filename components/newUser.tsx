import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, AppState, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';

import AntDesign from '@expo/vector-icons/AntDesign';

import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";

import Frida from '../assets/FridaFart/frida-dobbelt-thumps-up.svg';
import { useAuth } from '../App'; // Import useAuth

export default function NewUser() {
  
  const [fontsLoaded] = useFonts({ DynaPuff_400Regular, AnekDevanagari_400Regular, SpecialGothicExpandedOne_400Regular});
  const navigation = useNavigation(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [brugernavn, setBrugernavn] = useState('');
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuth(); // Get setSession from context

  // AppState listener properly inside useEffect
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });

    return () => subscription.remove();
  }, []);

  // Prevent rendering until fonts are ready
  if (!fontsLoaded) return null;

  async function signUpWithEmail() {
    setLoading(true);

    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      console.log(data, error);

      if (error) {
        console.error('Sign-up error:', error, JSON.stringify(error));
        Alert.alert('Noget gik galt', error.message || JSON.stringify(error));
        return;
      }

      const user = data?.user;

      if (!user || !user.id) {
        
        return;
      }

      // Update the brugernavn in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id, // Ensure the user ID is used as the primary key
          username: brugernavn,
          avatar_url: '',
        });

      if (profileError) {
        console.error('Profile update error:', profileError);
        Alert.alert(
          'Noget gik galt med at opdatere din profil',
          profileError.message
        );
        return;
      }

      // At this point, the user is already signed in
      console.log('User signed up and signed in:', user);

      // Navigate to the next screen
      navigation.navigate('Avatar');
    } catch (error) {
      console.error('Unexpected sign-up error:', error);
      Alert.alert('Noget gik galt', error.message);
    } finally {
      setLoading(false);
    }
  }



  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Start')} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="white" />
          <Text style={styles.backButtonText}>Tilbage</Text>
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.text}>Hej med dig! Mit navn er Frida Fart!</Text>
          <Text style={[styles.text, styles.longText]}>Jeg er din guide gennem appen!</Text>
          <Text style={styles.text}>Skal vi få dig oprettet?</Text>
        </View>

        <Frida style={styles.frida} width={350} height={350} />
      </View>

      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Brugernavn:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setBrugernavn}
          value={brugernavn}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Mail:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Kodeord:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={signUpWithEmail}
          disabled={loading}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Næste</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    paddingTop: 30,
    backgroundColor: '#CD1F4D',
    aspectRatio: 1,
  },
  frida: {
    position: 'absolute',
    top: '20%',
    transform: [{ rotate: '43.371deg' }],
    left: '-42%',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  label: {
    fontFamily:'SpecialGothicExpandedOne_400Regular',
    fontSize: 20,
    color: '#112045',
    width: '100%',
    textAlign: 'center',
    marginTop: 24,
  },
  input: {
    backgroundColor: '#E6E5E5',
    borderRadius: 6,
    marginHorizontal: 40,
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'DynaPuff_400Regular',
    width: '100%',
    maxWidth: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  textContainer: {
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    width: '65%',
  },
  longText: {
    maxWidth: 200,
    marginBottom: 30,
  },
  button: {
    width: '100%',
    marginTop: 30,
    marginBottom: 80,
    marginLeft: 40,
    marginRight: 40,
    paddingVertical: 10,
    backgroundColor: '#CD1F4D',
    borderRadius: 16,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'AnekDevanagari_400Regular',
    textAlign: 'center',
  },
  backButton: {
    borderColor: 'white',
    borderWidth: 1,
    width: 120,
    paddingVertical: 10,
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'DynaPuff_400Regular',
    justifyContent: 'space-between',
  },
});
