import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useFonts, DynaPuff_400Regular, DynaPuff_500Medium, DynaPuff_600SemiBold, DynaPuff_700Bold } from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";

export default function DriversStandingScreen() {
    const navigation = useNavigation();
    const [standings, setStandings] = useState([]);

    useEffect(() => {
        async function fetchDriverStandings() {
            const response = await fetch('https://ergast.com/api/f1/2024/driverStandings.json');
            const data = await response.json();
            const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(driver => ({
                position: driver.position,
                driver: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
                points: driver.points,
            }));
            setStandings(standings);
        }
        fetchDriverStandings();
    }, []);

    const [fontsLoaded] = useFonts({ DynaPuff_400Regular, DynaPuff_500Medium, DynaPuff_600SemiBold, DynaPuff_700Bold, AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, SpecialGothicExpandedOne_400Regular });
    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginBottom: 20, marginTop: 40 }}>
                <Text style={styles.title}>Live</Text>
            </View>
            <View style={{ width: '100%' }}>
                <View style={styles.Header}>
                     <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 10, alignItems: 'center', marginBottom: 20, width: '150%' }}
                          >
                            <TouchableOpacity
                              style={{ backgroundColor: '#112045', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 16, marginRight: 10 }}
                              onPress={() => navigation.navigate('Leaderboard')}
                            >
                              <Text style={{ color: 'white', fontSize: 20 }}>Leaderboard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{ backgroundColor: '#CD1F4D', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 16, marginRight: 10 }}
                              onPress={() => navigation.navigate('DriverStanding')}
                            >
                              <Text style={{ color: 'white', fontSize: 20 }}>Stilling</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{ backgroundColor: '#112045', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 16, marginRight: 10 }}
                              onPress={() => navigation.navigate('Kalender')}
                            >
                              <Text style={{ color: 'white', fontSize: 20 }}>Kalender</Text>
                            </TouchableOpacity>
                      </ScrollView>
                </View>
            </View>
            <Text style={styles.sectionTitle}>Mesterskab</Text>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.item}>
                    <TouchableOpacity
                        style={{ borderRadius: 10, paddingVertical: 12, paddingHorizontal: 16, marginRight: 10 }}
                        onPress={() => navigation.navigate('TeamStanding')}
                    >
                        <Text style={{ color: 'white', fontSize: 20 }}>Holdets stilling</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: '#CD1F4D', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 16, marginRight: 10 }}
                        onPress={() => navigation.navigate('DriverStanding')}
                    >
                        <Text style={{ color: 'white', fontSize: 20 }}>Kørernes stilling</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.item}>
                    <Text style={styles.position}>Plads</Text>
                    <Text style={styles.driverTitle}>Navn</Text>
                    <Text style={styles.pointsTitle}>Point</Text>
                </View>
                {standings.map((driver, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={styles.position}>{driver.position}</Text>
                        <Text style={styles.driver}>{driver.driver}</Text>
                        <Text style={styles.points}>{driver.points}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    Header: {
        backgroundColor: 'White',
    },
    title: {
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 32,
        marginTop: 40,
        color: "#1e2c4c",
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
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        marginVertical: 6,
        borderBottomColor: '#CD1F4D',
        borderBottomWidth: 1,
    },
    position: {
        color: '#fff',
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        width: 60
    },
    driver: {
        color: '#fff',
        fontFamily: "AnekDevanagari_400Regular",
        flex: 1
    },
    driverTitle: {
        color: '#fff',
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        flex: 1
    },
    pointsTitle: {
        color: '#fff',
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        textAlign: 'right',
        width: 50,
    },
    points: {
        color: 'white',
        fontFamily: "AnekDevanagari_400Regular",
        width: 50,
        textAlign: 'right'
    },
});
