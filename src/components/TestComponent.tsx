import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native'
import { View, Text } from '@/components/Themed'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Button from '@/components/Buttons/StyledButton';


export default function TestComponent() {
  
  // ref
   const bottomSheetRef = useRef<BottomSheet>(null);

   // callbacks
   const handleSheetChanges = useCallback((index: number) => {
     console.log('handleSheetChanges', index);
   }, []);
 

   const Test = () => {
    // console.log(bottomSheetRef.current)
    
      bottomSheetRef.current?.snapToIndex(0)
   }

   // renders
   return (
     <View style={styles.container}>

      <Button onPress={Test} />


       <BottomSheet
         ref={bottomSheetRef}
         onChange={handleSheetChanges}
         index={-1}
         snapPoints={[200, 500]}

       >
         <BottomSheetView style={styles.contentContainer}>
           <Text>Awesome 🎉</Text>
         </BottomSheetView>
       </BottomSheet>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 24,
    //  backgroundColor: 'grey',
   },
   contentContainer: {
     flex: 1,
     alignItems: 'center',
   },
 });