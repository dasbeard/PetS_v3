import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function EmployeePastVisitsScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Past'}} />

      <Text>EmployeePastVisitsScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})