import Avatar from '@/components/Avatar';
import Button from '@/components/Buttons/StyledButton'
import { View, Text } from '@/components/Themed'
import { useAuth } from '@/providers/AuthProvider'
import { useState } from 'react';
import { StyleSheet } from 'react-native'


export default function ClientProfile() {
  const { logOutUser } = useAuth();
  const [ avatarUrl, setAvatarUrl ] = useState('');


  const updateProfile = () => {

  }
  
  return (
    <View>
      <Text>Client Profile</Text>
      <Avatar 
        size={100} 
        url={avatarUrl}
        onUpload={(url: string) =>{
          setAvatarUrl(url)
          updateProfile()
        }}
      />

      <Button Text='Logout' onPress={logOutUser} />
    </View>
  )
}

const styles = StyleSheet.create({})