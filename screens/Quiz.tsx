import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Frida from '../assets/FridaFart/frida-gronflag.svg';
import Raceline from '../assets/svg/Raceline.svg';
import Gulbil from '../assets/svg/gul-bil.svg';
import Lillabil from '../assets/svg/lilla-bil.svg';
import Groenbil from '../assets/svg/groen-bil.svg';
import Startingbox from '../assets/svg/Starting box.svg';
import { supabase } from '../lib/supabase'; // Import the Supabase client

export default function Quiz() {
    const [fontsLoaded] = useFonts({
        DynaPuff_400Regular,
        AnekDevanagari_400Regular,  
        SpecialGothicExpandedOne_400Regular,
    });

    const [username, setUsername] = useState<string | null>(null);
    const [xp, setXp] = useState<number | null>(null);
    const maxXp = 5000; // Define the maximum XP for the progress bar
    const targetXp = 5000; // Define the target XP
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchUserData() {
            try {
                // Get the authenticated user's ID
                const {
                    data: { user },
                    error: authError,
                } = await supabase.auth.getUser();

                if (authError) throw authError;
                if (!user) throw new Error('User not authenticated');

                // Fetch username and xp from the profiles table
                const { data, error: fetchError } = await supabase
                    .from('profiles')
                    .select('username, xp')
                    .eq('id', user.id)
                    .single();

                if (fetchError) throw fetchError;

                setUsername(data?.username || null);
                setXp(data?.xp || null);
                console.log("Fetched XP:", data?.xp); // <-- Add this line
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    // Add this function to Quiz.tsx (copy from ProfilScreen.tsx)
    function getTitleByXp(xp: number | null) {
        if (xp === null) return "Ukendt";
        if (xp < 1000) return "F1 Rookie";
        if (xp < 2000) return "F1 Begynder";
        if (xp < 3000) return "F1 Overtaker";
        if (xp < 5000) return "F1 Videns Champion";
        return "F1 Legend";
    }

    // Returns the XP threshold for the next title
    function getNextTitleXp(xp: number | null) {
        if (xp === null || xp < 1000) return 1000;
        if (xp < 2000) return 2000;
        if (xp < 3000) return 3000;
        if (xp < 5000) return 5000;
        return 5000; // F1 Legend is the last, so cap at 5000
    }

    // Returns the XP threshold for the current title
    function getCurrentTitleXp(xp: number | null) {
        if (xp === null) return 0;
        if (xp < 1000) return 0;
        if (xp < 2000) return 1000;
        if (xp < 3000) return 2000;
        if (xp < 5000) return 3000;
        return 5000;
    }

    // Helper to get the next title
    function getNextTitle(xp: number | null) {
        if (xp === null) return getTitleByXp(0);
        if (xp < 1000) return getTitleByXp(1000);
        if (xp < 2000) return getTitleByXp(2000);
        if (xp < 3000) return getTitleByXp(3000);
        if (xp < 5000) return getTitleByXp(5000);
        return "F1 Legend";
    }

    return (
        <View>
            <Text style={styles.Title}>Quiz</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.Circle}></View>
                        <Text style={styles.Username}>{username}</Text>
                        
                    </View>
              <Text style={styles.RemainingXp}>
                        {xp !== null ? getNextTitleXp(xp) - xp : getNextTitleXp(0)} xp left to reach {getNextTitle(xp)}
                    </Text>
                    <View style={styles.ProgressBarContainer}>
                        <View 
                            style={[
                                styles.ProgressBar, 
                                { 
                                    width: `${
                                        xp !== null
                                            ? ((xp - getCurrentTitleXp(xp)) / (getNextTitleXp(xp) - getCurrentTitleXp(xp))) * 100
                                            : 0
                                    }%`
                                }
                            ]}
                        />
                    </View>
                    {/* Add the remaining XP text */}
                  
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={styles.xp}>{xp} XP</Text>
                <Frida width={100} height={100} />
                </View>
            </View>

              <View style={styles.Quizcontainer}>
                <Raceline style={styles.Raceline} width={15} height={704} />
                 
            <View>
            <View style={styles.Spørgsmålcontainer}>
                <Text style={styles.SpørgsmålText}>Back of the grid</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.Spørgsmål}>Hvad Betyder flagene ?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('HBFStart')} style={styles.Info}>
                        <Text style={styles.InfoText}>Info</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '70%' }}>
               <View style={styles.QuizCirce}>
                <Gulbil width={120} height={120} style={styles.Gulbil}/>
                <Startingbox style={styles.Startingbox}/>
               </View>
                <TouchableOpacity 
                onPress={() => navigation.navigate('HBFStart')}
                style={styles.Start}>
                    <Text style={styles.StartText}>Start</Text>
                </TouchableOpacity>
                   

            </View>
            <Lillabil  width={120} height={120} style={styles.Lillabil}/>

            <Groenbil style={styles.Gronbil}  width={120} height={120}/>
            <TouchableOpacity 
            style={styles.ScoreboardButton}
            onPress={() => navigation.navigate('PlayerScoreboard')}>
                <MaterialIcons name="scoreboard" size={40} color="white" />
            </TouchableOpacity>
            </View>
            
             <Raceline style={styles.RacelineRight} width={15} height={704} />               
            </View>   
        </View>
    );
}

const styles = StyleSheet.create({
    Title: {
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 32,
        marginTop: 40,
        marginBottom: 18,
        marginLeft: 20,
        color: '#112045',
    },
    
    Circle: {
        marginLeft: 20,
        width: 27,
        height: 27,
        borderRadius: 50,
        backgroundColor: '#CD1F4D',
    },
    Gulbil: {
        marginBottom: 10,
    },
    Username: {
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 14,
        marginLeft: 14,
        color: '#112045',
    },
    xp: {
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 14,
        position: 'absolute',
        right: 100,
        color: '#112045',
        marginTop: 16,
        
    },
    ProgressBarContainer: {
        height: 10,
        width: '100%',
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
       marginLeft: 20,
        marginTop: 10,
    },
    ProgressBar: {
        height: '100%',
        backgroundColor: '#112045',
        borderRadius: 5,
        
    },
    Spørgsmålcontainer: {
        backgroundColor:'#112045',
        paddingLeft:44,
        paddingRight:12,
        paddingTop:12,
        paddingBottom:12,
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        height: 120,
    },
    SpørgsmålText: {
        fontFamily: "AnekDevanagari_400Regular",
        fontSize: 14,
        marginBottom: 8,
        width: 218,
        color: 'white',
       
    },
    Spørgsmål: {
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 20,
        width: 218,
        color: 'white',
         borderRightColor: '#CD1F4D',
        borderRightWidth: 6,
        alignContent: 'center',
    },
    Info: {
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 14,
        color: 'white',
        borderLeftColor: '#CD1F4D',
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 10,
    },
    InfoText: {
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        paddingVertical: 4,
        paddingHorizontal: 8,
      
        borderRadius: 5,
    },
    RemainingXp: {
        fontFamily: " AnekDevanagari_400Regular",
        fontSize: 14,
        color: '#112045',
        marginTop: 8,
        marginLeft: 20,
    },
    Quizcontainer: {
       backgroundColor:'#363430',
        flexDirection: 'row',
    },
    RacelineRight: {
       position: 'absolute',
       right: 0,
       top: -44,
    },
    Lillabil:{
     marginLeft:'auto',
     marginRight:'10%',
       
    },
    Gronbil:{
        marginLeft:'10%'
    },
    Startingbox:{
        position: 'absolute',
        left:30,
        top: 65,
    },
    QuizCirce:{
        backgroundColor: '#CD1F4D',
        borderRadius: '100%',
        marginLeft:10,
        padding:20,
    },
    Raceline: {
        position: 'relative',
        left: 0,
        bottom:44,
    },
    Start:{
        backgroundColor: '#CD1F4D',
        paddingVertical: 12,
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignSelf:'center',
        borderRadius: 50, 
        marginLeft:24,
    },
    StartText:{
        fontFamily: "AnekDevanagari_400Regular",
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    ScoreboardButton: {
        position: 'absolute',
        bottom: 180,
        right: 20,
        backgroundColor: '#CD1F4D',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});