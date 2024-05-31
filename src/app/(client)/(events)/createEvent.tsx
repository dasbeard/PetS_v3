import { StyleSheet } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { View, Text } from '@/components/Themed'
import { Stack, useLocalSearchParams } from 'expo-router'

import BackHeader from '@/components/Headers/BackHeader'
import MultiSelectButton, { MultiSelectButtonProps } from '@/components/Buttons/MultiSelectButton'
import Button from '@/components/Buttons/StyledButton'
import Spacer from '@/components/Spacer'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import DateSelectionBottomSheet from '@/components/DateSelectionBottomSheet'
import { DateType } from 'react-native-ui-datepicker'
import dayjs from 'dayjs';

import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat)

// import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview'

export default function CreateEvent() {
  const { eventType } = useLocalSearchParams();
  const service = (typeof eventType === 'string' ? eventType : eventType[0]) 

  const bottomSheetRef = useRef<BottomSheet>(null)

  const [ howOften, setHowOften ] = useState<string>('')
  const [ selectedDays, setSelectedDays ] = useState<string[]>([]);
  const [ selectedTimes, setSelectedTimes ] = useState<string[]>([]);
  const [ allowNext, setAllowNext ] = useState<boolean>(false)
  const [ startDate, setStartDate ] = useState<DateType | undefined>();
  

  // Button Props
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
      label: 'Morning',
      value:'morning'
    },
    {
      key:'todA',
      label: 'Afternoon',
      value:'afternoon'
    },
    {
      key:'todE',
      label: 'Evening',
      value:'evening'
    },
  ]

  // data selection functions
  const handleOftenSelection = (data: any) =>{
    setHowOften(data)
    
    //  check if allowing to move on
  }
  const handleTimeSelection = (data: any) =>{   
    setSelectedTimes(data)
    
    //  check if allowing to move on
  }
  const handleDaysSelection = (data: any) =>{
    setSelectedDays(data)
    
    //  check if allowing to move on
  }


  //  BottomSheet functions
  const handleSheetChanges = useCallback((index: number) => {
    // console.log(startDate);
    if(index === -1 ){
      // Closed
      // Set date data
    }  
  }, []);

  const handleSetData = (data: any) => {
    // format is needed to convert from array to string
    setStartDate(dayjs(data).format())    
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

          <Button 
            Text={ startDate ? dayjs(startDate).format('LL') : howOften === 'weekly' ? 'Select a start date' : 'Select a date'} 
            onPress={() => bottomSheetRef.current?.snapToIndex(0)} 
          />

        </View>

        <View style={styles.container}>
          <Text style={styles.label}>What time of day?</Text>
          <MultiSelectButton
            ButtonData={TimesOfDay}
            SelectedValues={ selectedTimes }
            OnSelect={( data ) => handleTimeSelection(data)}
          />
        </View>

        <Button Text='Next' Disabled={!allowNext} />
        
        <Spacer Size={8}/>

      </View>

      <DateSelectionBottomSheet
        ref={bottomSheetRef}
        Data={startDate}
        SetData={handleSetData}
        OnSave={() => bottomSheetRef.current?.close()}
        SheetChanges={handleSheetChanges}
        HeaderText={howOften === 'weekly' ? 'Select a starting date' : 'Select the date of service'}
        Mode={'single'}
      />

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