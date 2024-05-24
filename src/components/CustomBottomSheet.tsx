import { StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useMemo } from 'react'
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import Button from './Buttons/StyledButton';

interface IncomingProps {
  title: string;
  setTitle: (title:string) => void;
  onClose: () => void;
  handleSheetChanges: (index: number) => void;
}
type Ref = BottomSheet;

export const CustomBottomSheet = forwardRef<Ref, IncomingProps>((props, ref) => {
  const snapPoints = useMemo(() => ['15%','65%'], [])

  console.log('Mounted');
  

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={(index) => props.handleSheetChanges(index)}
    >
      <View>
        <Text>Testing things</Text>
        <Text>TITLE: {props.title}</Text>
        <BottomSheetTextInput
          value={props.title}
          onChangeText={props.setTitle}
        />
      </View>


    <Button Text='Close Me' onPress={ () => props.onClose() } />




    </BottomSheet>
  )
})

const styles = StyleSheet.create({})