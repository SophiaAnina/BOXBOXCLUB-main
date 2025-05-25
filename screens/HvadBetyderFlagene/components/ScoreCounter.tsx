import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AnekDevanagari_400Regular } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";

interface ScoreCounterProps {
  score: number;
  total: number;
}

const ScoreCounter: React.FC<ScoreCounterProps> = ({ score, total }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>
        Du fik {score} /{total}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  scoreText: {
    fontSize: 32,
    fontFamily: "SpecialGothicExpandedOne_400Regular",
   
  },
});

export default ScoreCounter;