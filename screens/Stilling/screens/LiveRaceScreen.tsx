import React, { useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { bahrainGPResults } from '../../../data/bahrainGPResults'; // adjust path if needed

export default function Leaderboard() {
  const navigation = useNavigation();
  const [drivers, setDrivers] = useState([]);
  const [blink, setBlink] = useState(true);
  const [trackName, setTrackName] = useState("");
  const [isLive, setIsLive] = useState(false);

  const teamColors = {
    "Red Bull Racing": "#1E41FF",
    "Ferrari": "#DC0000",
    "Mercedes": "#00D2BE",
    "McLaren": "#FF8700",
    "Aston Martin": "#006F62",
    "Sauber": "#52E252",
    "RB": "#6692FF",
    "Williams": "#00A3E0",
    "Haas": "#B6BABD",
    "Alpine": "#0090FF",
  };

  useEffect(() => {
    // Blinking dot effect
    const interval = setInterval(() => setBlink(prev => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchLiveData() {
      try {
        // 1. Check if there is a live session
        const sessionRes = await fetch('https://api.openf1.org/v1/sessions?session_type=Race&meeting_key=latest');
        const sessions = await sessionRes.json();
        const liveSession = sessions.find(s => s.session_status === "ACTIVE");

        if (liveSession) {
          setIsLive(true);
          setTrackName(liveSession.circuit_short_name || liveSession.circuit_name || "Live");
          // 2. Fetch live leaderboard data
          const leaderboardRes = await fetch(`https://api.openf1.org/v1/position?session_key=${liveSession.session_key}`);
          const leaderboard = await leaderboardRes.json();

          // 3. Map data to your driver format
          const mappedDrivers = leaderboard.map((entry, idx) => ({
            id: entry.driver_number || idx,
            position: entry.position,
            driver: `${entry.driver_first_name} ${entry.driver_last_name}`,
            team: entry.team_name,
            lapTime: entry.best_lap_time || "-", // or use another field if needed
          }));
          setDrivers(mappedDrivers);
        } else {
          setIsLive(false);
          setTrackName("Seneste løb");
          setDrivers(bahrainGPResults); // fallback to last race results
        }
      } catch (err) {
        setIsLive(false);
        setTrackName("Seneste løb");
        setDrivers(bahrainGPResults);
      }
    }

    fetchLiveData();
  }, []);

  return (
    <View style={styles.container}>
    
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginBottom: 20, marginTop: 80 }}>
  <Text style={styles.title}>Live</Text>
  <View
    style={[
      styles.blinkingDot,
      { opacity: blink ? 1 : 0.2 }
    ]}
  />
</View>
     <ScrollView
  horizontal
  showsHorizontalScrollIndicator={true}
  contentContainerStyle={{ alignItems: 'center', marginBottom: 20, paddingHorizontal: 10 }}
  style={{ height: 100 }} // <-- Add this line
>
             <TouchableOpacity
               style={{ backgroundColor: '#CD1F4D', borderRadius: 10, marginRight: 10, paddingVertical: 12, paddingHorizontal: 16 }}
               onPress={() => navigation.navigate('Leaderboard')}
             >
               <Text style={{ color: 'white', fontSize: 16, backgroundColor: '#CD1F4D', fontFamily: "SpecialGothicExpandedOne_400Regular" }}>
  {trackName ? `Live fra ${trackName}` : ""}
</Text>
             </TouchableOpacity>
             <TouchableOpacity
               style={{ backgroundColor: '#112045', borderRadius: 10, marginRight: 10, paddingVertical: 12, paddingHorizontal: 16 }}
               onPress={() => navigation.navigate('DriverStanding')}
             >
               <Text style={{ color: 'white', fontSize: 16, fontFamily: "SpecialGothicExpandedOne_400Regular" }}>Stilling</Text>
             </TouchableOpacity>
             <TouchableOpacity
               style={{ backgroundColor: '#112045', borderRadius: 10, marginRight: 10, paddingVertical: 12, paddingHorizontal: 16 }}
               onPress={() => navigation.navigate('Kalender')}
             >
               <Text style={{ color: 'white', fontSize: 16, fontFamily: "SpecialGothicExpandedOne_400Regular" }}>Kalender</Text>
             </TouchableOpacity>
           </ScrollView>
    <FlatList
  style={styles.FlatList}  
  data={drivers}
  keyExtractor={(item, index) => `${item.id}-${index}`}
  renderItem={({ item }) => (
    <View style={styles.item}>
      <View 
        style={[
          styles.colorIndicator, 
          { backgroundColor: teamColors[item.team] || "#999" }
        ]}
      />
      <Text style={styles.position}>{item.position}</Text>
      <Text style={styles.driver}>{item.driver}</Text>
      <Text style={styles.time}>{item.lapTime}</Text>
    </View>
  )}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  title:{
    fontFamily: "SpecialGothicExpandedOne_400Regular",
    fontSize: 32,
    marginTop:80,
    marginLeft: 20,
    color: "#112045",
  },
  scrollContainer: {
    width: '100%',
  },
  tabScroll: {
    alignItems: 'center',
    width: '150%',
  },
  tab: {
    backgroundColor: '#112045',
    borderRadius: 10,
   
    marginRight: 10,
  },
  tabActive: {
    backgroundColor: '#CD1F4D',
    borderRadius: 10,
   
    marginRight: 10,
  },
  FlatList:{
    marginTop: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#cd1f4d",
    backgroundColor: "#112045",
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  position: { 
    width: 30, 
    fontWeight: "bold", 
    color: "#fff" 
  },
  driver: { 
    flex: 1, 
    color: "#fff" 
  },
  time: { 
    width: 80, 
    textAlign: "right", 
    color: "#fff" 
  },
  blinkingDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#CD1F4D',
    marginLeft: 20,
    alignSelf: 'center',
    marginTop:80,
    
  },
});
