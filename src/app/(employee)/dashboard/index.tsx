import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'

export default function EmployeeDashboardHome() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Active'}} />

      <Text>EmployeeDashboardHome</Text>
    </View>
  )
}

const styles = StyleSheet.create({})