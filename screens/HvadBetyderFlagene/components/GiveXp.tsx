import React, { useEffect } from "react";
import { supabase } from "../../../lib/supabase";

import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";

export default function GiveXp({ score }) {
  useEffect(() => {
    async function addXp() {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch current XP
      const { data, error } = await supabase
        .from("profiles")
        .select("xp")
        .eq("id", user.id)
        .single();

      if (error) return;

      // Add 200 XP per correct answer
      const newXp = (data?.xp || 0) + score * 200;

      // Update XP in database
      await supabase
        .from("profiles")
        .update({ xp: newXp })
        .eq("id", user.id);
    }

    addXp();
  }, [score]);

  return null; // No UI needed
}