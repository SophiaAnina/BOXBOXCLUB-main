import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";

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
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View>
            <Text style={styles.Title}>Quiz</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 20 }}>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <View style={styles.Circle}></View>
                        <Text style={styles.Username}>{username}</Text>
                        
                    </View>
              <Text style={styles.RemainingXp}>
                        {xp ? targetXp - xp : targetXp} xp left to reach F1 Star
                    </Text>
                    <View style={styles.ProgressBarContainer}>
                        <View 
                            style={[
                                styles.ProgressBar, 
                                { width: `${(xp ? xp / maxXp : 0) * 100}%` }
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
                <Gulbil style={styles.Gulbil}/>
                <Startingbox style={styles.Startingbox}/>
               </View>
                <TouchableOpacity 
                onPress={() => navigation.navigate('Home', { screen: 'HBFStart' })}
                style={styles.Start}>
                    <Text style={styles.StartText}>Start</Text>
                </TouchableOpacity>
                   

            </View>
            <Lillabil style={styles.Lillabil}/>

            <Groenbil/>
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
        marginTop: 80,
        marginBottom: 24,
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
    Username: {
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 14,
        marginLeft: 14,
        color: '#112045',
    },
    xp: {
        fontFamily: "SpecialGothicExpandedOne_400Regular",
        fontSize: 14,
        justifyContent: 'flex-end',
        color: '#112045',
        marginTop: 16,
    },
    ProgressBarContainer: {
        height: 10,
        width: '140%',
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        marginHorizontal: 20,
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
       top: 0,
    },
    Lillabil:{
     marginLeft:'auto',
        marginRight: 'auto',
    },
    Startingbox:{
        position: 'absolute',
        left:40,
        top: 90,
    },
    QuizCirce:{
        backgroundColor: '#CD1F4D',
        borderRadius: '100%',
        marginLeft:10,
        padding:20,

       
    },
    Start:{
        backgroundColor: '#CD1F4D',
        paddingVertical: 12,
        paddingHorizontal: 54,
        justifyContent: 'center',
        borderRadius: 50, 
        marginLeft:10
    },
    StartText:{
        fontFamily: "AnekDevanagari_400Regular",
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
    },
});