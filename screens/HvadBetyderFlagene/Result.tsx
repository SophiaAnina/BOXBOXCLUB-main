import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import ScoreCounter from "./components/ScoreCounter";
import GiveXp from "./components/GiveXp";

import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";

import Frida from "../../assets/FridaFart/frida-done-flag.svg"
export default function Result() {
  const navigation = useNavigation();
  const route = useRoute();
  const { score, total } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Frida width={300} height={300} style={styles.frida} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Du er færdig</Text>
        <ScoreCounter style={styles.scoreCounter} score={score} total={total} />
        <GiveXp score={score} />
        <Text style={styles.description}>Du er bare for god!</Text>
      <TouchableOpacity
        style={styles.finishButton}
        onPress={() => navigation.navigate("Quiz")}
      >
        <Text style={styles.finishButtonText}>Afslut</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    
    },
  content: {
  marginTop: 80,
    alignItems: "center",
  },
  header: {
    aspectRatio: 1,
    backgroundColor:"#CD1F4D",
    justifyContent:"flex-end",
    alignItems:"center",
  },
  frida:{
    position:"absolute",
    bottom:-55,
   
  },
  scoreCounter: {
    fontFamily:"SpecialGothicExpandedOne_400Regular",
  },
  title: { 
    fontSize: 32, 
    marginBottom: 16, 
    fontFamily: "SpecialGothicExpandedOne_400Regular", 
    color: "#112045" },
  description: {
    fontSize: 24, 
    marginTop: 16, 
    fontFamily: "AnekDevanagari_400Regular", 
    color: "#112045"
  },
  finishButton: { 
    backgroundColor: "#CD1F4D", 
    paddingVertical: 10, 
    paddingHorizontal:100 ,
    marginTop: 70,
    borderRadius: 8 
  },
  finishButtonText: { 
    color: "white", 
    fontSize: 24, 
    fontFamily: "AnekDevanagari_400Regular", 
    fontWeight: "bold" 
  },
});