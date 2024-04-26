import Button from '@/components/Buttons/StyledButton'
import { View, Text } from '@/components/Themed'
import { useAuth } from '@/providers/AuthProvider'
import { StyleSheet } from 'react-native'


export default function ManagerProfile() {
  const { logOutUser } = useAuth();
  
  return (
    <View>
      <Text>Manager Profile</Text>
      <Button Text='Logout' onPress={logOutUser} />
    </View>
  )
}

const styles = StyleSheet.create({})