import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AccountStack from "../components/AccountStack";
import { Session } from "@supabase/supabase-js";

import { SvgXml } from "react-native-svg";

import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
import Frida from "../assets/FridaFart/frida-dobbelt-thumps-up.svg";
import Badge from "../assets/svg/Bagde.svg"


const Stack = createStackNavigator();

export default function Instillinger() {

  const [fontsLoaded] = useFonts({ DynaPuff_400Regular, AnekDevanagari_400Regular, SpecialGothicExpandedOne_400Regular });
  const navigation = useNavigation();
  const [username, setUsername] = useState<string | null>(null);
  const [niveau, setNiveau] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [xp, setXp] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
 
   const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Logout failed", error.message);
    } else {
      navigation.navigate("Start"); // Or your login/start screen
    }
  };

  
  return (
    <ScrollView style={styles.container}>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
        <TouchableOpacity style={[styles.tab, styles.Checked]} onPress={() => navigation.navigate("Profile", { session })}>
          <Text style={{ color: "white", fontSize: 20,fontFamily:'SpecialGothicExpandedOne_400Regular' }}>Din Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={{ color: "white", fontSize: 20,fontFamily:'AnekDevanagari_400Regular' }}>Trending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={{ color: "white", fontSize: 20,fontFamily:'AnekDevanagari_400Regular' }}>Nyheder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("Kalender")}>

          <Text style={{ color: "white", fontSize: 20,fontFamily:'AnekDevanagari_400Regular' }}>Kalender</Text>
        </TouchableOpacity>
      </ScrollView>
      
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutButtonText}>Log ud</Text>
    </TouchableOpacity>
   
    </ScrollView>
    
    
  );
}



const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 30,
  },

  tabScroll: {
    alignItems: "center",
    paddingTop:30,
    paddingBottom:20,
    width: "150%",
  },
  tab: {
    backgroundColor: "#112045",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  Checked: {
    backgroundColor: "#CD1F4D",
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "#CD1F4D",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  ChangeButton: {
    marginTop: 40,
    backgroundColor: "#CD1F4D",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    width: 150,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 24,
    fontFamily: "AnekDevanagari_600SemiBold",
  },
  changeAvatarButton: {
    backgroundColor: "#112045",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});
