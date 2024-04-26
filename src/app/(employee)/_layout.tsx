import React from 'react'
import { Redirect, Stack, Tabs } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider'

export default function EmployeeStack() {
  const { role } = useAuth()

  // if( role === 'client' ){
  //   return <Redirect href={'/'} />
  // }

  switch (role) {
    case '' || null:
      return <Redirect href={'/'}/>
    case 'client':
      return <Redirect href={'/'}/>
  }
  
  return (
    <Tabs>
      <Tabs.Screen name='dashboard' />
      <Tabs.Screen name='profile' />
    </Tabs>
  )
}
