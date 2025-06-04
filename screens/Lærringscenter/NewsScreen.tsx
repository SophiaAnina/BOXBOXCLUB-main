import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from "react-native";
import { useFonts, AnekDevanagari_400Regular } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { NewsArticles } from "./Data";



export default function NewsScreen() {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");

    const handlePress = (article) => {
        navigation.navigate('NewsArticles', { article });
    };

    // Filter articles by title based on search input (case-insensitive)
    const filteredArticles = NewsArticles.filter(article =>
        article.title.toLowerCase().includes(search.toLowerCase())
    );

    // Combine the "stacked" and "grid" articles into one list for FlatList
    const stackedArticles = filteredArticles.slice(0, 4);
    const gridArticles = filteredArticles.slice(4, 11);

    const [fontsLoaded] = useFonts({ AnekDevanagari_400Regular, SpecialGothicExpandedOne_400Regular });
    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lær’ mere</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Søg her" value={search} onChangeText={setSearch} />
            </View>
            <View style={styles.scrollContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
                    <TouchableOpacity style={styles.tabIndicator} onPress={() => navigation.navigate('NewsScreen')}>
                        <Text style={styles.tabIndicatorText}>Nyt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('DataScreen')}>
                        <Text style={styles.tabText}>Data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('ReglerScreen')}>
                        <Text style={styles.tabText}>Regler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('DriverScreen')}>
                        <Text style={styles.tabText}>Kørere</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <Text style={styles.title}>Ugens data</Text>
            <FlatList
                style={{ height: 150, marginBottom: 20 }}
                data={gridArticles}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[ styles.GridArticle,{ backgroundColor: (index + 1) % 3 === 0 ? '#CD1F4D' : '#112045'}]}
                        onPress={() => handlePress(item)}
                    >
                        <Text style={{ color: 'white', fontFamily: "AnekDevanagari_400Regular", fontSize: 16 }}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {item.subtitle}
                        </Text>
                        <Text
                            style={{ color: 'white', fontSize: 18, fontFamily: "SpecialGothicExpandedOne_400Regular" }}
                        >
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            
            <FlatList
                style={{ }}
                data={gridArticles}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[ styles.GridArticle,{ backgroundColor: (index + 1) % 3 === 0 ? '#CD1F4D' : '#112045'}]}
                        onPress={() => handlePress(item)}
                    >
                        <Text style={{ color: 'white', fontFamily: "AnekDevanagari_400Regular", fontSize: 16 }}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {item.subtitle}
                        </Text>
                        <Text
                            style={{ color: 'white', fontSize: 18, fontFamily: "SpecialGothicExpandedOne_400Regular" }}
                        >
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingHorizontal: 20,
        overflow:'scroll'
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

    GridArticle:{
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    marginRight: 8,
    flex: 1,
    minWidth: 0,
    maxHeight: 150,
   
   
}
});