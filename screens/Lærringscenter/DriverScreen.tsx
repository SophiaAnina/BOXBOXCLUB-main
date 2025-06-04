import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from "react-native";
import { useFonts, AnekDevanagari_400Regular } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function DriverScreen() {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");
    const [drivers, setDrivers] = useState([]);

    const [fontsLoaded] = useFonts({ AnekDevanagari_400Regular, SpecialGothicExpandedOne_400Regular });
    if (!fontsLoaded) return null;

    // Fetch all drivers on mount
    useEffect(() => {
      async function fetchDrivers() {
        try {
          const res = await fetch("https://api.openf1.org/v1/drivers");
          const data = await res.json();
          // Only keep the first occurrence of each driver_number
          const uniqueDrivers = [];
          const seenNumbers = new Set();
          for (const driver of data) {
            if (driver.driver_number && !seenNumbers.has(driver.driver_number)) {
              uniqueDrivers.push(driver);
              seenNumbers.add(driver.driver_number);
            }
            if (uniqueDrivers.length === 20) break; // Stop after 20 drivers
          }
          setDrivers(uniqueDrivers);
        } catch (e) {
          setDrivers([]);
        }
      }
      fetchDrivers();
    }, []);

    // Filter drivers by name based on search input (case-insensitive)
    const filteredDrivers = drivers.filter(driver =>
        (driver.full_name || "").toLowerCase().includes(search.toLowerCase())
    );

    const handlePress = (driver) => {
        navigation.navigate('DriverArticles', { driver }); // <-- FIXED
    };

    // 1. Team mapping (team emoji, name, and driver numbers)
const teams = [
   {
    name: "Alpine",
    drivers: [
      { full_name: "Pierre Gasly", driver_number: "10" },
      { full_name: "Jack Doohan", driver_number: "61" },
    ],
  },
   {
    name: "Aston Martin",
    drivers: [
      { full_name: "Fernando Alonso", driver_number: "14" },
      { full_name: "Lance Stroll", driver_number: "18" },
    ],
  },
    {
    name: "Ferrari",
    drivers: [
      { full_name: "Charles Leclerc", driver_number: "16" },
      { full_name: "Lewis Hamilton", driver_number: "44" },
    ],
  },
   {
    name: "Haas",
    drivers: [
      { full_name: "Esteban Ocon", driver_number: "31" },
      { full_name: "Oliver Bearman", driver_number: "87" },
    ],
  },
  {
    name: "McLaren",
    drivers: [
      { full_name: "Lando Norris", driver_number: "4" },
      { full_name: "Oscar Piastri", driver_number: "81" },
    ],
  },

  {
    name: "Mercedes",
    drivers: [
      { full_name: "George Russell", driver_number: "63" },
      { full_name: "Andrea Kimi Antonelli", driver_number: "12" },
    ],
  },
  {
    name: "Racing Bulls",
    drivers: [
      { full_name: "Yuki Tsunoda", driver_number: "22" },
      { full_name: "Isack Hadjar", driver_number: "6" },
    ],
  },
  {
    name: "Red Bull Racing",
    drivers: [
      { full_name: "Max Verstappen", driver_number: "1" },
      { full_name: "Liam Lawson", driver_number: "30" },
    ],
  },
  
  {
    name: "Sauber",
    drivers: [
      { full_name: "Nico Hülkenberg", driver_number: "27" },
      { full_name: "Gabriel Bortoleto", driver_number: "5" },
    ],
  },
  {
    name: "Williams",
    drivers: [
      { full_name: "Alexander Albon", driver_number: "23" },
      { full_name: "Carlos Sainz", driver_number: "55" },
    ],
  },
];

// 2. Group drivers by team
const driversByTeam = teams.map(team => {
  // Find driver objects from API data matching the team driver numbers
  const teamDrivers = team.drivers
    .map(td =>
      drivers.find(
        d =>
          (d.driver_number && d.driver_number.toString() === td.driver_number) ||
          (d.full_name && d.full_name.toLowerCase() === td.full_name.toLowerCase())
      )
    )
    .filter(Boolean)
    .filter(driver =>
      (driver.full_name || "").toLowerCase().includes(search.toLowerCase())
    );
  return { ...team, teamDrivers };
});

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Lær’ mere</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Søg her"
                    value={search}
                    onChangeText={setSearch}/>
            </View>
                    <View style={styles.scrollContainer}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.tabScroll}>
                      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('NewsScreen')}>
                        <Text style={styles.tabText}>Nyt</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('DataScreen')}>
                        <Text style={styles.tabText}>Data</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.tab}
                        onPress={() => navigation.navigate('ReglerScreen' )} // Navigate to ReglerScreen
                      >
                        <Text style={styles.tabText}>Regler</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.tabIndicator} onPress={() => navigation.navigate('DriverScreen')}>
                        <Text style={styles.tabIndicatorText}>Kørere</Text>
                      </TouchableOpacity>
                    </ScrollView>
            </View>
          
            <Text style={styles.title}>Kørere</Text>
            <View style={{ marginTop: 20, marginBottom: 80 }}>
  {driversByTeam.map(
    team =>
      team.teamDrivers.length > 0 && (
        <View key={team.name} style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 20, fontFamily: "SpecialGothicExpandedOne_400Regular", marginBottom: 8 }}>
            {team.name}
          </Text>
          {team.teamDrivers.map(driver => (
            <View
              key={driver.driver_number}
              style={styles.Spørgsmålcontainer}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.Spørgsmål}>{driver.full_name}</Text>
                <TouchableOpacity
                  onPress={() => handlePress(driver)}
                  style={styles.Info}
                >
                  <Text style={styles.InfoText}>Info</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )
  )}
</View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    title: {
        marginTop: 20,
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        
        width:'100%' ,
       backgroundColor:'#D9D9D9',
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 20,
        fontSize:20,
    },
    
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        fontFamily: "AnekDevanagari_400Regular",
        fontSize: 20,
    },
     scrollContainer: {
    width: '100%',
    
  },
  tabScroll: {
    paddingHorizontal: 10,
    alignItems: 'center',
    width: '120%',
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
    
  },
    tabText: {
        color: 'white',
        fontSize: 20,
        fontFamily: "AnekDevanagari_400Regular",
    },
    tabIndicatorText: {
        color: 'white',
        fontSize: 20,
        fontFamily: "SpecialGothicExpandedOne_400Regular",
    },
    Spørgsmålcontainer: {
      backgroundColor: '#112045',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
    },
    Spørgsmål: {
      color: 'white',
      fontFamily: "SpecialGothicExpandedOne_400Regular",
      fontSize: 18,
    },
    Info: {
      borderLeftColor:'#CD1F4D',
      borderLeftWidth: 4,
     
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    InfoText: {
      color: 'white',
      fontFamily: "AnekDevanagari_400Regular",
      fontSize: 16,
    },
});