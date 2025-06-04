import React, { useEffect, useState } from "react";
import { useFonts, AnekDevanagari_400Regular } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

// Hardcoded highest positions for each driver by driver_number
const highestPositions: { [key: string]: number } = {
  "1": 1,   // Max Verstappen (4-time World Champion)
  "4": 2,   // Lando Norris (2nd in 2024)
  "5": 1,   // Gabriel Bortoleto (rookie — 1st in F2, but no F1 result yet, mark as 0)
  "6": 0,   // Isack Hadjar (rookie)
  "10": 7,  // Pierre Gasly (7th in 2019)
  "12": 0,  // Andrea Kimi Antonelli (rookie)
  "14": 2,  // Fernando Alonso (2nd in 2010, 2012, 2013)
  "16": 2,  // Charles Leclerc (2nd in 2022)
  "18": 11, // Lance Stroll (11th in 2020)
  "22": 14, // Yuki Tsunoda (14th in 2021)
  "23": 7,  // Alex Albon (7th in 2020)
  "27": 7,  // Nico Hülkenberg (7th in 2018)
  "30": 9,  // Liam Lawson (9th in 2024)
  "31": 8,  // Esteban Ocon (8th in 2017, 2022)
  "33": 1,  // (legacy — Max Verstappen before switching to #1)
  "44": 1,  // Lewis Hamilton (7-time World Champion)
  "55": 5,  // Carlos Sainz (5th in 2021)
  "61": 0,  // Jack Doohan (rookie)
  "81": 8,  // Oscar Piastri (8th in 2023, likely higher in 2025 but we'll go with this)
  "87": 0   // Oliver Bearman (rookie)
};
const DriverAge: { [key: string]: number } = {
  "1": 26,   // Max Verstappen
  "4": 24,   // Lando Norris
  "5": 19,   // Gabriel Bortoleto
  "6": 19,   // Isack Hadjar  
  "10": 27,  // Pierre Gasly
  "12": 19,  // Andrea Kimi Antonelli
  "14": 38,  // Fernando Alonso
  "16": 24,  // Charles Leclerc
  "18": 25,  // Lance Stroll
  "22": 22,  // Yuki Tsunoda
  "23": 24,  // Alex Albon
  "27": 24,  // Nico Hülkenberg
  "30": 19,  // Liam Lawson
  "31": 24,  // Esteban Ocon
  "33": 26,  // (legacy — Max Verstappen before switching to #1)
  "44": 37,  // Lewis Hamilton
  "55": 24,  // Carlos Sainz
  "61": 19,  // Jack Doohan
  "81": 22,  // Oscar Piastri
  "87": 19   // Oliver Bearman
};

export default function DataArticles({ route }) {
  const driver = route?.params?.driver;
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({ AnekDevanagari_400Regular, SpecialGothicExpandedOne_400Regular });
  if (!fontsLoaded) return null;

  if (!driver) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", fontSize: 18 }}>Ingen kører valgt.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity onPress={() => navigation.navigate('DriverScreen')} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.backButtonText}>Tilbage</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontFamily: "SpecialGothicExpandedOne_400Regular"}}>
        {driver.full_name || "Ukendt fører"}
      </Text>
      {driver.headshot_url ? (
        <View style={{ alignItems: "center", position:'absolute', top: '40%', right: 0, left: 0 }}>
          <Image
            source={{ uri: driver.headshot_url }}
            style={{position:"absolute" , width: 150, height: 150,right:0,top:'10%' }}
          />
        </View>
      ) : null}

  
      <View style={{ flexDirection: "column", flexWrap: "wrap", justifyContent: "space-between", marginVertical: 10 }}>
        {/* Row 1 */}
       
          <Text style={{ fontSize: 24, fontFamily: "AnekDevanagari_400Regular" }}>Nummer</Text>
          <Text style={{ fontFamily: "SpecialGothicExpandedOne_400Regular" , fontSize: 24, paddingBottom: 20}}>{driver.driver_number}</Text>
       
          <Text style={{ fontSize: 24, fontFamily: "AnekDevanagari_400Regular" }}>Nationalitet</Text>
          <Text style={{ fontFamily: "SpecialGothicExpandedOne_400Regular", fontSize: 24, paddingBottom: 20 }}>{driver.country_code}</Text>

          <Text style={{ fontSize: 24, fontFamily: "AnekDevanagari_400Regular" }}>Team</Text>
          <Text style={{ fontFamily: "SpecialGothicExpandedOne_400Regular", fontSize: 24, paddingBottom: 20 }}>{driver.team_name}</Text>

          <Text style={{ fontSize: 24, fontFamily: "AnekDevanagari_400Regular" }}>Bedste placering</Text>
          <Text style={{ fontFamily: "SpecialGothicExpandedOne_400Regular", fontSize: 24, paddingBottom: 20 }}>
            {highestPositions[driver.driver_number]
              ? `${highestPositions[driver.driver_number]}`
              : "Ukendt"}
          </Text>


        <Text style={{ fontSize: 24, fontFamily: "AnekDevanagari_400Regular" }}>Alder</Text>
        <Text style={{ fontFamily: "SpecialGothicExpandedOne_400Regular", fontSize: 24 }}>
          {DriverAge[driver.driver_number] ? `${DriverAge[driver.driver_number]} år` : "Ukendt"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    borderColor: "black",
    borderWidth: 1,
    width: 120,
    paddingVertical: 10,
    marginBottom: 50,
    marginTop: 50,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    borderRadius: 8,
  },
  backButtonText: {
    color: "black",
    fontSize: 17,
    fontFamily: "SpecialGothicExpandedOne_400Regular",
  },
});
// Add your articles data here