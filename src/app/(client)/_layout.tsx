import React from 'react'
import { Redirect, Stack, Tabs } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider'

export default function ClientStack() {
  const { session } = useAuth()

  if(!session){
    return <Redirect href={'/'} />
  }

  return (
    <Tabs>
      <Tabs.Screen name='dashboard' />
      <Tabs.Screen name='profile' />
    </Tabs>
    
    
  )
}
