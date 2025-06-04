import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";

import { AntDesign } from "@expo/vector-icons";
import Frida from "../../assets/FridaFart/frida-gronflag.svg";
export default function HBFStart() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({ DynaPuff_400Regular, DynaPuff_500Medium, DynaPuff_600SemiBold, DynaPuff_700Bold, AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, SpecialGothicExpandedOne_400Regular });
  if (!fontsLoaded) return null;
    
  return (
    <View style={styles.container}>
        <View style={styles.header}>
       <TouchableOpacity onPress={() => navigation.navigate('QuizHome')} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="white" />
        <Text style={styles.backButtonText}>Tilbage</Text>
      </TouchableOpacity>
        <Frida style={styles.frida} width={200} height={200}  />
        </View>
        <View style={styles.info}>
      <Text style={styles.Hvidtitle}>Vi anbefaler</Text>
      <Text style={styles.Hviddescription}>Læs dette inden quizzen, hvis du er i tvivl</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("HBFArtikelStart")}
      style={styles.LæsButton}>
        <Text style={styles.startButtonText}>Læs om flag</Text>
      </TouchableOpacity>
      </View>
        <Text style={styles.title}>Klar til træning</Text>
        <Text style={styles.description}>
            Er du klar, parat til start?
        </Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("Question1")}
      >
        <Text style={styles.startButtonText}>Start quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { 
    backgroundColor: "#CD1F4D", 
    height:300,
     width: "100%" 
},
  frida:{ 
    position:"absolute",
     bottom:-30,
      right: 130,
    },
  container: {
     justifyContent: "center",
      alignItems: "center"
     },
info:{ 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: '#112045',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
     },
  Hvidtitle: { 
    fontSize: 32,
    
    marginBottom: 8, 
    color: "white", 
    fontFamily: "SpecialGothicExpandedOne_400Regular" 
},
title: { 
    fontSize: 32,
   
    marginBottom: 8, 
    color: "#112045", 
    fontFamily: "SpecialGothicExpandedOne_400Regular" 
},

  description: { 
    fontSize: 24, 
    textAlign: "center", 
    marginBottom: 8  , 
    color: "#112045", 
    fontFamily: "AnekDevanagari_400Regular",
    width:290,
 },
 Hviddescription: { 
    fontSize: 24, 
    textAlign: "center", 
    marginBottom: 8  , 
    color: "white", 
    fontFamily: "AnekDevanagari_400Regular",
    width:290,
 },
  LæsButton: { 
    backgroundColor: "#CD1F4D", 
    paddingHorizontal: 38, 
    paddingVertical: 10,
    borderRadius: 8 
},
  startButton: { 
    backgroundColor: "#CD1F4D", 
    paddingHorizontal: 100, 
    paddingVertical: 10,
    borderRadius: 8 
},
  startButtonText: { 
    color: "white", 
    fontSize: 24, 
    fontFamily: 'AnekDevanagari_700Bold',
},
backButton: {
    borderColor: "white",
    borderWidth: 1,
    width: 120,
    paddingVertical: 10,
    marginLeft: 10,
    marginBottom: 38,
    marginTop: 50,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    borderRadius: 8,
  },
  backButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "SpecialGothicExpandedOne_400Regular",
    justifyContent: "space-between",
  },
});