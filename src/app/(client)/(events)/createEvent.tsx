import { Pressable, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { View, Text } from '@/components/Themed'
import { Stack, useLocalSearchParams } from 'expo-router'

import BackHeader from '@/components/Headers/BackHeader'
import MultiSelectButton, { MultiSelectButtonProps } from '@/components/Buttons/MultiSelectButton'
import Button from '@/components/Buttons/StyledButton'
import Spacer from '@/components/Spacer'
// import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview'

export default function CreateEvent() {
  const { eventType } = useLocalSearchParams();
  const service = (typeof eventType === 'string' ? eventType : eventType[0]) 

  const [ howOften, setHowOften ] = useState<string>('')
  const [ selectedDays, setSelectedDays ] = useState<string[]>([]);
  const [ selectedTimes, setSelectedTimes ] = useState<string[]>([]);
  const [ selectedTime, setSelectedTime ] = useState<string>('');
  
  const DaysOfWeek:MultiSelectButtonProps[] =[
    {
      key: 'd0',
      label: 'S',
      value: 'sunday',
    },
    {
      key: 'd1',
      label: 'M',
      value: 'monday',
      // disabled: true,
    },
    {
      key: 'd2',
      label: 'T',
      value: 'tuesday',
    },
    {
      key: 'd3',
      label: 'W',
      value: 'wednesday',
    },
    {
      key: 'd4',
      label: 'T',
      value: 'thursday',
    },
    {
      key: 'd5',
      label: 'F',
      value: 'friday',
    },
    {
      key: 'd6',
      label: 'S',
      value: 'saturday',
    },
  ]
  const OftenData: MultiSelectButtonProps[] =[
    {
      key: 'o1',
      label: 'Once',
      value: 'once',
    },
    {
      key: 'o2',
      label: 'Weekly',
      value: 'weekly',
    },
  ]
  const TimesOfDay: MultiSelectButtonProps[] =[
    {
      key:'todM',
      label: 'Mornings',
      value:'morning'
    },
    {
      key:'todA',
      label: 'Afternoons',
      value:'afternoon'
    },
    {
      key:'todE',
      label: 'Evenings',
      value:'evening'
    },
  ]

  const handleOftenSelection = (data: any) =>{
    setHowOften(data)

    // // Limits 'Once' to only one time of day - may use later
    // if(data == 'once'){
    //   if(selectedTimes.length ){
    //     setSelectedTime(selectedTimes[selectedTimes.length -1])
    //     setSelectedTimes([])
    //   }
    // } else {
    //   if( selectedTime != '' ){
    //     setSelectedTimes([selectedTime])
    //     setSelectedTime('')
    //   }
    // }
  }
  const handleTimeSelection = (data: any) =>{   
    if(howOften === 'once'){
      setSelectedTime(data)
    } else {
      setSelectedTimes(data)
    }
  }
  const handleDaysSelection = (data: any) =>{
    setSelectedDays(data)
  }


  return (
    <>
      <Stack.Screen options={{ title: 'Schedule Appointment' }} />
      <BackHeader BackTo='/(client)/createAppointment' />

      <View style={styles.rootContainer}>
      
        <View style={styles.header}>
          <Text style={styles.headerText}>Schedule a {service}</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>How often did you want to schedule?</Text>
          <MultiSelectButton
            ButtonData={ OftenData }
            SelectedValues={howOften}
            OnSelect={ ( data ) => handleOftenSelection(data)}
            SingleSelection
          />
        </View>

        { howOften === 'weekly' 
          ?
          <View style={styles.container}>
            <Text style={styles.label}>What day(s) of the week?</Text>
            <MultiSelectButton
              ButtonData={DaysOfWeek}
              SelectedValues={selectedDays}
              OnSelect={( data) => handleDaysSelection(data)}
            />
          </View>
          : <View/>
        }

        <View style={styles.container}>
          { howOften === 'weekly' 
            ? (<Text style={styles.label}>When would you like to start?</Text>)
            : (<Text style={styles.label}>When would day are you looking for?</Text>)
          }

          <Button Text={howOften === 'weekly' ? 'Select a start date' : 'Select a date'} />
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>What time of day?</Text>
          
          {/* {howOften === 'once'
            ? <MultiSelectButton
                ButtonData={TimesOfDay}
                SingleSelection
                SelectedValues={ selectedTime }
                OnSelect={( data ) => handleTimeSelection(data)}
              />
            :  */}
            <MultiSelectButton
                ButtonData={TimesOfDay}
                SelectedValues={ selectedTimes }
                OnSelect={( data ) => handleTimeSelection(data)}
              />
          {/* } */}
          

        </View>

        <Button Text='Next' />
        
        <Spacer Size={8}/>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  rootContainer:{
    flex: 1,
    padding: 12,
  },
  container:{
    flex: 1,
    marginVertical: 12
  },
  header:{
    height: 35,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerText:{
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
  },
  label:{
    fontSize: 15,
    marginBottom: 8,
  }
})