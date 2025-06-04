import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import sportradarRacing from '@api/sportradar-racing';
import { Ionicons } from '@expo/vector-icons'; // Optional, for a back icon
import { AntDesign } from '@expo/vector-icons'; // For the arrow icon
import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
export default function KalenderScreen() {
    const navigation = useNavigation();
    const [blink, setBlink] = useState(true);
    const [races, setRaces] = useState([]);
    const [selectedRace, setSelectedRace] = useState(null); // <-- NEW

    let [fontsLoaded] = useFonts({
        DynaPuff_400Regular,
        SpecialGothicExpandedOne_400Regular,
        AnekDevanagari_400Regular,
    });

    useEffect(() => {
        const interval = setInterval(() => setBlink(prev => !prev), 500);
        return () => clearInterval(interval);
    }, []);

    // Use Sportsradar API for Kalender
    useEffect(() => {
        // Hardcoded 2025 F1 race calendar (dates and locations are illustrative, update as needed)
        const hardcodedRaces = [
  {
    round: 1,
    country: "Australia",
    location: "Melbourne",
    date: "16 Mar 2025",
    sessions: [
      { name: "Practice 1", date: "14 Mar", time: "12:30 - 13:30" },
      { name: "Practice 2", date: "14 Mar", time: "16:00 - 17:00" },
      { name: "Practice 3", date: "15 Mar", time: "12:30 - 13:30" },
      { name: "Qualifying", date: "15 Mar", time: "16:00 - 17:00" },
      { name: "Race", date: "16 Mar", time: "15:00" }
    ]
  },
  {
    round: 2,
    country: "China",
    location: "Shanghai",
    date: "23 Mar 2025",
    sessions: [
      { name: "Practice 1", date: "21 Mar", time: "11:30 - 12:30" },
      { name: "Sprint Qualifying", date: "21 Mar", time: "15:30 - 16:14" },
      { name: "Sprint", date: "22 Mar", time: "11:00 - 11:30" },
      { name: "Qualifying", date: "22 Mar", time: "15:00 - 16:00" },
      { name: "Race", date: "23 Mar", time: "15:00" }
    ]
  },
  {
    round: 3,
    country: "Japan",
    location: "Suzuka",
    date: "06 Apr 2025",
    sessions: [
      { name: "Practice 1", date: "04 Apr", time: "11:30 - 12:30" },
      { name: "Practice 2", date: "04 Apr", time: "15:00 - 16:00" },
      { name: "Practice 3", date: "05 Apr", time: "11:30 - 12:30" },
      { name: "Qualifying", date: "05 Apr", time: "15:00 - 16:00" },
      { name: "Race", date: "06 Apr", time: "14:00" }
    ]
  },
  {
    round: 4,
    country: "Bahrain",
    location: "Sakhir",
    date: "13 Apr 2025",
    sessions: [
      { name: "Practice 1", date: "11 Apr", time: "14:30 - 15:30" },
      { name: "Practice 2", date: "11 Apr", time: "18:00 - 19:00" },
      { name: "Practice 3", date: "12 Apr", time: "15:30 - 16:30" },
      { name: "Qualifying", date: "12 Apr", time: "19:00 - 20:00" },
      { name: "Race", date: "13 Apr", time: "18:00" }
    ]
  },
  {
    round: 5,
    country: "Saudi Arabia",
    location: "Jeddah",
    date: "20 Apr 2025",
    sessions: [
      { name: "Practice 1", date: "18 Apr", time: "16:30 - 17:30" },
      { name: "Practice 2", date: "18 Apr", time: "20:00 - 21:00" },
      { name: "Practice 3", date: "19 Apr", time: "16:30 - 17:30" },
      { name: "Qualifying", date: "19 Apr", time: "20:00 - 21:00" },
      { name: "Race", date: "20 Apr", time: "20:00" }
    ]
  },
  {
    round: 6,
    country: "USA",
    location: "Miami",
    date: "04 May 2025",
    sessions: [
      { name: "Practice 1", date: "02 May", time: "12:30 - 13:30" },
      { name: "Sprint Qualifying", date: "02 May", time: "15:30 - 16:14" },
      { name: "Sprint", date: "03 May", time: "11:00 - 11:30" },
      { name: "Qualifying", date: "03 May", time: "16:00 - 17:00" },
      { name: "Race", date: "04 May", time: "16:00" }
    ]
  },
  {
    round: 7,
    country: "Italy",
    location: "Imola",
    date: "18 May 2025",
    sessions: [
      { name: "Practice 1", date: "16 May", time: "13:30 - 14:30" },
      { name: "Practice 2", date: "16 May", time: "17:00 - 18:00" },
      { name: "Practice 3", date: "17 May", time: "12:30 - 13:30" },
      { name: "Qualifying", date: "17 May", time: "16:00 - 17:00" },
      { name: "Race", date: "18 May", time: "15:00" }
    ]
  },
  {
    round: 8,
    country: "Monaco",
    location: "Monte Carlo",
    date: "25 May 2025",
    sessions: [
      { name: "Practice 1", date: "23 May", time: "13:30 - 14:30" },
      { name: "Practice 2", date: "23 May", time: "17:00 - 18:00" },
      { name: "Practice 3", date: "24 May", time: "12:30 - 13:30" },
      { name: "Qualifying", date: "24 May", time: "16:00 - 17:00" },
      { name: "Race", date: "25 May", time: "15:00" }
    ]
  },
  {
    round: 9,
    country: "Spain",
    location: "Barcelona",
    date: "01 Jun 2025",
    sessions: [
      { name: "Practice 1", date: "30 May", time: "13:30 - 14:30" },
      { name: "Practice 2", date: "30 May", time: "17:00 - 18:00" },
      { name: "Practice 3", date: "31 May", time: "12:30 - 13:30" },
      { name: "Qualifying", date: "31 May", time: "16:00 - 17:00" },
      { name: "Race", date: "01 Jun", time: "15:00" }
    ]
  },
  {
    round: 10,
    country: "Canada",
    location: "Montreal",
    date: "15 Jun 2025",
    sessions: [
      { name: "Practice 1", date: "13 Jun", time: "13:30 - 14:30" },
      { name: "Practice 2", date: "13 Jun", time: "17:00 - 18:00" },
      { name: "Practice 3", date: "14 Jun", time: "12:30 - 13:30" },
      { name: "Qualifying", date: "14 Jun", time: "16:00 - 17:00" },
      { name: "Race", date: "15 Jun", time: "15:00" }
    ]
  },
  {
    round: 11,
    country: "Austria",
    location: "Spielberg",
    date: "29 Jun 2025",
    sessions: [
      { name: "Practice 1", date: "27 Jun", time: "13:30 - 14:30" },
      { name: "Practice 2", date: "27 Jun", time: "17:00 - 18:00" },
      { name: "Practice 3", date: "28 Jun", time: "12:30 - 13:30" },
      { name: "Qualifying", date: "28 Jun", time: "16:00 - 17:00" },
      { name: "Race", date: "29 Jun", time: "15:00" }
    ]
  },
  {
    round: 12,
    country: "Great Britain",
    location: "Silverstone",
    date: "06 Jul 2025",
    sessions: [
      { name: "Practice 1", date: "04 Jul", time: "12:30 - 13:30" },
      { name: "Practice 2", date: "04 Jul", time: "16:00 - 17:00" },
      { name: "Practice 3", date: "05 Jul", time: "11:30 - 12:30" },
      { name: "Qualifying", date: "05 Jul", time: "15:00 - 16:00" },
      { name: "Race", date: "06 Jul", time: "15:00" }
    ]
  },
  {
    round: 13,
    country: "Belgium",
    location: "Spa-Francorchamps",
    date: "27 Jul 2025",
    sessions: [
      { name: "Practice 1", date: "25 Jul", time: "12:30 - 13:30" },
      { name: "Sprint Qualifying", date: "25 Jul", time: "16:30 - 17:14" },
      { name: "Sprint", date: "26 Jul", time: "12:00 - 12:30" },
      { name: "Qualifying", date: "26 Jul", time: "16:00 - 17:00" },
      { name: "Race", date: "27 Jul", time: "15:00" }
    ]
  }];
 

        setRaces(hardcodedRaces);
    }, []);


    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginBottom: 20, marginTop: 40 }}>
                <Text style={styles.title}>Live</Text>
                <View style={[styles.blinkingDot, { opacity: blink ? 1 : 0.2 }]} />
            </View>
            <View style={{ width: '100%' }}>
                <View style={styles.Header}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10, alignItems: 'center', marginBottom: 20, width: '150%' }}
                    >
                        <TouchableOpacity
                            style={[styles.tab, styles.tab]}
                            onPress={() => navigation.navigate('Leaderboard')}
                        >
                            <Text style={{ color: 'white', fontSize: 20 }}>Leaderboard</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tab}
                            onPress={() => navigation.navigate('DriverStanding')}
                        >
                            <Text style={{ color: 'white', fontSize: 20 }}>Stilling</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, styles.tabActive]}
                            onPress={() => navigation.navigate('Kalender')}
                        >
                            <Text style={{ color: 'white', fontSize: 20 }}>Kalender</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
            <Text style={styles.sectionTitle}>Kalender</Text>
            <ScrollView style={styles.scrollContainer}>
                {selectedRace ? (
                    <>
                        <TouchableOpacity
                            style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', borderColor:'white', borderWidth:3, width: 120, paddingVertical: 10, borderRadius: 16, marginLeft: 'auto',marginRight:20,position:'absolute', right:10, }}
                            onPress={() => setSelectedRace(null)}
                        >
                            {/* Optional: Use Ionicons for a back arrow */}
                            {/* <Ionicons name="arrow-back" size={24} color="#CD1F4D" /> */}
                            <Text style={{ color: 'white', fontSize: 18 }}><AntDesign name="left" size={24} color="white" /> Tilbage</Text>
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', fontSize: 14, marginBottom: 5, fontFamily: "AnekDevanagari_400Regular" }}>{selectedRace.round ? `Runde ${selectedRace.round}` : ''}</Text>
                        <Text style={{ color: '#fff', fontSize: 22, marginBottom: 10, fontFamily: "SpecialGothicExpandedOne_400Regular" }}>
                            {selectedRace.country}
                        </Text>
                        {(selectedRace.sessions && selectedRace.sessions.length > 0) ? (
                            selectedRace.sessions.map((session, idx) => (
                                <View key={idx} style={styles.raceCard}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.raceCountry}>{session.name}</Text>
                                        <Text style={styles.raceLocation}>{session.time}</Text>
                                    </View>
                                    <View style={styles.dateBox}>
                                        <Text style={styles.dateText}>{session.date}</Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text style={{ color: '#b0b8c1', fontSize: 16, marginTop: 20 }}>
                                Ingen sessions tilgængelige for dette løb.
                            </Text>
                        )}
                    </>
                ) : (
                    races.map((race, index) => (
                        <View key={index} style={styles.raceCard}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.raceRound}>Runde {race.round}</Text>
                                <Text style={styles.raceCountry}>{race.country}</Text>
                                {race.location ? (
                                    <Text style={styles.raceLocation}>{race.location}</Text>
                                ) : null}
                            </View>
                            <View style={styles.dateBox}>
                                <Text style={styles.dateText}>{race.date}</Text>
                                <TouchableOpacity onPress={() => setSelectedRace(race)}>
                                    <Text style={styles.arrow}>{'\u203A'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    Header: { backgroundColor: 'White' },
    title: {
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 32,
        marginTop: 40,
        color: "#1e2c4c",
    },
    blinkingDot: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#CD1F4D',
        marginLeft: 12,
        marginTop: 4,
    },
    sectionTitle: {
        color: "#CD1F4D",
        fontSize: 36,
        marginVertical: 20,
        marginLeft: 10,
        fontFamily: "SpecialGothicExpandedOne_400Regular",
    },
    scrollContainer: { 
        backgroundColor: '#112045', 
        padding: 10 
    },
    tab: {
        backgroundColor: '#112045',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginRight: 10,
    },
    tabActive: {
        backgroundColor: '#CD1F4D',
    },
    raceCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#112045',
        marginBottom: 16,
        paddingVertical: 18,
        paddingHorizontal: 18,
        borderBottomColor: '#CD1F4D',
        borderBottomWidth: 1,
      
       
    },
    raceRound: {
        color: '#fff',
        fontFamily: "AnekDevanagari_400Regular",
        fontSize: 13,
        opacity: 0.7,
        marginBottom: 2,
    },
    raceCountry: {
        color: '#fff',
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 20,
        marginBottom: 2,
    },
    raceLocation: {
        color: '#b0b8c1',
        fontFamily: "AnekDevanagari_400Regular",
        fontSize: 13,
        marginTop: 2,
    },
    dateBox: {
       borderLeftColor: '#CD1F4D',
       borderLeftWidth: 4,
       
        paddingVertical: 8,
        paddingHorizontal: 14,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginLeft: 16,
        minWidth: 80,
        flexDirection: 'row',
    },
    dateText: {
        color: '#fff',
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 15,
        marginRight: 8,
        width: 100,
        textAlign:'center'
    },
    arrow: {
        color: '#CD1F4D',
        fontSize: 50,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
});
