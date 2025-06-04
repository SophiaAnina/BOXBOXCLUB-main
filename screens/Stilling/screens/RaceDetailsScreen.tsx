import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts, DynaPuff_400Regular } from '@expo-google-fonts/dynapuff';

export default function RaceDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { race } = route.params;

  const [fontsLoaded] = useFonts({ DynaPuff_400Regular });
  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: "#112045", padding: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <Text style={styles.round}>Runde {race.round}</Text>
        <Text style={styles.title}>{race.country}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Tilbage</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {(race.sessions ?? []).length > 0 ? (
          race.sessions.map((session, idx) => (
            <View key={idx} style={styles.sessionCard}>
              <View>
                <Text style={styles.sessionName}>{session.name}</Text>
                <Text style={styles.sessionTime}>{session.time}</Text>
              </View>
              <View style={styles.sessionDateBox}>
                <Text style={styles.sessionDate}>{session.date}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ color: 'white', marginTop: 20 }}>Ingen sessions tilgængelige for dette løb.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  round: { color: "#b0b8c1", fontSize: 16, marginRight: 8 },
  title: { color: "white", fontSize: 24, fontWeight: "bold", flex: 1 },
  backButton: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginLeft: 10,
  },
  backButtonText: { color: "white", fontSize: 16 },
  sessionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#CD1F4D",
    borderBottomWidth: 2,
    paddingVertical: 18,
    marginBottom: 8,
  },
  sessionName: { color: "white", fontSize: 20, fontWeight: "bold" },
  sessionTime: { color: "#b0b8c1", fontSize: 16 },
  sessionDateBox: {
    borderLeftColor: "#CD1F4D",
    borderLeftWidth: 4,
    paddingLeft: 16,
    alignItems: "center",
    minWidth: 60,
  },
  sessionDate: { color: "white", fontSize: 18, fontWeight: "bold" },
});