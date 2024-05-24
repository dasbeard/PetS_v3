import { View, Text, TextInput } from 'react-native'
import React, { forwardRef } from 'react'

interface valueProps {
  value: string;
  setValue: (value: string) => void;
}

const ChildComponent = forwardRef<View, valueProps>(( {value, setValue}, ref) => {
  return (
    <View 
      ref={ref}
    >
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder='Text'
      />

      <Text>ChildComponent</Text>
    </View>
  )
})

export default ChildComponent