import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useFonts, DynaPuff_400Regular, DynaPuff_500Medium, DynaPuff_600SemiBold, DynaPuff_700Bold } from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
import { supabase } from "../../lib/supabase"; // Adjust path if needed

const questions = [
  {
    question: "Hvad betyder et gult flag under et Formel 1-løb?",
    options: [
      { text: "Køreren skal køre ind i pitten", isCorrect: false },
      { text: "Køreren bliver diskvalificeret", isCorrect: false },
      { text: "Køreren bliver overhalet og skal sænke farten", isCorrect: false },
      { text: "Man skal passe på og sænke farten", isCorrect: true },
    ],
  },
  {
    question: "Hvad betyder et gult flag under et Formel 1-løb?",
    options: [
      { text: "Pitstop er tilladt", isCorrect: false },
      { text: "Banen er fri for fare, normal kørsel genoptages", isCorrect: false },
      { text: "Der er fare på banen og kørerne skal sænke farten", isCorrect: false },
      { text: "Kørene skal lade en anden bil passere", isCorrect: true },
    ],
  },
  {
    question: "Hvad betyder et blåt flag, når det vises til en kører?",
    options: [
      { text: "Løbet stoppes", isCorrect: false },
      { text: "Kørerne må overhale", isCorrect: false },
      { text: "Køreren bliver overhalet og skal give plads", isCorrect: true },
      { text: "Der gives point", isCorrect: false },
    ],
  },
  {
    question: "Hvad betyder et sort og hvidt diagonalt flag i Formel 1?",
    options: [
      { text: "Køreren har tekniske problemer", isCorrect: false },
      { text: "Køreren får en advarsel for usportslig opførsel", isCorrect: true },
      { text: "Køreren skal give en position tilbage", isCorrect: false },
      { text: "Køreren bliver diskvalificeret", isCorrect: false },
    ],
  },
  {
    question: "Hvad betyder et rødt flag under et løb?",
    options: [
      { text: "Racet bliver midlertidigt stoppet", isCorrect: true },
      { text: "Køreren er ude af løbet", isCorrect: false },
      { text: "Køreren skal skifte dæk", isCorrect: false },
      { text: "Sikkerhedsbilen er på banen", isCorrect: false },
    ],
  },
];

async function addXpToUser(xpToAdd: number) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // Fetch current XP
  const { data, error } = await supabase
    .from("profiles")
    .select("xp")
    .eq("id", user.id)
    .single();

  if (error) return;

  const newXp = (data?.xp || 0) + xpToAdd;

  // Update XP in database
  await supabase
    .from("profiles")
    .update({ xp: newXp })
    .eq("id", user.id);
}

export default function QuizScreen() {
  const navigation = useNavigation();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [fontsLoaded] = useFonts({ DynaPuff_400Regular, DynaPuff_500Medium, DynaPuff_600SemiBold, DynaPuff_700Bold, AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, SpecialGothicExpandedOne_400Regular });
  if (!fontsLoaded) return null;

  const handleAnswer = (isCorrect, index) => {
    setSelectedAnswer(index);
    if (isCorrect && selectedAnswer === null) {
      setScore(score + 1);
    }
  };

  const handleNext = async () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelectedAnswer(null);
    } else {
      // Add XP before navigating to Result
      await addXpToUser(score * 100);
      navigation.navigate("Result", { score, total: questions.length });
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('HBFStart')} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.backButtonText}>Tilbage</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>
        {[...Array(questions.length)].map((_, i) => (
          <View key={i} style={i <= current ? styles.circleRed : styles.circle}></View>
        ))}
      </View>
      <View style={styles.Spørgsmål}>
        <Text style={styles.questionTitle}>Spørgsmål {current + 1}</Text>
        <Text style={styles.questionText}>{questions[current].question}</Text>
      </View>
      </View>
      <View style={styles.Questions}>
        {questions[current].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedAnswer === index && styles.selectedOption,
            ]}
            onPress={() => handleAnswer(option.isCorrect, index)}
            disabled={selectedAnswer !== null}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          disabled={selectedAnswer === null}
        >
          <Text style={styles.nextButtonText}>
            {current === questions.length - 1 ? "Afslut" : "Næste"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    flex: 1,
    backgroundColor: "#112045",
  },
  header: {
   backgroundColor: "white",
   paddingTop:10,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: "#454545",
    marginBottom: 10,
    marginRight: 10,
  },
  circleRed: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: "#CD1F4D",
    marginBottom: 10,
    marginRight: 10,
  },
  questionTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: "white",
    fontFamily: "SpecialGothicExpandedOne_400Regular",
    textAlign: "center",
  },
  questionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
    color: "white",
    fontFamily: "AnekDevanagari_700Bold",
    width: 290,
    alignSelf: "center",
  },
  option: {
    borderColor: "#CD1F4D",
    borderWidth: 3,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: "80%",
    height: 80,
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedOption: {
    backgroundColor: "#CD1F4D",
  },
  optionText: {
    fontSize: 14,
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
    alignSelf: "center",
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
    marginBottom: 20,
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
  Questions: {
    backgroundColor: "#112045",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignSelf: "flex-end",
    height: "100%",
    padding: 10,
  },
});