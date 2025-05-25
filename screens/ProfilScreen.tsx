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

export default function ProfileScreen({profileData}) {

  const [fontsLoaded] = useFonts({ DynaPuff_400Regular, AnekDevanagari_400Regular, SpecialGothicExpandedOne_400Regular });
  const navigation = useNavigation();
  const [username, setUsername] = useState<string | null>(null);
  const [niveau, setNiveau] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [xp, setXp] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
  
        if (authError) throw authError;
        if (!user) throw new Error('User not authenticated');
  
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('username, niveau, avatar_url, xp')
          .eq('id', user.id)
          .single();
  
        if (fetchError) throw fetchError;
  
        const username = data?.username || null;
        const niveau = data?.niveau || null;
        const avatar_url = data?.avatar_url || null;
        const xp = data?.xp || null;
  
        setUsername(username);
        setNiveau(niveau);
        setAvatarUrl(avatar_url); // <-- Add this line
        setXp(xp);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Logout failed", error.message);
    } else {
      navigation.navigate("Start"); // Or your login/start screen
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
  
  function getTitleByXp(xp: number | null) {
    if (xp === null) return "Ukendt";
    if (xp < 1000) return "F1 Rookie";
    if (xp < 2000) return "F1 Begynder";
    if (xp < 3000) return "F1 Overtaker";
    if (xp < 50000) return "F1 Videns Champion";
    return "F1 Legend";
  }
  
 
  
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Hva så {username}?</Text>
      <Text style={styles.Subtitle}>Clare til tjeneste!</Text>
      <Frida style={styles.frida} width={150} height={150}  />

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
      <Text style={styles.ProfilTitle}>Din profil</Text>
      <Text style={styles.ProfilText}>Brugernavn:</Text>
      <Text style={styles.Brugernavn}>{username}</Text>

      <Text style={styles.ProfilText}>Niveau:</Text>
      <Text style={styles.Brugernavn}>{niveau}</Text>
      
      <Text style={styles.ProfilText}>Brugernavn:</Text>
      <Text style={styles.Brugernavn}>{username}</Text>
    <View style={styles.avatarContainer}>
    <SvgXml xml={avatar_url} width="150" height="150" style={styles.avatar} />

    <TouchableOpacity
      style={styles.changeAvatarButton}
      onPress={() => navigation.navigate('ChangeAvatar')}
    >
      <Text style={styles.logoutButtonText}>Skift hjelm</Text>
    </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.ChangeButton} onPress={() => navigation.navigate('ChangeNiveau')}>
      <Text style={styles.logoutButtonText}>Skift niveau</Text>
    </TouchableOpacity>
 <View style={{flexDirection: "row", marginTop: 20}}>
      <View>
        <Badge/>
      </View>
      <View style={{marginLeft: 20, justifyContent: "center", alignSelf: "center"}}>
        <Text>Din badges</Text>
        <Text style={{fontFamily: "AnekDevanagari_600SemiBold", fontSize: 18, color: "#112045"}}>
          {getTitleByXp(xp)}
        </Text>
      </View>
    </View>
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutButtonText}>Log ud</Text>
    </TouchableOpacity>
   
    </View>
    
    
  );
}



const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  frida: {
    position: "absolute",
    top: 30,
    right: -80,
    zIndex: -1,
    transform: [{ rotate: "-50deg" }],
  },
  Title: {
    fontSize: 32,
    marginBottom: 10,
    fontFamily: "DynaPuff_400Regular",
    color: "black",
  },
  Subtitle: {
    fontSize: 20,
    fontFamily: "DynaPuff_400Regular",
    color: "black",
  },
  ProfilTitle: {
    fontSize: 32,
    marginBottom: 10,
    fontFamily: "SpecialGothicExpandedOne_400Regular",
    color: "black",
  },
  ProfilText: {
    fontSize: 20,
    fontFamily: "AnekDevanagari_400Regular",
    color: "black",
    
  },
  Brugernavn:{
    fontSize: 20,
    fontFamily: "AnekDevanagari_400Regular",
    color: "black",
    fontWeight: "bold",
  },
  avatar: {
    
    borderRadius: 60,
   
  },
  avatarContainer: {
    position: "absolute",
    top: 320,
    right: 20,
    borderColor: "#CD1F4D",
    borderWidth: 4,
    padding:10,
    borderRadius: 20,
  },
  tabScroll: {
    paddingHorizontal: 10,
    alignItems: "center",
    paddingVertical: 60,
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
