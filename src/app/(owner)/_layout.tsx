import React from 'react'
import { Redirect, Stack, Tabs } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider'

export default function OwnerStack() {
  const { role } = useAuth();

  switch (role) {
    case '' || null:
      return <Redirect href={'/'}/>
    case 'client' || 'employee' || 'manager':
      return <Redirect href={'/'}/>
  }
  
  return (
    <Tabs>
      <Tabs.Screen name='dashboard' />
      <Tabs.Screen name='profile' />
    </Tabs>
  )
}
