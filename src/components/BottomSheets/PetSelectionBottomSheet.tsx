import { Pressable, StyleSheet, View } from 'react-native'
import React, { forwardRef, memo, useCallback, useMemo } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import { useColorScheme } from '../useColorScheme';
import Colors from '@/constants/Colors';
import { Text } from '../Themed';
import { Feather } from '@expo/vector-icons';
import RemoteImage from '../RemoteImage';
import PetSelection from '../Buttons/PetSelection';

export interface PetDetailProps {
  id: number,
  name?: string,
  photo_url?: string,
  age?: string,
  type?: string,
  selected?: boolean,
}

interface PetSelectionProps {
  PetData: PetDetailProps[] | null;
  SelectedValues?: number[] ;
  OnSelect: (selected: number[]) => void;
}


type Ref = BottomSheet;

const PetSelectionBottomSheet = forwardRef<Ref, PetSelectionProps>(({PetData, SelectedValues, OnSelect}, ref ) => {
  console.log('Pet Selection Sheet Rendered');

  const colorScheme = useColorScheme();
  
  const snapPoints = useMemo(() => ['75%'], [])
  const renderBackdrop = useCallback((props: any) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  ),[])
  
  // const handleOnSelect = useCallback(( id: number) => {
  //   if(SelectedValues){
  //     if( SelectedValues.includes(id) ) {
  //       // remove ID from list
  //       OnSelect(SelectedValues.filter( i => i !== id))
  //     } else {
  //       // append to array
  //       OnSelect([...SelectedValues, id])
  //     }
  //   }
  // },[SelectedValues]) 
  const handleOnSelect = ( id: number) => {
    if(SelectedValues){
      if( SelectedValues.includes(id) ) {
        // remove ID from list
        OnSelect(SelectedValues.filter( i => i !== id))
      } else {
        // append to array
        OnSelect([...SelectedValues, id])
      }
    }
  }
  


  const PetSelectionCard = useCallback(({pet, selected, onSelection}: any) =>{
    return (
      <Pressable 
        key={pet.id} 
        style={styles.buttonContainer}
        onPress={ () => onSelection(pet.id) }
      >
        {({ pressed }) => (
          <>
            <Feather
              name={ selected ? 'check-square' : 'square'}
              // name={  'square'}
              size={28}
              color={ Colors.light.text }
              style={styles.selected}
            />
  
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <RemoteImage
                  path={pet.photo_url} 
                  style={styles.image}
                />
              </View>
    
              <Text style={styles.petName}>{pet.name}</Text>
            </View>
          </>
        )}
      </Pressable>
    )
  },[]);




  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: colorScheme === 'light' ? Colors.light.view : Colors.dark.view, 
      }}
    >
      <BottomSheetView style={styles.header}>
        <Text style={styles.headerText}>Select Pets for Appointment</Text>
      </BottomSheetView>

        <BottomSheetFlatList
          data={PetData}
          renderItem={({ item }) => (
            <PetSelection
              PetData={item}
              Selected={ SelectedValues?.includes(item.id) }
              OnSelect={handleOnSelect}
            />
          )}
          contentContainerStyle={{alignItems: 'center' }}
          numColumns={2}
        />


    </BottomSheet>
  )
})

const styles = StyleSheet.create({
  header:{
    height: 45,
    borderBottomWidth: 1,
    borderColor: Colors.brand[200],
  },
  headerText:{
    textAlign: 'center',
    fontSize: 20,
  },
  buttonContainer:{
    width: '50%'
  },
  selected:{
    top: '16%',
    left: '72%',
    zIndex:99,
    width: 28,
    backgroundColor: 'rgba(255,255,255, 0.45)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    top: -10,
    padding: 10,
  },
  imageContainer:{
    shadowOffset: { height: 0.5, width: 0.5},
    shadowOpacity: .65,
    shadowRadius: 2,
    borderRadius: 8,
  },
  image:{
    height: 150,
    aspectRatio: 1,
    borderRadius: 8,
    borderWidth: 0.5,
    objectFit: 'contain',
  },
  petName:{
    fontSize: 16,
    fontWeight: '500'
  },
})

export default memo(PetSelectionBottomSheet);