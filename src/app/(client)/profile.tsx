import { useGetProfile } from '@/api/userInfo';
import AddressComponent from '@/components/AddressComponent';
import Avatar from '@/components/Avatar';
import Button from '@/components/Buttons/StyledButton'
import { View, Text } from '@/components/Themed'
import UserDetailsComponent from '@/components/UserDetailsComponent';
import { useAuth } from '@/providers/AuthProvider'
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native'


export default function ClientProfile() {
  const { session } = useAuth();
  const { data: userProfile, error, isLoading } = useGetProfile(session!.user.id);
  // const [ avatarUrl, setAvatarUrl ] = useState('');
  
  if(isLoading){
    return <ActivityIndicator />
  }

  if(error){
    return <Text>Failed to fetch profile</Text>
  }

  return (
    <ScrollView  style={styles.rootConatiner}>
      <Text>Client Profile</Text>
      <UserDetailsComponent UserData={userProfile} />

      <AddressComponent />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  rootConatiner: {
    flex: 1,
    padding: 10,

  },
})