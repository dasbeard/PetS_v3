import { StyleSheet, View as RNView } from 'react-native'
import { View, Text } from '@/components/Themed'
import ChildComponent from '@/components/ChildComponent';
import { useRef, useState } from 'react';
import { CustomBottomSheet } from '@/components/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import Button from '@/components/Buttons/StyledButton';

export default function ClientDashboard() {
  
  const [value, setValue] = useState<string>('')
  const childRef = useRef<RNView>(null)

  // console.log({value});
  
  const bottomSheetRef = useRef<BottomSheet>(null)

  const handleOpen = () => {
    bottomSheetRef.current?.expand()
  }
  const handleClose = () => {
    bottomSheetRef.current?.close()
  }

  const handleSheetChanges = (index: number) => {
    console.log('handleSheetChanges', index);
    if( index == -1){
      setValue('')
    }    
  };

   return (
     <View style={styles.container}>

      <Text>Client Dashboard</Text>
      <Button Text='Open' onPress={ handleOpen} />
      <Button Text='Close' onPress={handleClose} />

      <Text>{value}</Text>
      {/* <ChildComponent value={value} setValue={setValue} ref={childRef} /> */}

      <CustomBottomSheet 
        ref={bottomSheetRef} 
        onClose={handleClose} 
        title={value} 
        setTitle={setValue} 
        handleSheetChanges={handleSheetChanges}
      />

     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: { 
     flex: 1,
     padding: 12,
     justifyContent: 'center',
   },

 });