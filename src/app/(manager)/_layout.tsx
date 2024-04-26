import React from 'react'
import { Redirect, Tabs } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider'

export default function ManagerStack() {
  const { role } = useAuth();

  switch (role) {
    case '' || null:
      return <Redirect href={'/'}/>
    case 'client' || 'employee':
      return <Redirect href={'/'}/>
  }

  return (
    <Tabs>
      <Tabs.Screen name='dashboard' />
      <Tabs.Screen name='profile' />
    </Tabs>
    
  )
}
