import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Text, TextInput, Alert, TouchableOpacity } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Avatar } from '@rneui/themed'

import { useFonts, DynaPuff_400Regular,DynaPuff_500Medium, DynaPuff_600SemiBold,DynaPuff_700Bold} from "@expo-google-fonts/dynapuff";
import { AnekDevanagari_400Regular, AnekDevanagari_500Medium, AnekDevanagari_600SemiBold, AnekDevanagari_700Bold, } from "@expo-google-fonts/anek-devanagari";
import { SpecialGothicExpandedOne_400Regular } from "@expo-google-fonts/special-gothic-expanded-one";
import { SvgXml } from 'react-native-svg'
import AntDesign from '@expo/vector-icons/AntDesign';


export default function MessagesScreen() {
  const [messages, setMessages] = useState<{ id: number; username: string; avatar_url: string; post: string }[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState<string | null>(null)
  const [showInput, setShowInput] = useState(false)
  const [fontSize, setFontSize] = useState(20)
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [dislikes, setDislikes] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    fetchMessages()
  }, [])

  async function sendMessage() {
    if (!newMessage.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      Alert.alert('You must be signed in to send messages.');
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('username, avatar_url')
      .eq('id', user.id)
      .single();

    if (profileError) {
      Alert.alert('Error fetching user profile', profileError.message);
      return;
    }

    const { error } = await supabase.from('post').insert([
      {
        post: newMessage,
        username: profile.username,
        avatar_url: profile.avatar_url || '',
      },
    ]);

    if (error) {
      Alert.alert('Error sending message', error.message);
    } else {
      setNewMessage('');
      setShowInput(false);
      fetchMessages();
    }
  }

  async function fetchMessages() {
    setLoading(true)
    const { data, error } = await supabase
      .from('post')
      .select('id, username, avatar_url, post')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      Alert.alert('Error fetching messages', error.message)
    } else {
      setMessages(data || [])
      if (data && data.length > 0) {
        setAvatar(data[0].avatar_url)
      } else {
        setAvatar(null)
      }
    }
    setLoading(false)
  }

  const handleContentSizeChange = (event) => {
    const { height } = event.nativeEvent.contentSize;
    if (height > 100 && fontSize > 16) {
      setFontSize(prev => prev - 1)
    } else if (height < 80 && fontSize < 24) {
      setFontSize(prev => prev + 1)
    }
  }

  const handleLike = (id: number) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDislike = (id: number) => {
    setDislikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageItem}>
     
      <View style={styles.messageContent}>
        <Text style={styles.username}>{item.username} </Text>
        <Text style={styles.message}>{item.post}</Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.likeButton}>
          <AntDesign name="hearto" size={24} color="white" />
            <Text style={styles.likeCount}>{likes[item.id] || 0}</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BOX BOX Chat</Text>
      <View style={styles.messageList}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={fetchMessages}
        
      />
      </View >
      <TouchableOpacity style={styles.postButton} onPress={() => setShowInput(true)}>
        <AntDesign name="pluscircle" size={48}color={'#CD1F4D'} />
      </TouchableOpacity>

      {showInput && (
        <View style={styles.overlay}>
          <Text style={styles.title}>Ny Chat</Text>
          <Text style={styles.description}>Husk at vi taler pænt til hinanden, vi ønsker god stemning!</Text>
          <TextInput
            style={[styles.input, { fontSize }]}
            multiline
            value={newMessage}
            onChangeText={setNewMessage}
            onContentSizeChange={handleContentSizeChange}
            placeholder="Skriv her"
            placeholderTextColor="#888"
          />
          
            <TouchableOpacity style={styles.Button} onPress={sendMessage}>
              <Text style={styles.buttonText}>Post it!</Text>
            </TouchableOpacity>
            <Button title="Cancel" type="clear" onPress={() => setShowInput(false)} />
        
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
  title:{
  fontFamily:'SpecialGothicExpandedOne_400Regular',
  fontSize: 36,
  fontWeight: 'bold',
  color:'#112045',
  marginTop:50,
  },
  postButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 10,
    backgroundColor:'white',
    borderRadius: 48,
  },
  Button:{
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#CD1F4D',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontFamily:'AnekDevanagari_400Regular',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FCFAED',
    padding: 20,
    justifyContent: 'flex-start',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    minHeight: 230,
    color: '#fff',
    textAlignVertical: 'top',
    backgroundColor: '#D9D9D9',
    marginBottom: 16,
  },
  inputTitle: {
    fontSize: 24,
    fontFamily:'SpecialGothicExpandedOne_400Regular',
    fontWeight: 'bold',
    marginBottom: 16,
    color:'#112045',
  },
  description: {
    fontSize: 14,

    fontFamily:'AnekDevanagari_400Regular',
    marginBottom: 16,
    marginTop: 24,
    color:'#112045',
  },
  
  messageList: {
    backgroundColor:'#112045',
    color:'#fff',
  },
  message: {
    color: '#fff',
    fontSize: 16,
  },
  messageContent: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },

  messageItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 20,
    
  },
  username: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 24,
  },
  avatar: {
    objectFit: 'fill',
    borderRadius: 20,
    borderColor: '#000000',
    borderWidth: 2,
    marginRight: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
 
  likeCount: {
    marginLeft: 4,
    color: 'white',
  },
  
})
