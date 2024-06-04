import { StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View, Text } from '@/components/Themed'
import { Stack, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'

import BackHeader from '@/components/Headers/BackHeader'
import MultiSelectButton, { MultiSelectButtonProps } from '@/components/Buttons/MultiSelectButton'
import Button from '@/components/Buttons/StyledButton'
import Spacer from '@/components/Spacer'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import DateSelectionBottomSheet from '@/components/DateSelectionBottomSheet'
import { DateType } from 'react-native-ui-datepicker'

import dayjs from 'dayjs';
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useCreateOneEvent } from '@/api/events'
import { useAuth } from '@/providers/AuthProvider'
import PetSelectionBottomSheet, { PetDetailProps } from '@/components/BottomSheets/PetSelectionBottomSheet'
import { useGetUsersPetList } from '@/api/pets'
import { useSimpleUserData } from '@/api/users/userInfo'
import ConfirmEvent from './confirmEvent'
dayjs.extend(localizedFormat)

export interface NewEventProps {
  client_id: string,
  event_type: string,
  event_date: string,
  event_time: string[],
  location_id?: number,
  pet_ids: number[],
}

export default function CreateEvent() {
  const { eventType } = useLocalSearchParams();
  const { session } = useAuth();
  const service = (typeof eventType === 'string' ? eventType : eventType[0]) 
  const router = useRouter();
  const nav = useNavigation();

  const { data: UserData, error: UserDataError, isLoading: UserDataIsLoading } = useSimpleUserData(session!.user.id);
  const { data: PetsList, error: PetsListError, isLoading: PetsListIsLoading } = useGetUsersPetList(session!.user.id);
  const { mutate: createOneEvent } = useCreateOneEvent();

  const dateBottomSheetRef = useRef<BottomSheet>(null)
  const petsBottomSheetRef = useRef<BottomSheet>(null)

  const [ howOften, setHowOften ] = useState<string>('')
  const [ selectedDays, setSelectedDays ] = useState<string[]>([]);
  const [ startDate, setStartDate ] = useState<DateType | undefined>();
  const [ selectedTimes, setSelectedTimes ] = useState<string[]>([]);
  const [ selectedPets, setSelectedPets ] = useState<number[]>([])
  
  const [ showConfirm, setShowConfirm ] = useState<boolean>(false)
  const [ eventData, setEventData ] = useState<NewEventProps>();

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
  const handleSetData = useCallback( (data: any) => {
    // format is needed to convert from array to string
    setStartDate(dayjs(data).format())  
  },[])

  const handleCloseBottomSheet = useCallback( () => {
    dateBottomSheetRef.current?.close()
  },[])

  // console.log(UserData?.addresses?.id);
  

const confirmEvent = () => {
  
  const EventData: NewEventProps = {
      client_id: session?.user.id!,
      event_type: service,
      event_date: dayjs(startDate).format('MM/DD/YYYY'),
      event_time: selectedTimes,
      location_id: UserData?.addresses?.id,
      pet_ids: selectedPets
    } 
    
    setEventData(EventData)

  setShowConfirm(true)

}

const handleCancelEvent = () => {
  setShowConfirm(false)
}

  const handleSaveEvent = () => {
    createOneEvent({
      client_id: session?.user.id!,
      event_type: service,
      event_date: dayjs(startDate).format('MM/DD/YYYY'),
      event_time: selectedTimes,
      location_id: UserData?.addresses?.id,
      pet_ids: selectedPets
    },{
      async onSuccess(){
        // go to dashboard
        setShowConfirm(false)
        console.log('Event created - Go To Dashboard?');
        nav.canGoBack() // Not sure if this is working - ned to test more
        router.push('/(client)/dashboard')
      }
    })

  }



  const handlePetSelection = useCallback(( data: number[]) => {
    setSelectedPets(data)
  },[])


  useEffect(() => {
    setHowOften('')
    setSelectedDays([])
    setSelectedPets([])
    setStartDate(undefined)
    setSelectedTimes([])
  },[eventType])


  return (
    <>
      <Stack.Screen options={{ title: 'Schedule Appointment' }} />
      
      { showConfirm 
      ? <ConfirmEvent EventData={eventData as NewEventProps} OnCancel={handleCancelEvent} OnSave={handleSaveEvent} /> 
      :
      
      <>
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
            onPress={() => dateBottomSheetRef.current?.snapToIndex(0)} 
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
          Text='Pets' 
          onPress={() => petsBottomSheetRef.current?.expand()}
        />
        
        <Spacer Size={8}/>

        <Button 
          Text='Next' 
          Disabled={ 
            howOften === 'weekly' 
            ? (startDate && selectedTimes.length && selectedDays.length && selectedPets.length ? false : true )
            :( startDate && selectedTimes.length && selectedPets.length ? false : true)
          } 
          onPress={confirmEvent}
          />
        
        <Spacer Size={8}/>

      </View>
      
      </>
      }


      <DateSelectionBottomSheet
        ref={dateBottomSheetRef}
        Data={startDate}
        SetData={handleSetData}
        OnButtonPress={handleCloseBottomSheet}
        // SheetChanges={handleSheetChanges}
        HeaderText={howOften === 'weekly' ? 'Select a starting date' : 'Select the date of service'}
        Mode={'single'}
      />

      <PetSelectionBottomSheet 
        ref={petsBottomSheetRef}
        PetData={PetsList as PetDetailProps[]}
        OnSelect={handlePetSelection}
        SelectedValues={selectedPets}
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