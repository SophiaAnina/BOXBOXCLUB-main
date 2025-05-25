import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from "react-native";
import { useFonts, AnekDevanagari_400Regular } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import Reglerarticles  from "./Data";

export default function ReglerScreen() {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");

    const handlePress = (article) => {
        navigation.navigate('ReglerArticles', { article });
    };

    // Filter articles by title based on search input (case-insensitive)
    const filteredArticles = Reglerarticles.filter(article =>
        article.title.toLowerCase().includes(search.toLowerCase())
    );

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
                        style={styles.tabIndicator}
                        onPress={() => navigation.navigate('ReglerScreen' )} // Navigate to ReglerScreen
                      >
                        <Text style={styles.tabIndicatorText}>Regler</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('DriverScreen')}>
                        <Text style={styles.tabText}>Kørere</Text>
                      </TouchableOpacity>
                    </ScrollView>
            </View>
            <Text style={styles.title}>Regler</Text>
            <FlatList
                style={styles.FlatList}
                data={filteredArticles}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#CD1F4D',
                      padding: 16,
                      borderRadius: 8,
                      marginBottom: 12,
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
        paddingVertical: 100,
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
  FlatList:{
    marginBottom: 80,
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