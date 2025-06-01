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

  useEffect(() => {
    // Blinking dot effect
    const interval = setInterval(() => setBlink(prev => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let intervalId;

    async function fetchLiveData() {
      const apiKey = "t7JbrRVDzbK1QLtrix0u76ydstqMV74uyRhH5Rnj"; // replace with your Sportradar API key

      try {
        // 1️⃣ Get the season's schedule
        const scheduleUrl = `https://api.sportradar.com/formula1/trial/v2/en/sport_events/schedule.json?api_key=${apiKey}`;
        const scheduleRes = await axios.get(scheduleUrl);
        const events = scheduleRes.data.sport_events;

        // 2️⃣ Find the event that's currently live
        const liveEvent = events.find(event => event.status === "in_progress");

        if (liveEvent) {
          const stageId = liveEvent.id;

          // 3️⃣ Fetch live summary for that event
          const summaryUrl = `https://api.sportradar.com/formula1/trial/v2/en/sport_events/${stageId}/summary.json?api_key=${apiKey}`;
          const summaryRes = await axios.get(summaryUrl);
          const summary = summaryRes.data;

          // 4️⃣ Map drivers/competitors standings
          const standings = summary.sport_event_status.competitors;

          const mappedDrivers = standings.map((entry, idx) => ({
            id: entry.id || idx,
            position: entry.qualifying_position || entry.position || idx + 1,
            driver: entry.name,
            team: entry.team?.name || entry.team_name || "Unknown",
            lapTime: entry.best_lap_time || "-",
          }));

          setIsLive(true);
          setTrackName(summary.sport_event.venue.name || "Live");
          setDrivers(mappedDrivers);

        } else {
          // No live race
          setIsLive(false);
          setTrackName("Ingen løb i gang");
          setDrivers([]);
        }

      } catch (err) {
        console.error("Fetch error", err);
        setIsLive(false);
        setTrackName("Bahrain GP");
        setDrivers(bahrainGPResults);
      }
    }

    fetchLiveData();
    intervalId = setInterval(fetchLiveData, 15000); // Poll every 15 seconds

    return () => clearInterval(intervalId);
  }, []);

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
                : `Scores fra ${trackName}`
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
