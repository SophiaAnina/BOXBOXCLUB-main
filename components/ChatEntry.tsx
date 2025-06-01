import React, { useState, useEffect } from "react";
import PostStart from "./PostStart";
import MessagesScreen from "./Post";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChatEntry() {
  const [seen, setSeen] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if PostStart has been seen before
    AsyncStorage.getItem("postStartSeen").then((value) => {
      setSeen(value === "true");
    });
  }, []);

  const handleDone = async () => {
    await AsyncStorage.setItem("postStartSeen", "true");
    setSeen(true);
  };

  if (seen === null) return null; // or a loading spinner

  if (!seen) {
    return <PostStart onDone={handleDone} />;
  }
  return <MessagesScreen />;
}