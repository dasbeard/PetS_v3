import { View } from 'react-native'
import React from 'react'

// Simple utility component to create space between other components

export default function Spacer ({ Size=1 } : {Size?:number}) {
  const space = Size * 4;
  
  return (
    <View style={{ marginTop: space}} />
  )
}
