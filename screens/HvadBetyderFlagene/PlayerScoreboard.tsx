import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import { SvgXml } from "react-native-svg";
import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";


export default function PlayerScoreboard() {
    const navigation = useNavigation();
    const [profiles, setProfiles] = React.useState<any[]>([]);

    let [fontsLoaded] = useFonts({
        DynaPuff_400Regular,
        // ...add other fonts here if needed
      });
    
      if (!fontsLoaded) {
        return null; // or a loading indicator
      }

    React.useEffect(() => {
        const fetchProfiles = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('username, avatar_url, xp');

            if (error) {
                console.error(error);
                return;
            }

            setProfiles(data);
        };

        fetchProfiles();
    }, []);

    // Sort profiles by xp descending and get top 3
    const topThree = [...profiles]
        .sort((a, b) => (b.xp ?? 0) - (a.xp ?? 0))
        .slice(0, 3);

    // Arrange as 2, 1, 3 if all three exist
    const podiumOrder = topThree.length === 3
        ? [topThree[1], topThree[0], topThree[2]]
        : topThree;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('QuizHome')} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                    <Text style={styles.backButtonText}>Tilbage</Text>
                </TouchableOpacity>
                <View style={styles.podiumRow}>
                    {podiumOrder.map((item, idx) => {
                        // Podium heights and numbers for 2,1,3
                        const podiumStyles = [
                            { height: 80, number: 2 }, // Left (2nd)
                            { height: 120, number: 1 }, // Center (1st)
                            { height: 60, number: 3 }, // Right (3rd)
                        ];
                        const styleIdx = podiumOrder.length === 3 ? idx : 1; // fallback if less than 3
                        return (
                            <View key={item.username + idx} style={styles.podiumItem}>
                                <View style={[styles.avatarWrapper, { top: -10 }]}>
                                    <SvgXml xml={item.avatar_url} width={70} height={70} />
                                </View>
                                {/* Username under avatar, above podium */}
                                <Text style={styles.topThreeName}>{item.username}</Text>
                                <View style={[styles.podiumBase, { height: podiumStyles[styleIdx].height }]}>
                                    <Text style={styles.podiumNumber}>{podiumStyles[styleIdx].number}</Text>
                                </View>
                                <Text style={styles.topThreeXP}>{item.xp} XP</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
            <View style={styles.content}>
                <FlatList

                    data={
                        [...profiles]
                            .sort((a, b) => (b.xp ?? 0) - (a.xp ?? 0))
                            .slice(3) // Skip the top 3
                    }
                    keyExtractor={(item, index) => item.username + index}
                    renderItem={({ item }) => (
                        <View style={{ marginBottom: 20, flexDirection: "row", borderColor: "black", borderWidth: 4, padding: 10, borderRadius: 8, alignItems: "center" }}>
                            <SvgXml xml={item.avatar_url} width={50} height={50} />
                            <View style={{ flexDirection: "column", marginLeft: 10 }}>
                                <Text style={styles.subtitle}>{`${item.username}`}</Text>
                                <Text style={styles.subtitle}>{` ${item.xp} XP`}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
       height: "100%",
        backgroundColor: "white",
    },
    avatar:{
        backgroundColor:'#D8A4B2',
        padding: 10,
        borderRadius: 50,
    },
    header: {
        height: 350,
        paddingTop:40,
        width: "100%",
        backgroundColor: "#CD1F4D",
        marginBottom: 60,
    },
    podiumRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        
        marginBottom: 10,
    },
    podiumItem: {
        alignItems: "center",
        marginHorizontal: 18,
        width: 90,
        position: "relative",
    },
    avatarWrapper: {
        backgroundColor: "#F3D6E0",
        borderRadius: 50,
        padding: 6,
    
        zIndex: 2,
    },
    podiumBase: {
        width: 90,
        backgroundColor: "#1A2341",
        borderRadius: 10,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 5,
    },
    podiumNumber: {
        color: "white",
       fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 28,
        marginBottom: 8,
    },
    topThreeName: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
      
        marginBottom: 4, // Add for spacing before podium
        
    },
    topThreeXP: {
        color: "#1A2341",
      fontFamily: "AnekDevanagari_500Medium",
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
       
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        overflow: "hidden",
        textAlign: "center",
    },
   backButton: {
    borderColor: "white",
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
    color: "white",
    fontSize: 17,
    fontFamily: "SpecialGothicExpandedOne_400Regular",
    justifyContent: "space-between",
  },
    content: {
        padding: 20,
    },
    subtitle:{
        fontSize: 14,
        fontFamily: "AnekDevanagari_500Medium",
    }
});