import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useFonts, AnekDevanagari_400Regular } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
export default function ReglerArticles({ route }) {
  const { article } = route.params;

  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 100 }}>
     <TouchableOpacity onPress={() => navigation.navigate('ReglerScreen')} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.backButtonText}>Tilbage</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontFamily: "SpecialGothicExpandedOne_400Regular"}}>{article.title}</Text>
      {article.sections.map((section) => (
        <View key={section.id} style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 16, fontFamily: "AnekDevanagari_400Regular"}}>{section.subtitle}</Text>
          <Text style={{ fontSize: 16, fontFamily: "AnekDevanagari_400Regular"}}>{section.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  backButton: {
    borderColor: "black",
    borderWidth: 1,
    width: 120,
    paddingVertical: 10,
    marginLeft: 10,
    marginBottom:20,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    borderRadius: 8,
  },
  backButtonText: {
    color: "black",
    fontSize: 17,
    fontFamily: "SpecialGothicExpandedOne_400Regular",
    justifyContent: "space-between",
  },
})