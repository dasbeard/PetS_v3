import { StyleSheet } from 'react-native'
import { View, Text } from '@/components/Themed'
import Button from '@/components/Buttons/StyledButton';
import MultiSelectButton, { MultiSelectButtonProps } from '@/components/Buttons/MultiSelectButton';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Spacer from '@/components/Spacer';
import { useGetUsersPetList } from '@/api/pets';
import { useAuth } from '@/providers/AuthProvider';

import BottomSheet from '@gorhom/bottom-sheet';
import PetSelectionBottomSheet from '@/components/BottomSheets/PetSelectionBottomSheet';
// import PetSelection, { PetDetailProps } from '@/components/Buttons/PetSelection';

export default function ClientDashboard() {
  const [ selectedValues, setSelectedValues ] = useState<string[]>([]);
  const [ selectedValues2, setSelectedValues2 ] = useState<string[]>([]);
  const [ count, setCount ] = useState(0)
  
  

  const { session } = useAuth();
  const { data: PetList, error, isLoading } = useGetUsersPetList(session!.user.id);

  const [ petListState, setPetListState ] = useState<number[]>([]);


  const bottomSheetRef = useRef<BottomSheet>(null)

  console.log('App render', count);

  const sampleData:MultiSelectButtonProps[] = [
    {
      key: '000',
      label: 'S',
      value: 'sunday',
    },
    {
      key: '1111',
      label: 'M',
      value: 'monday',
      disabled: true,
    },
    {
      key: '222',
      label: 'T',
      value: 'tuesday',
    },
    {
      key: '333',
      label: 'W',
      value: 'wednesday',
    },
    {
      key: '444',
      label: 'T',
      value: 'thursday',
    },
    {
      key: '555',
      label: 'F',
      value: 'friday',
    },
    {
      key: '666',
      label: 'S',
      value: 'saturday',
    },
  ]

  const memoedSampleData:MultiSelectButtonProps[] = useMemo(() => ([
    {
      key: '000',
      label: 'S',
      value: 'sunday',
    },
    {
      key: '1111',
      label: 'M',
      value: 'monday',
      disabled: true,
    },
    {
      key: '222',
      label: 'T',
      value: 'tuesday',
    },
    {
      key: '333',
      label: 'W',
      value: 'wednesday',
    },
    {
      key: '444',
      label: 'T',
      value: 'thursday',
    },
    {
      key: '555',
      label: 'F',
      value: 'friday',
    },
    {
      key: '666',
      label: 'S',
      value: 'saturday',
    },
  ]),[])


  const handleSelection2 = useCallback((data: any) => {
    console.log('returned value: ', data);
    setSelectedValues2(data)
  },[])

  const handleSelection = useCallback((data: any) => {
    console.log('returned vvalue: ', data);
    setSelectedValues(data)
  },[])

  const handlePetSelection = useCallback((data: any) => {
    console.log('returned value: ', data);
    setPetListState(data)
  },[])



   return (
     <View style={styles.container}>

      <Text>Client Dashboard</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch', gap: 16}}>
      {/* <PetSelection 
        PetData={PetList as PetDetailProps[]}
        SelectedValues={petListState}  
        OnSelect={handlePetSelection}
      /> */}


      </View>


      <Button Text='Open Sheet' onPress={() => bottomSheetRef.current?.expand() } />

      <Button Text='ReRender' onPress={() => setCount(count + 1)} />

      <PetSelectionBottomSheet 
        ref={bottomSheetRef}
        PetData={PetList as any}
        OnSelect={handlePetSelection}
        SelectedValues={petListState}
      />


    {/* 
      <MultiSelectButton 
        ButtonData={memoedSampleData} 
        OnSelect={ handleSelection }
        SelectedValues={selectedValues} 
      />

    <Spacer Size={8} />

      <MultiSelectButton 
        ButtonData={memoedSampleData} 
        OnSelect={ handleSelection2 }
        SelectedValues={selectedValues2} 
      /> */}

     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: { 
     flex: 1,
     padding: 12,
     justifyContent: 'center',
     alignItems: 'center',
   },

 });