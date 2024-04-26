import Button from '@/components/Buttons/StyledButton'
import { View, Text } from '@/components/Themed'
import { useAuth } from '@/providers/AuthProvider'
import { StyleSheet } from 'react-native'


export default function OwnerProfile() {
  const { logOutUser } = useAuth();
  
  return (
    <View>
      <Text>Owner Profile</Text>
      <Button Text='Logout' onPress={logOutUser} />
    </View>
  )
}

const styles = StyleSheet.create({})