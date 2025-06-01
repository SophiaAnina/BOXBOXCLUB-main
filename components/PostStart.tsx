import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useFonts, DynaPuff_400Regular } from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
import { SvgXml } from "react-native-svg";
import Frida from "../assets/FridaFart/frida-dobbelt-thumps-up.svg";
import Car from "../assets/svg/Car.svg";
import Racetrack from "../assets/svg/Racetrack.svg";

export default function PostStart({ onDone }) {
  return (
    <View style={styles.container}>
      <Frida width={300} height={300} style={styles.frida} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Velkommen til chatten</Text>
        <Text style={styles.Text}>
          {" "}
          Her er plads til alle – vi lytter, respekterer hinanden og taler
          ordentligt. Sammen skaber vi et trygt og hyggeligt fællesskab.
        </Text>
        <TouchableOpacity onPress={onDone}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "SpecialGothicExpandedOne_400Regular",
              color: "white",
              marginTop: 20,
              backgroundColor: "#CD1F4D",
              paddingHorizontal: 65,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            Forstået
          </Text>
        </TouchableOpacity>
        <Car style={styles.car} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 28,
    fontFamily: "SpecialGothicExpandedOne_400Regular",
    color: "#112045",
    textAlign: "center",
    marginVertical: 5,
  },
  Text: {
    fontSize: 20,
    fontFamily: "AnekDevanagari_400Regular",
    color: "#112045",
    textAlign: "center",
    marginTop: 10,
  },
  frida: {
    position: "absolute",
    top: -10,
    left: -155,
    transform: [{ rotate: "90deg" }],
    marginTop: 10,
  },
  car: {
    position: "absolute",
    bottom: -228,
    right: "25%",
  },
});