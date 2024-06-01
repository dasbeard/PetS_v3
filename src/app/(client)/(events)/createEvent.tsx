import { StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

export default function CreateEvent() {
  const { eventType } = useLocalSearchParams();
  const service = (typeof eventType === 'string' ? eventType : eventType[0]) 
  // const colorScheme = useColorScheme();

  const bottomSheetRef = useRef<BottomSheet>(null)

  const [ howOften, setHowOften ] = useState<string>('')
  const [ selectedDays, setSelectedDays ] = useState<string[]>([]);
  const [ startDate, setStartDate ] = useState<DateType | undefined>();
  const [ selectedTimes, setSelectedTimes ] = useState<string[]>([]);
  const [ allowNext, setAllowNext ] = useState<boolean>(false)
  

  // Button Props
  const DaysOfWeek:MultiSelectButtonProps[] = useMemo(() => ([
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
  ]),[])
  const OftenData: MultiSelectButtonProps[] = useMemo (() => ([
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
  ]),[])
  const TimesOfDay: MultiSelectButtonProps[] = useMemo (() => ( [
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
  ]),[])

  // console.log(' ----- component -----');
  // console.log(howOften);
  // console.log(selectedDays);
  // console.log(startDate);
  // console.log(selectedTimes);
  
  // console.log('All Next', allowNext);

  // console.log(' ***** component *****');

  // data selection functions
  const handleOftenSelection = useCallback((data: any) =>{
    setHowOften(data)
  },[])

  const handleTimeSelection = useCallback((data: any) =>{   
    setSelectedTimes(data)     
  },[])

  const handleDaysSelection = useCallback( (data: any) =>{
    setSelectedDays(data)
  },[])


  //  BottomSheet functions
  // const handleSheetChanges = useCallback((index: number) => {
  //   // console.log(startDate);
  //   if(index === -1 ){
  //     // Closed
  //     // Set date data
  //   }  
  // }, []);

  const handleSetData = useCallback( (data: any) => {
    // format is needed to convert from array to string
    setStartDate(dayjs(data).format())  
  },[])

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close()
  }


  useEffect(() => {
    setHowOften('')
    setSelectedDays([])
    setStartDate(undefined)
    setSelectedTimes([])
  },[eventType])


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
            OnSelect={ handleOftenSelection }
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
              OnSelect={ handleDaysSelection }
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
            OnSelect={ handleTimeSelection }
          />
        </View>

        {/* <Button Text='Next' Disabled={!allowNext} /> */}
        <Button 
          Text='Next' 
          Disabled={ 
            howOften === 'weekly' 
            ? (startDate && selectedTimes.length && selectedDays.length ? false : true )
            :( startDate && selectedTimes.length ? false : true)
          } />
        
        <Spacer Size={8}/>

      </View>

      <DateSelectionBottomSheet
        ref={bottomSheetRef}
        Data={startDate}
        SetData={handleSetData}
        OnButtonPress={handleCloseBottomSheet}
        // SheetChanges={handleSheetChanges}
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