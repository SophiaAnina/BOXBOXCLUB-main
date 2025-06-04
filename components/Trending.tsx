import React, { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Frida from '../assets/FridaFart/frida-thumps-up.svg';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { NewsArticles } from "../screens/Lærringscenter/Data";

import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
export default function Trending( {}) {
  const navigation = useNavigation(); // Access navigation object
  const [username, setUsername] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  
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
            .select('username')
            .eq('id', user.id)
            .single();
    
          if (fetchError) throw fetchError;
    
          const username = data?.username || null;

          setUsername(username);
         
        } catch (error) {
          Alert.alert("Error", error.message);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, []);
    
    const [fontsLoaded] = useFonts({ DynaPuff_400Regular, DynaPuff_500Medium, DynaPuff_600SemiBold, DynaPuff_700Bold, AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, SpecialGothicExpandedOne_400Regular });
    if (!fontsLoaded) return null;
    
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ position : "absolute", top:100, left: 20, zIndex: 1 }}>
        <Text style={{ fontSize: 28, fontFamily: "DynaPuff_400Regular" }}>
          Hvad så  {username || 'Bruger'}?
        </Text>
     
          <Text style={{ fontSize: 20, fontFamily: "DynaPuff_400Regular" }}>Clara til tjeneste!</Text>
      
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScroll}
        >
          <TouchableOpacity style={styles.tabIndicator} onPress={() => navigation.navigate('Trending')}>
            <Text style={{ color: 'white', fontSize:20, fontFamily: "SpecialGothicExpandedOne_400Regular" }}>Trending</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={{ color: 'white', fontSize:20, fontFamily:"AnekDevanagari_400Regular" }}>Nyheder</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.tab}
            onPress={() => navigation.navigate('Profile' )} // Navigate to ProfileScreen
          >
            <Text style={{ color: 'white',fontSize:20, fontFamily:"AnekDevanagari_400Regular" }}>Din Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={{ color: 'white',fontSize:20, fontFamily:"AnekDevanagari_400Regular" }}>Kalender</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Frida style={styles.frida} width={180} height={180} />
      <ScrollView
        style={{position: 'absolute', top: 350,}}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, paddingTop: 20, paddingHorizontal: 20 }}
      >
        {NewsArticles.slice(6, 10).map((article, idx) => (
          <View
            key={article.id}
            style={[
              styles.trendingTab,
              { backgroundColor: idx % 2 === 0 ? '#CD1F4D' : '#112045' }
            ]}
          >
            <Text style={{ fontSize: 32, color: 'white', fontFamily: "SpecialGothicExpandedOne_400Regular" }}>
              {article.title}
            </Text>
            <Text style={{
              fontSize: 24,
              color: 'white',
              fontFamily: "AnekDevanagari_700Bold",
              marginBottom: 60,
              marginTop: 20
            }}>
              {article.subtitle}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: idx % 2 === 0 ? '#112045' : '#CD1F4D',
                borderRadius: 10,
                paddingVertical: 12,
                paddingHorizontal: 16,
                marginTop: 'auto',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('NewsArticles', { article })}
            >
              <Text style={{ color: 'white', fontSize: 24, fontFamily: "AnekDevanagari_700Bold" }}>
                Læs mere
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  frida: {
    position: 'absolute',
    top: 40,
    right:-70,
    transform: [{ rotate: '-45.353deg' }],
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: -100,
   
  },
  tabScroll: {
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingVertical: 60,
    width: '150%',
  },
  trendingTab: {
  
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
    width: 350,
  },
  tab: {
    backgroundColor: '#112045',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  tabIndicator: {
    backgroundColor: '#CD1F4D',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
  }
});
