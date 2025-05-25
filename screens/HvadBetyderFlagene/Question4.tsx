import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";

export default function Question4() {
  const navigation = useNavigation();
  const route = useRoute();
  const { score: initialScore = 0, total = 5 } = route.params || {};
  const [score, setScore] = useState(initialScore);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer

  const handleAnswer = (isCorrect, index) => {
    setSelectedAnswer(index); // Set the selected answer index
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Question3')} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.backButtonText}>Tilbage</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 20, justifyContent: "space-evenly" }}>
        <View style={styles.circle}></View>
        <View style={styles.circle}></View>
        <View style={styles.circle}></View>
        <View style={styles.circleRed}></View>
        <View style={styles.circle}></View>
      </View>
      <View style={styles.Spørgsmål}>
        <Text style={styles.questionTitle}>Spørgsmål 4</Text>
        <Text style={styles.questionText}>Hvad betyder et sort og hvidt diagonalt flag i Formel 1?</Text>
      </View>
      <View style={styles.Questions}>
        {[
          { text: "Køreren har tekniske problemer", isCorrect: false },
          { text: "Køreren får en advarsel for usportslig opførsel", isCorrect: false },
          { text: "Køreren skal give en position tilbage", isCorrect: false },
          { text: " Køreren bliver diskvalificeret", isCorrect: true },
        ].map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedAnswer === index && styles.selectedOption, // Apply red background if selected
            ]}
            onPress={() => handleAnswer(option.isCorrect, index)}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("Question5", { score, total: total })}
        >
          <Text style={styles.nextButtonText}>Næste</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#454545",
    marginBottom: 10,
    marginRight: 10,
  },
  circleRed: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#CD1F4D",
    marginBottom: 10,
    marginRight: 10,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 24,
  },
  option: {
    borderColor: "#CD1F4D",
    borderWidth: 3,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: "80%",
    height: 90,
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedOption: {
    backgroundColor: "#CD1F4D", 
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontFamily: "AnekDevanagari_400Regular",
   
  },
  nextButton: {
    backgroundColor: "#CD1F4D",
    padding: 16,
    borderRadius: 8,
    marginTop: 15,
    width: "90%",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "AnekDevanagari_600SemiBold",
  },
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
  Spørgsmål: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#112045",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  questionTitle: {
    fontSize: 20,
    marginBottom: 8,
    color: "white",
    fontFamily: "SpecialGothicExpandedOne_400Regular",
  },
  questionText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 8,
    color: "white",
    fontFamily: "AnekDevanagari_700Bold",
    width: 290,
  },
  Questions: {
    backgroundColor: "#112045",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignSelf:'flex-end',
    height: "100%",
    padding: 10,
  },
});