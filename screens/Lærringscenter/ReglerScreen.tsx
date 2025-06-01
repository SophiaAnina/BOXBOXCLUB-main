import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from "react-native";
import { useFonts, AnekDevanagari_400Regular } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import Reglerarticles  from "./Data";
import { VirtualizedList } from "react-native";


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
          <View style={{ marginTop: 20, marginBottom: 80, height: 300, position: 'relative' }}>
  {filteredArticles.slice(0, 4).map((item, index) => (
    <TouchableOpacity
      key={item.id.toString()}
      style={{
        backgroundColor: index % 2 === 0 ? '#112045' : '#CD1F4D', // Alternate colors
        padding: 16,
        paddingBottom: 50,
        borderRadius: 8,
        position: 'absolute',
        top: index * 100,
        zIndex: filteredArticles.length + index,
        width: '100%',
      }}
      onPress={() => handlePress(item)}
    >
      <Text style={{ color: 'white', fontFamily:"AnekDevanagari_400Regular", fontSize: 16 }}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.subtitle}
      </Text>
      <Text
        style={{ color: 'white', fontSize: 18, fontFamily:"SpecialGothicExpandedOne_400Regular" }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  ))}
</View>

<FlatList
  style={{marginTop:100, marginBottom:80}}
  data={filteredArticles.slice(4, 11)}
  keyExtractor={(item) => item.id.toString()}
  numColumns={2}
  columnWrapperStyle={{ justifyContent: 'space-between' }}
  showsVerticalScrollIndicator={false}
  renderItem={({ item, index }) => (
    <TouchableOpacity
      style={{
        backgroundColor: (index + 1) % 3 === 0 ? '#CD1F4D' : '#112045', // Every third item is red
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        marginRight: 8,
        flex: 1,
        minWidth: 0,
        maxHeight: 150,
        aspectRatio: 1,
        width: '48%', // Adjust width to fit two items per row
      }}
      onPress={() => handlePress(item)}
    >
      <Text style={{ color: 'white', fontFamily:"AnekDevanagari_400Regular", fontSize: 16 }}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.subtitle}
      </Text>
      <Text
        style={{ color: 'white', fontSize: 18, fontFamily:"SpecialGothicExpandedOne_400Regular" }}
      >
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