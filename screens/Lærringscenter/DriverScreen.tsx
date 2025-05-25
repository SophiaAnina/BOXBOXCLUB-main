import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from "react-native";
import { useFonts, AnekDevanagari_400Regular } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { F1DriverArticles } from "./Data";


export default function DriverScreen() {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");

    const handlePress = (article) => {
        navigation.navigate('F1DriverArticles', { article });
    };

    // Filter articles by title based on search input (case-insensitive)
    const filteredArticles = F1DriverArticles.filter(article =>
        article.title.toLowerCase().includes(search.toLowerCase())
    );

    // Helper to get 4 random articles
    function getRandomArticles(arr, n) {
      const shuffled = arr.slice().sort(() => 0.5 - Math.random());
      return shuffled.slice(0, n);
    }
    const randomDriverArticles = getRandomArticles(F1DriverArticles, 4);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Lær’ mere</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Søg her"
                    value={search}
                    onChangeText={setSearch}
                />
                <TouchableOpacity style={styles.button}>
                    <AntDesign style={styles.filter} name="filter" size={30} color="#CD1F4D" />
                </TouchableOpacity>
            </View>
            <View style={styles.scrollContainer}>
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.tabScroll}
                    >
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
            <Text style={styles.title}>Tilfældige kørere</Text>
            <FlatList
                data={randomDriverArticles}
                keyExtractor={(item) => item.id.toString() + "-random"}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#112045',
                      padding: 16,
                      borderRadius: 8,
                      marginRight: 12,
                      width: 180,
                    }}
                    onPress={() => handlePress(item)}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )}
              />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
       paddingHorizontal: 24,
    },
    title: {
        marginTop: 20,
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: 310,
       backgroundColor:'#D9D9D9',
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 20,
    },
    
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
        marginBottom: 20,
    },
     scrollContainer: {
    width: '100%',
    
  },
  tabScroll: {
    paddingHorizontal: 10,
    alignItems: 'center',
    
    width: '150%',
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
    }
});