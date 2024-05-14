import { StyleSheet } from 'react-native'
import React from 'react'
import BackHeader from '@/components/Headers/BackHeader'
import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview'
import { useColorScheme } from '@/components/useColorScheme'
import Colors from '@/constants/Colors'
import { View, Text } from '@/components/Themed'
import PetDetailsComponent from '@/components/PetDetailsComponent'


export default function Pet() {
  const colorScheme = useColorScheme();
  
  
 
  return (
    <>
  {/* Custom back header - Drawer is causing issues using raouter.back() */}
      <BackHeader BackTo='/(client)/pets' RightButtonText='Update' />

      <KeyboardAwareScrollView
        extraHeight={36}
        style={[styles.rootContainer, { backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background  }]}
      >

      <PetDetailsComponent />

      </KeyboardAwareScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  rootContainer:{
    flex: 1,
    padding: 10
  },
})