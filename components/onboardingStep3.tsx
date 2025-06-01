import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Frida from '../assets/FridaFart/frida-dæk.svg';

export default function OnboardingStep3({ route }: any) {
  const { selectedLevel, email, password } = route.params; // <-- add email, password
  const navigation = useNavigation();
  const [niveau, setNiveau] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('OnboardingStep2')} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="white" />
          <Text style={styles.backButtonText}>Tilbage</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Godt klaret!</Text>
        <Frida width={250} height={250} style={styles.frida} />
      </View>
      <Text style={styles.title}>Du har valgt {selectedLevel}</Text>
      <Text style={styles.text}>Du kan til en hver tid ændre din preference i din profil</Text>
      <View style={[styles.verticallySpaced, styles.mt20]}>
       <TouchableOpacity
         style={styles.button}
         disabled={loading}
         onPress={() => {
           navigation.navigate('OnboardingStep4', { email, password }); // <-- pass them along
         }}
       >
         <Text style={styles.buttonText}>Næste</Text>
       </TouchableOpacity>
      </View>
    </ScrollView>
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
    right: '20%',
    color: 'white',
    fontFamily: 'DynaPuff_400Regular',
    fontSize: 24,
    transform: [{ rotate: '20.357deg' }],
  },
  frida: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 40,
    bottom: -25,
  },
  title: {
    fontSize: 27,
    marginTop: 18,
    marginBottom: 18,
    fontWeight: 'bold',
    color: '#112045',
    fontFamily: 'SpecialGothicExpandedOne_400Regular',
    width: '100%',
    textAlign: 'center',
  },
  text: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'AnekDevanagari_400Regular',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
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
    fontWeight: 'bold',
    fontFamily: 'AnekDevanagari_400Regular',
    textAlign: 'center',
  },
  backButton: {
    borderColor: 'white',
    borderWidth: 1,
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
    fontWeight: 'bold',
    fontFamily: 'Anek Devanagari',
    justifyContent: 'space-between',
  },
});