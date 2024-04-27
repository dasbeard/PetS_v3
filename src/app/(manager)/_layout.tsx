import React from 'react'
import { Redirect, Slot, Tabs } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider'
import ManagerHeader from '@/components/Headers/ManagerHeader';

export default function ManagerStack() {
  const { role } = useAuth();

  switch (role) {
    case '' || null:
      return <Redirect href={'/'}/>
    case 'client' || 'employee':
      return <Redirect href={'/'}/>
  }

  return (
    <>
      <ManagerHeader />
      <Slot />
    </>
  )
}
