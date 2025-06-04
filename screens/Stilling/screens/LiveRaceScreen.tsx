import React, { useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { bahrainGPResults } from '../../../data/bahrainGPResults'; // adjust path if needed
import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";

export default function Leaderboard() {
  const navigation = useNavigation();
  const [drivers, setDrivers] = useState([]);
  const [blink, setBlink] = useState(true);
  const [trackName, setTrackName] = useState("");
  const [isLive, setIsLive] = useState(true);

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

  let [fontsLoaded] = useFonts({
    DynaPuff_400Regular,
    // ...add other fonts here if needed
  });

  useEffect(() => {
    async function fetchLiveData() {
      try {
        // 1. Get all sessions, sorted by latest
        const sessionsRes = await fetch('https://api.openf1.org/v1/sessions');
        const sessions = await sessionsRes.json();

        // 2. Find a live session (status = "active" or "started")
        let liveSession = sessions.find(
          s => s.session_status && (s.session_status.toLowerCase() === "active" || s.session_status.toLowerCase() === "started")
        );

        // 3. If no live session, use the latest completed race session (type "Race")
        let sessionToUse = liveSession;
        if (!sessionToUse) {
          // Find the latest completed race session
          const raceSessions = sessions
            .filter(s => s.session_type === "Race")
            .sort((a, b) => new Date(b.date_end) - new Date(a.date_end));
          sessionToUse = raceSessions[0];
        }

        if (!sessionToUse) {
          setDrivers([]);
          setTrackName("");
          return;
        }

        const meetingKey = sessionToUse.meeting_key;

        // Fetch positions
        const posRes = await fetch(`https://api.openf1.org/v1/position?meeting_key=${meetingKey}`);
        const positions = await posRes.json();

        // Fetch drivers
        const driversRes = await fetch(`https://api.openf1.org/v1/drivers?meeting_key=${meetingKey}`);
        const driversData = await driversRes.json();

        // Fetch stints (for tyre info)
        const stintsRes = await fetch(`https://api.openf1.org/v1/stints?meeting_key=${meetingKey}`);
        const stintsData = await stintsRes.json();

        // Fetch pit stops
        const pitRes = await fetch(`https://api.openf1.org/v1/pit?meeting_key=${meetingKey}`);
        const pitData = await pitRes.json();

        // Merge, sort, and limit to 20 drivers
        const mappedDrivers = positions
          .map((item) => {
            const driverInfo = driversData.find(d => d.driver_number === item.driver_number) || {};
            const stintInfo = stintsData.filter(s => s.driver_number === item.driver_number);
            const pitCount = pitData.filter(p => p.driver_number === item.driver_number).length;
            const currentTyre = stintInfo.length > 0 ? stintInfo[stintInfo.length - 1].compound : '-' ;

            return {
              id: item.driver_number,
              position: item.position,
              driver: driverInfo.full_name || item.driver_number,
              team: item.team_name,
              lapTime: item.best_lap_time || '-',
              carNumber: item.driver_number,
              tyre: currentTyre,
              pitStops: pitCount,
            };
          })
          .filter(d => d.position && d.position <= 20)
          .sort((a, b) => a.position - b.position)
          .slice(0, 20);

        setDrivers(mappedDrivers);
        setTrackName(sessionToUse.meeting_name || "");
      } catch (error) {
        setDrivers([]);
        setTrackName("");
      }
    }

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginBottom: 20 }}>
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
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center', marginBottom: 20, paddingHorizontal: 10 }}
        style={{ height: 100 }}
      >
        <TouchableOpacity
          style={{ backgroundColor: '#CD1F4D', borderRadius: 10, marginRight: 10, paddingVertical: 12, paddingHorizontal: 16 }}
          onPress={() => navigation.navigate('Leaderboard')}
        >
          <Text style={{ color: 'white', fontSize: 16, backgroundColor: '#CD1F4D', fontFamily: "SpecialGothicExpandedOne_400Regular" }}>
            {trackName
              ? isLive
                ? `Live fra ${trackName}`
                : `Leaderbord`
              : ""}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ backgroundColor: '#112045', borderRadius: 10, marginRight: 10, paddingVertical: 12, paddingHorizontal: 16, height: '100%' }}
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
        ListEmptyComponent={() => (
          <View style={{ padding: 20 }}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Ingen data tilgængelig</Text>
          </View>
        )}
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
  title: {
    fontFamily: "SpecialGothicExpandedOne_400Regular",
    fontSize: 32,
    marginTop: 80,
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
    paddingVertical: 12,
  },
  tabActive: {
    backgroundColor: '#CD1F4D',
    borderRadius: 10,
    marginRight: 10,
  },
  FlatList: {
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
    marginTop: 80,
  },
});
