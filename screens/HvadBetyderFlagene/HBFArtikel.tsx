import React from "react";
import { View, Text, StyleSheet,TouchableOpacity,ScrollView } from "react-native";
import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
import  Frida from "../../assets/FridaFart/frida-pagne-pokal.svg";
import GultFlag from "../../assets/svg/flags/gult-flag.svg";
import Gronflag from "../../assets/svg/flags/gronflag.svg";
import RodFlag from "../../assets/svg/flags/rodflag.svg";
import BlaaFlag from "../../assets/svg/flags/blaaflag.svg";
import SortHvidFlag from "../../assets/svg/flags/sort-hvidflag.svg";
import { AntDesign } from "@expo/vector-icons";

export default function HBFArtikel() {
    return(
        <ScrollView style={styles.container}>
             <TouchableOpacity onPress={() => navigation.navigate('HBFArtikelStart')} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.backButtonText}>Tilbage</Text>
      </TouchableOpacity>
            <Text style={styles.title}>Hvad betyder flagene i Formel 1?</Text>
            <Text style={styles.subtitle}>I Formel 1 bruges flag til at kommunikere vigtig information til kørerne under løbet. Hvert flag har sin egen farve og betydning, og det er afgørende, at kørerne forstår og reagerer korrekt på dem – både for sikkerhedens og sportens skyld.</Text>
            <View style={styles.info}>
            <Text style={styles.infoTitle}>Gult flag fare på banen</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <Text style={styles.content}>I Formel 1 bruges flag til at kommunikere vigtig information til kørerne under løbet. Hvert flag har sin egen farve og betydning, og det er afgørende, at kørerne forstår og reagerer korrekt på dem – både for sikkerhedens og sportens skyld.</Text>
            <GultFlag style={styles.Flag} width={100} height={100} />
            </View>
            </View>
               <View style={styles.info}>
            <Text style={styles.infoTitle}>Grønt flag Faren er ovre</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <Text style={styles.content}>Det grønne flag vises, når banen igen er sikker efter en gul flagzone.Regel: Kørerne må fortsætte med normal hastighed og må gerne overhale igen.</Text>
            <Gronflag style={styles.Flag} width={100} height={100} />
            </View>
            </View>
               <View style={styles.info}>
            <Text style={styles.infoTitle}>Blåt flag Giv plads hurtigere bil</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <Text style={styles.content}>Et blåt flag vises til kørere, der er ved at blive overhalet med en omgang af en hurtigere bil.</Text>
            <BlaaFlag style={styles.Flag} width={100} height={100} />
            </View>
            </View>
               <View style={styles.info}>
            <Text style={styles.infoTitle}>Rødt flag Løbet stoppes</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <Text style={styles.content}>Et rødt flag betyder, at løbet afsluttes midlertidigt eller helt, typisk på grund af en alvorlig ulykke, kraftig regn eller andet, der gør det for farligt at fortsætte.</Text>
            <RodFlag style={styles.Flag} width={100} height={100} />
            </View>
            </View>
               <View style={[styles.info    , { marginBottom: 40 }]}>
            <Text style={styles.infoTitle}>Sort-hvidt diagonalt flag Advarsel</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <Text style={styles.content}>Et rødt flag betyder, at løbet afsluttes midlertidigt eller helt, typisk på grund af en alvorlig ulykke, kraftig regn eller andet, der gør det for farligt at fortsætte.</Text>
            <SortHvidFlag style={styles.Flag} width={100} height={100} />
            </View>
            </View>

        </ScrollView>
    )

}
const styles = StyleSheet.create({
    container: {
       paddingBottom: 80,
        padding: 23,
    },
    title: {
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 32,
       justifyContent: "flex-end",
        marginBottom: 20,
        color: "#112045",
    },
    subtitle:{
        fontSize: 16,
        fontFamily: "AnekDevanagari_500Medium",
        lineHeight: 24,
        marginBottom: 10,
        color: "#112045",
    },
    info:{
        backgroundColor: "#112045",
        padding: 20,
        borderRadius: 16,
        marginTop: 20,
    },
    infoTitle:{
        fontSize: 20,
        fontFamily: "SpecialGothicExpandedOne_400Regular",
       
        marginBottom: 10,
        color: "white",
    },
    content: {
        fontFamily: "AnekDevanagari_400Regular",
        color: "white",
        fontSize: 20,
       width: "70%",
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
    Flag: {
        alignSelf: "center",
        marginRight: 20,
    },
    backButton: {
    borderColor: "black",
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
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "Anek Devanagari",
    justifyContent: "space-between",
  },
});