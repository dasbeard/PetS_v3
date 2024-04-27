import React from 'react'
import { Redirect, Slot, Stack, Tabs } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider'
import EmployeeHeader from '@/components/Headers/EmployeeHeader'

export default function EmployeeStack() {
  const { role } = useAuth()

  switch (role) {
    case '' || null:
      return <Redirect href={'/'}/>
    case 'client':
      return <Redirect href={'/'}/>
  }
  
  return (
    <>
      <EmployeeHeader />
      <Slot />
    </>
  )
}
