import React from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
import  Frida from "../../assets/FridaFart/frida-pagne-pokal.svg";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HBFArtikelStart() {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
             <TouchableOpacity onPress={() => navigation.navigate('HBFStart')} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="white" />
        <Text style={styles.backButtonText}>Tilbage</Text>
      </TouchableOpacity>
            <View style={{ position: "absolute", bottom: 0, left:23, }} >
            <Text style={styles.subtitle}>Info</Text>
            <Text style={styles.title}>Flags betydning</Text>
            <Text style={styles.content}>I Formel 1 bruges flag til at kommunikere vigtig information til kørerne under løbet. Hvert flag har sin egen farve og betydning, og det er afgørende, at kørerne forstår og reagerer korrekt på dem – både for sikkerhedens og sportens skyld.</Text>
            <TouchableOpacity style={styles.LæsButton} onPress={() => navigation.navigate('HBFArtikel')}>
                <Text style={styles.LæsButtonText}>Læs artikel om flag</Text>
            </TouchableOpacity>
            <Frida style={styles.frida} width={270} height={270}  />
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        height: "100%",
       
        padding: 23,
        backgroundColor:"#112045"
    },
    title: {
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 32,
       justifyContent: "flex-end",
        marginBottom: 20,
        color: "white",
    },
    subtitle:{
        fontSize: 20,
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontWeight: "bold",
        marginBottom: 10,
        color: "white",
    },
    content: {
        fontFamily: "AnekDevanagari_400Regular",
        color: "white",
        fontSize: 20,
    },
    LæsButton: {
        backgroundColor: "#CD1F4D",
        padding: 10,
        borderRadius: 16,
        marginTop: 20,
    },
    LæsButtonText: {
        color: "white",
        fontSize: 20,
        fontFamily: "AnekDevanagari_600SemiBold",
        textAlign: "center",
    },
    frida:{
       alignSelf: "center",
    },
    backButton: {
    borderColor: "white",
    borderWidth: 1,
    width: 120,
    paddingVertical: 10,
    marginLeft: 10,
    marginBottom: 38,
    marginTop: 40,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    borderRadius: 8,
  },
  backButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "Anek Devanagari",
    justifyContent: "space-between",
  },
});