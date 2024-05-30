import { StyleSheet } from 'react-native'
import { View, Text } from '@/components/Themed'
import Button from '@/components/Buttons/StyledButton';
import MultiSelectButton, { MultiSelectButtonProps } from '@/components/Buttons/MultiSelectButton';
import { useState } from 'react';


export default function ClientDashboard() {
  const [ selectedValues, setSelectedValues ] = useState<string[]>([]);
  
  const sampleData:MultiSelectButtonProps[] =[
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

  const handleSelection = ( data: any) => {
    console.log('Dashboard - clicked', data);
    setSelectedValues(data)
  }


   return (
     <View style={styles.container}>

      <Text>Client Dashboard</Text>

      <MultiSelectButton 
        ButtonData={sampleData} 
        OnSelect={ ( data ) =>  handleSelection(data) }
        SelectedValues={selectedValues} 
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