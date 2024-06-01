import { StyleSheet } from 'react-native'
import { View, Text } from '@/components/Themed'
import Button from '@/components/Buttons/StyledButton';
import MultiSelectButton, { MultiSelectButtonProps } from '@/components/Buttons/MultiSelectButton';
import { memo, useCallback, useMemo, useState } from 'react';
import Spacer from '@/components/Spacer';


export default function ClientDashboard() {
  const [ selectedValues, setSelectedValues ] = useState<string[]>([]);
  const [ selectedValues2, setSelectedValues2 ] = useState<string[]>([]);
  const [ count, setCount ] = useState(0)
  
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
    console.log('returned value: ', data);
    setSelectedValues(data)
  },[])


   return (
     <View style={styles.container}>

      <Text>Client Dashboard</Text>

      <Button Text='ReRender' onPress={() => setCount(count + 1)} />


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
      />

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