import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState,Button, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native'
import { supabase } from '../lib/supabase'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else 
    supabase.auth.stopAutoRefresh()
  })

export default function Login() {
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
    if (error) {
      Alert.alert(error.message)
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    }
    setLoading(false)
  }

  const [fontsLoaded] = useFonts({ DynaPuff_400Regular });
  if (!fontsLoaded) return null;

  return (
    <ScrollView style={styles.container}>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={styles.label}>Mail:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
         
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Kodeord:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
         
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity style={styles.button}  disabled={loading} onPress={() => signInWithEmail()}>
          <Text style={styles.buttonText}>Log ind</Text>
        </TouchableOpacity>
      
      </View>
     
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
  
    padding: 12,
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
  longText:{
    maxWidth:200,
    marginBottom:30,
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
 backButton:{
    borderColor:'white',
    borderWidth:1,
    width:120,
    paddingVertical:10,
    marginLeft:10,
    position:'absolute',
    top:10,
    zIndex:2,
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
})