import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState,Button, TextInput, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { supabase } from '../lib/supabase'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import OnboardingStep2 from './onboardingStep2';

import Frida from '../assets/FridaFart/frida-hjerte-pokal.svg';
import Logo from '../assets/svg/Logo.svg';
import Car from '../assets/svg/Car.svg';
import Racetrack from '../assets/svg/RacetrackBottom.svg';


import { useFonts, DynaPuff_400Regular } from '@expo-google-fonts/dynapuff';
import { AnekDevanagari_400Regular } from '@expo-google-fonts/anek-devanagari';
import { SpecialGothicExpandedOne_400Regular } from '@expo-google-fonts/special-gothic-expanded-one';
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else 
    supabase.auth.stopAutoRefresh()
  })

export default function OnboardingStart() {
  const [fontsLoaded] = useFonts({ DynaPuff_400Regular, AnekDevanagari_400Regular, SpecialGothicExpandedOne_400Regular});
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)



  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true);
    try {
      const {
        data: { user, session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert(error.message);
        return;
      }

      if (!user) {
        Alert.alert('Please check your inbox for email verification!');
        return;
      }

      // Insert user profile data into the `profiles` table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: user.id, username: email.split('@')[0], bio: '', avatar_url: '' }]);

      if (profileError) {
        Alert.alert('Error creating profile:', profileError.message);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>

      <TouchableOpacity onPress={() => navigation.navigate('Avatar')} style={styles.backButton}>
         <AntDesign name="arrowleft" size={24} color="white" />
        <Text style={styles.backButtonText}>Tilbage</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>Hvordan ser du ud ?</Text>
      <Frida width={300} height={300} style={styles.frida} />
    </View>
      <Text style={styles.title}>Jeg skal vide dit niveau!</Text>
      <Text style={styles.text}>For at hjælp dig bedst skal vi vide dit niveau af viden.</Text>
     
        <TouchableOpacity style={styles.button}  disabled={loading}onPress={() => navigation.navigate('OnboardingStep2', { email, password })}>
          <Text style={styles.buttonText}>Kom igang</Text>
        </TouchableOpacity>
        <Racetrack style={styles.Racetrack} />
        <View>
    </View>
    
     
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },

  header:{
    paddingTop:30,
    backgroundColor:'#CD1F4D',
    aspectRatio:1,
  },
  headerText:{
    fontSize: 24,
    transform:'[rotate(-8.189deg)]',
    marginBottom: 18,
   
    color:'white',
    fontFamily:'DynaPuff_400Regular',
   marginLeft: 20,
    marginTop: 50,
   width:180,
   
  },
  frida:{
    position:'absolute',
    bottom:-20,
    left:'10%',
    
  },
  title: {
    fontSize: 27,
    marginTop: 65,
    marginBottom: 18,
    color:'#112045',
    fontFamily:'SpecialGothicExpandedOne_400Regular',
    width:'80%',
    textAlign:'center',
    marginLeft:'auto',
    marginRight:'auto',
},
  label: {
    fontWeight: 'bold',
    fontSize: 20,
    color:'#112045',
    width: '100%',
    textAlign:'center',
    marginTop:24,
  },
  input:{
    backgroundColor:'#E6E5E5',
    borderRadius:6,
    marginHorizontal:20,
  },
  text:{
    fontSize: 24,
    color:'black',
    fontFamily:'AnekDevanagari_400Regular',
    width: '90%',
    marginLeft:'auto',
    marginRight:'auto',
    textAlign:'center',
   fontWeight: 500,
  },
  longText:{
  color:'white',
    
  },
  textContainer:{
    marginLeft:'auto',
    justifyContent:'center',
    alignItems:'center',
    
    width:'65%',
  },
  
  button:{
    marginTop:20,
   
    marginLeft:40,
    marginRight:40,
     paddingVertical:10,
     backgroundColor:'#CD1F4D',
     borderRadius:16,
     textAlign:'center',
     
 },
 buttonText:{
     color:'white',
     fontSize:24,
     fontWeight:'bold',
     fontFamily:'AnekDevanagari_400Regular',
     textAlign:'center',
 },
 backButton:{
    borderColor:'white',
    borderWidth:1,
    width:120,
    paddingVertical:10,
    marginLeft:10,

    flexDirection:'row',
    paddingHorizontal:10,
    justifyContent:'space-between',
    borderRadius:8,

  },
  backButtonText:{
    color:'white',
    fontSize:17,
    fontWeight:'bold',
    fontFamily:'Anek Devanagari',
   justifyContent:'space-between',
  },
  Racetrack:{
    position:'absolute',
    right:-20,
    bottom:-130,
  }

})