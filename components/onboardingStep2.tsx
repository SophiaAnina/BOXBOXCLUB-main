import React, { useState, useRef, useEffect } from 'react'
import { Alert, StyleSheet, View, AppState, Image, Text, TouchableOpacity, } from 'react-native'
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";

import Frida from '../assets/FridaFart/frida-dæk.svg';
import Logo from '../assets/svg/Logo.svg';
import Car from '../assets/svg/Car.svg';
import Racetrack from '../assets/svg/Racetrack.svg';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else 
    supabase.auth.stopAutoRefresh()
  })

export default function OnboardingStep2() {
  const route = useRoute();

  const [fontsLoaded] = useFonts({ DynaPuff_400Regular, AnekDevanagari_400Regular, SpecialGothicExpandedOne_400Regular });
  if (!fontsLoaded) return null;
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSelected, setSelected] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [niveau, setNiveau] = useState('');

  
     

  async function updateUserLevel() {
    try {
      // Get the authenticated user's ID
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
  
      if (authError) throw authError;
      if (!user) throw new Error('User not authenticated');
  
      // Update the niveau column in the profiles table
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ niveau: selectedLevel })
        .eq('id', user.id);
  
      if (updateError) throw updateError;
  
      // Alert.alert('Niveau opdateret!', 'Dit niveau er blevet gemt.');
    } catch (error) {
      console.error('Error updating niveau:', error);
      // Alert.alert('Noget gik galt', 'Kunne ikke opdatere niveau.');
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>

    <TouchableOpacity onPress={() => navigation.navigate('OnboardingStart')} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.backButtonText}>Tilbage</Text>
    </TouchableOpacity>
    <View style={styles.question}>
          <Text style={styles.questionTitle}>Hvad er dit niveau</Text>
          <Text style={styles.questionText}>Du kan vælge mellem begynder, grundforståelse eller ekspert</Text>
        </View>
    </View>
    <View style={styles.content}>
   

    <TouchableOpacity
  style={[
    styles.questionButton,
    selectedLevel === 'Begynder' && styles.selectedQuestionButton
  ]}
  onPress={() => setSelectedLevel('Begynder')}
>
  <Text style={styles.buttonText}>Begynder</Text>
</TouchableOpacity>


        <TouchableOpacity
  style={[
    styles.questionButton,
    selectedLevel === 'Grundforståelse' && styles.selectedQuestionButton
  ]}
  onPress={() => setSelectedLevel('Grundforståelse')}
>
  <Text style={styles.buttonText}>Grundforståelse</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[
    styles.questionButton,
    selectedLevel === 'Ekspert' && styles.selectedQuestionButton
  ]}
  onPress={() => setSelectedLevel('Ekspert')}
>
  <Text style={styles.buttonText}>Ekspert</Text>
</TouchableOpacity>


        <TouchableOpacity
  style={styles.button}
  disabled={loading}
  onPress={async () => {
    await updateUserLevel();
    navigation.navigate('OnboardingStep3',{selectedLevel,email,password});
  }}
>
  <Text style={styles.buttonText}>Næste</Text>
</TouchableOpacity>
      
      </View>
     
    </View>
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
    backgroundColor:'#FCFAED',
    paddingBottom:30,
    paddingTop:100,
    alignContent:'center',
    justifyContent:'center',
    paddingHorizontal:20,
  },
 question:{
  borderRadius:10,
  backgroundColor:'#112045',
  width:'100%',
  padding:24,
  
 },
 questionTitle:{
   fontSize:20,
   color:'white',
   textAlign:'center',
   marginBottom:12.5,
   fontFamily:'SpecialGothicExpandedOne_400Regular',
 },
 questionText:{
   fontSize:20,
   color:'white',
   textAlign:'center',
    fontFamily:'AnekDevanagari_400Regular',
 },
 content:{
  backgroundColor:'#112045',
  paddingTop:21,
 },
 selectedQuestionButton:{
  backgroundColor:'#CD1F4D',
 },
  title: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 18,
    color:'#112045',
    fontFamily:'SpecialGothicExpandedOne_400Regular',
    width:'100%',
    textAlign:'center',
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
    color:'white',
    fontFamily:'DynaPuff',
    width: '100%',
    marginLeft:'auto',
    marginRight:'auto',
    textAlign:'center',
    maxWidth:150,
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
    marginTop:30,
    marginBottom:80,
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
     fontFamily:'Anek Devanagari',
     textAlign:'center',
 },
 questionButton:{

  marginBottom:10,
  marginLeft:40,
  marginRight:40,
  paddingVertical:30,
  backgroundColor:'transparent',
  borderWidth:1,
  borderRadius:16,
  textAlign:'center',
  borderColor:'#CD1F4D',
 },
 backButton:{
    borderColor:'black',
    borderWidth:1,
    width:120,
    paddingVertical:10,
    marginLeft:10,
    position:'absolute',
    top:20,
    flexDirection:'row',
    paddingHorizontal:10,
    justifyContent:'space-between',
    borderRadius:8,
    

  },
  backButtonText:{
    color:'black',
    fontSize:17,
    fontWeight:'bold',
    fontFamily:'Anek Devanagari',
   justifyContent:'space-between',

  },
})