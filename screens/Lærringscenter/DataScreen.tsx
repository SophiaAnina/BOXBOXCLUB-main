import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { DataArticles } from "./Data";
import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
export default function DataScreen() {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");

    const handlePress = (article) => {
        navigation.navigate('DataArticles', { article });
    };

    // Filter articles by title based on search input (case-insensitive)
    const filteredArticles = DataArticles.filter(article =>
        article.title.toLowerCase().includes(search.toLowerCase())
    );

    // Stacked cards as FlatList header
    const ListHeaderComponent = (
        <View>
            <Text style={styles.title}>Data</Text>
            <View style={{ marginTop: 20, marginBottom: 150, height: 300, position: 'relative' }}>
                {filteredArticles.slice(0, 4).map((item, index) => (
                    <TouchableOpacity
                        key={item.id.toString()}
                        style={{
                            backgroundColor: index % 2 === 0 ? '#112045' : '#CD1F4D',
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
        </View>
    );

    const [fontsLoaded] = useFonts({ DynaPuff_400Regular, AnekDevanagari_400Regular, SpecialGothicExpandedOne_400Regular });
    if (!fontsLoaded) return null;

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Fixed Header */}
            <View style={{ paddingTop: 60, paddingHorizontal: 20, backgroundColor: 'white', zIndex: 10 }}>
                <Text style={styles.title}>Lær’ mere</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Søg her"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
                <View style={styles.scrollContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.tabScroll}>
                        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('NewsScreen')}>
                            <Text style={styles.tabText}>Nyt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tabIndicator} onPress={() => navigation.navigate('DataScreen')}>
                            <Text style={styles.tabIndicatorText}>Data</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('ReglerScreen')}>
                            <Text style={styles.tabText}>Regler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('DriverScreen')}>
                            <Text style={styles.tabText}>Kørere</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
            {/* Scrollable Content */}
            <FlatList
                style={{ flex: 1, paddingHorizontal: 20 }}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={filteredArticles.slice(4, 11)}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={ListHeaderComponent}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            backgroundColor: (index + 1) % 3 === 0 ? '#CD1F4D' : '#112045',
                            padding: 16,
                            borderRadius: 8,
                            marginBottom: 12,
                            marginRight: 8,
                            flex: 1,
                            minWidth: 0,
                            maxHeight: 150,
                            aspectRatio: 1,
                            width: '48%',
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 60,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    title: {
        marginTop: 20,
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width:'100%',
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
    }
});