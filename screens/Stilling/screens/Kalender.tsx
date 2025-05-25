import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function KalenderScreen() {
    const navigation = useNavigation();
    const [blink, setBlink] = useState(true);
    const [races, setRaces] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => setBlink(prev => !prev), 500);
        return () => clearInterval(interval);
    }, []);

    // Example fetch for Kalender
    useEffect(() => {
        async function fetchRaces() {
            const response = await fetch('https://ergast.com/api/f1/2024.json');
            const data = await response.json();
            const races = data.MRData.RaceTable.Races.map(race => ({
                round: race.round,
                country: race.Circuit.Location.country,
                location: race.Circuit.circuitName,
                date: race.date,
            }));
            setRaces(races);
        }
        fetchRaces();
    }, []);


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
                            <Text style={{ color: 'white', fontSize: 20 }}>Live fra Miami</Text>
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
                {races.map((race, index) => (
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
                            <Text style={styles.arrow}>{'\u203A'}</Text>
                        </View>
                    </View>
                ))}
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
        backgroundColor: '#192a56',
        borderRadius: 14,
        marginBottom: 16,
        paddingVertical: 18,
        paddingHorizontal: 18,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
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
       borderLeftWidth: 1,
        borderRadius: 8,
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
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
});
