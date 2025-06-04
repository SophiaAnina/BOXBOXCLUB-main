import React, { useState } from 'react';
import { Alert, StyleSheet, View, AppState, Button, TextInput, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { supabase } from '../lib/supabase';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import { createAvatar } from '@dicebear/core';
import * as style from '../hjealm';
import { face } from '../hjealm/src/components/face';
import { eye } from '../hjealm/src/components/eye';
import { SvgXml } from 'react-native-svg';
import Svg , { Path } from 'react-native-svg';

import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const faceNames: { [key: string]: string } = {
  hjealm: "Standard",
  // Add more face keys and names as needed
};

const eyeNames: { [key: string]: string } = {
  eyes1: "Victory Eyes",
  eyes2: "Pitstop Pits",
  eyes3: "Brake Mode",
  eyes4: "Pitstop Powernap",
  eyes5: "TBD",
  eyes6: "Zen Mode",
  eyes7: "Pitstop Powernap",
  eyes8: "Turbo Smile",
  eyes9: "Podiumblink",
  eyes10: "TBD",
  eyes11: "Speed Blush",
  eyes12: "TBD",
  // ...add more as needed
};

const faceColors = [
  '#cd1f4d', // Red
  '#F9C846', // Yellow
  '#A3D9A5', // Green
  '#6EC6FF', // Blue
  '#F7A072', // Orange
  '#B39DDB', // Purple
  '#E6E5E5', // Light Gray
  '#F4B6C2', // Pink
];

// Add a label for each color
const faceColorLabels = [
  "Turbo Rosa",
  "Sunshine Speed",
  "Eco Green",
   "Nitro Blue",
    "Orange Overdrive",
  "Blue Blazer",
  "Sky Speed",
 
  "Racing Red",
 
 
  

];

export default function Avatar() {
  const [fontsLoaded] = useFonts({ DynaPuff_400Regular, AnekDevanagari_400Regular, SpecialGothicExpandedOne_400Regular });
  if (!fontsLoaded) return null;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); // 0: face, 1: eyes
  const [selectedFace, setSelectedFace] = useState<string | null>(null);
  const [selectedEye, setSelectedEye] = useState<string | null>(null);
  const [selectedFaceColor, setSelectedFaceColor] = useState<string>(faceColors[0]);
  const [selectedFaceColorIndex, setSelectedFaceColorIndex] = useState<number>(0);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
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

  async function saveAvatarToProfile() {
    if (!selectedFace || !selectedEye) {
      Alert.alert('Vælg både ansigt og øjne før du fortsætter.');
      return;
    }
    try {
      // Use the same viewBox and combine face and eyes
      const avatarSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298 298">
          <g>
          <g transform="translate(-20 0)">
            ${face[selectedFace]({}, { face: faceColors[selectedFaceColorIndex] })}
           </g>
          <g transform="translate(65 115) scale(1.5)">
            ${selectedEye}
           </g>
          </g>
        </svg>
      `;
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        Alert.alert('Error fetching user:', userError?.message || 'User not found.');
        return;
      }
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarSvg })
        .eq('id', user.id);
      navigation.navigate('Profile');
      if (updateError) {
        Alert.alert('Error updating profile:', updateError.message);
      } else {
        Alert.alert('Avatar saved successfully!');
      }
    } catch (error) {
      console.error('Error saving avatar:', error);
      Alert.alert('An unexpected error occurred.');
    }
  }

  return (
    <ScrollView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="white" />
          <Text style={styles.backButtonText}>Tilbage</Text>
        </TouchableOpacity>
        <View style={styles.AvatarContainer}>
          {selectedFace && (
            <View style={{ position: 'relative', width: 150, height: 150 }}>
              <View style={{ backgroundColor: '#112045', borderRadius: 500, width: 150, height: 150, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                <SvgXml
                  xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298 298">
                    <g object-fit="cover" transform="translate(-20 0)">
                      ${face[selectedFace]({}, { face: faceColors[selectedFaceColorIndex] })}
                    </g>
                  </svg>`}
                  width={150}
                  height={150}
                />
              </View>
              {step === 1 && selectedEye && (
                <SvgXml
                  xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298 298">${selectedEye}</svg>`}
                  width={200}
                  height={200}
                  style={{
                    position: 'absolute',
                    top: 65,
                    left: 40,
                  }}
                />
              )}
            </View>
          )}
        </View>
      </View>
      <ScrollView style={styles.container}>
        {step === 0 ? (
          <>
            <Text style={styles.title}>Hvilken hjelm repræsenterer dig?</Text>
            <View style={styles.faceGrid}>
              {faceColors.map((color, idx) => (
                <View key={color} style={styles.faceGridItem}>
                  <View
                    style={[
                      styles.faceCircle,
                      selectedFaceColorIndex === idx && styles.selectedFaceCircle,
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedFace("hjealm");
                        setSelectedFaceColorIndex(idx);
                      }}
                    >
                      <SvgXml
                        xml={`<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 298 298">
              <g object-fit="cover" transform="translate(-20 0)">
                ${face["hjealm"]({}, { face: color })}
              </g>
            </svg>`}
                        width={60}
                        height={60}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.faceLabel}>{faceColorLabels[idx]}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={styles.button}
              disabled={selectedFace == null}
              onPress={() => setStep(1)}
            >
              <Text style={styles.buttonText}>Næste</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Hvilket udtryk repræsenterer dig bedst?</Text>
            <View style={styles.eyesContainer}>
              {Object.keys(eye).slice(0, 8).map((key) => {
                const EyeComponent = eye[key];
                if (typeof EyeComponent !== 'function') return null;
                const svgXml = EyeComponent();
                return (
                  <View key={key}>
                    <TouchableOpacity
                     
                      onPress={() => setSelectedEye(svgXml)}
                    >
                      <View
                        style={[
                          styles.eyeWrapper,
                          selectedEye === svgXml && styles.selectedEyeWrapper,
                        ]}
                      >
                      <SvgXml
                        style={styles.eye}
                        xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                          <g object-fit="cover" transform="translate(-8 10)">
                          ${svgXml}
                          </g>
                          </svg>`}
                        width={50}
                        height={50}
                      />
                      </View>
                      <Text style={styles.eyeTitle}>{eyeNames[key] || key}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            <TouchableOpacity
              style={styles.button}
              disabled={!selectedEye}
              onPress={saveAvatarToProfile}
            >
              <Text style={styles.buttonText}>Afslut</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
   padding: 20,
  backgroundColor:'#FCFAED',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  header: {
    paddingTop: 30,
    backgroundColor: '#CD1F4D',
    height: 320,
  },
  headerText: {
    position: 'absolute',
    top: '38%',
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
    left: 0,
    bottom: -35,
  },
  title: {
    fontSize: 20,
    marginBottom: 18,
   
    color: '#112045',
    fontFamily: 'SpecialGothicExpandedOne_400Regular',
    width: '100%',
    textAlign: 'center',
  },
  label: {
   
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
    fontWeight: 500,
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
    marginTop: 0,
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
    marginTop: 20,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'SpecialGothicExpandedOne_400Regular',
    justifyContent: 'space-between',
  },
  AvatarContainer: {
    backgroundColor: '#112045',
    width: 200,
    height: 200,
    borderRadius: 500,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  eyesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  eye: {
  
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
 eyeWrapper: {
  backgroundColor: '#D8A4B2',
  padding: 10,
  borderRadius: 50,
  width: '100%',
  borderWidth: 3,
  marginBottom: 10,
  borderColor: 'transparent', // Default: no border
 },
 selectedEyeWrapper: {
  borderColor: '#CD1F4D', // Highlight border color
 },
  eyeTitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#112045',
    textAlign: 'center',
    fontFamily: 'AnekDevanagari_400Regular',
  },
  faceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
   
  },
  faceGridItem: {
    width: '22%', // Changed from '24%' to '22%' for 4 per row
    alignItems: 'center',
    
    // Optionally, add marginHorizontal for spacing:
    marginHorizontal: '1.5%',
  
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'transparent',
    padding: 3,
  },
  faceCircle: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'transparent',
    padding: 3,
    backgroundColor: '#D8A4B2', // or your preferred background
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedFaceCircle: {
    borderColor: '#CD1F4D',
  },
  faceLabel: {borderColor: '#CD1F4D', // or any highlight color you want
    fontSize: 12,
    color: '#112045',
    textAlign: 'center',
    fontFamily: 'AnekDevanagari_400Regular',
  },
});