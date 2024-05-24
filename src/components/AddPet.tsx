import { StyleSheet, View as RNView } from 'react-native'
import React, { Ref, forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import { View, Text } from './Themed'
import { BottomSheetTextInput} from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import Spacer from './Spacer';
import RadioButton, { ButtonDataProps } from './Buttons/RadioButton';
import { Pet_Locaitons } from '@/app/(client)/(pets)/[petID]';
import { Dropdown } from 'react-native-element-dropdown';
import { useColorScheme } from '@/components/useColorScheme'
import Avatar from './Avatar';
import { supabase } from '@/util/supabase';
import Button from './Buttons/StyledButton';
import { useQuickInsertPet } from '@/api/pets';
import { router } from 'expo-router';

type PetProps = {
  name?: string,
  type?: string,
  spayed_neutered?: boolean,
  pet_stays?: string,
  photo_url?: string,
}
interface AddPetProps {
  UserID: string;
  petName: string | null;
  setPetName: (petName:string) => void
}

// function AddPet({UserID, }:{UserID:string }) {
const AddPet = forwardRef<RNView, AddPetProps>(({UserID, petName, setPetName }, ref) => { 

  const colorScheme = useColorScheme();
  // const [ petName, setPetName ] = useState<string | null>(null)
  const [ petType, setPetType ] = useState<string | null>(null)
  const [ petLocation, setPetLocation ] = useState<string | null>(null)
  const [ petPhotoUrl, setPetPhotoUrl ] = useState<string | null>(null)
  const [ isSpayed, setIsSpayed ] = useState<boolean | null>(null)
  const [ disableSave, setDisableSave ] = useState<boolean>(true)
  const { mutate: InsertPet, data: newPetData, isSuccess } = useQuickInsertPet();

  const tempStorageBucket = UserID + '/temp';
  const storageBucket = UserID + '/pets';

  const radioPetTypes: ButtonDataProps[] = useMemo(() => ([
    {
      key: 'petType1',
      label: 'Cat',
      value:'cat',
    },
    {
      key: 'petType2',
      label:'Dog',
      value:'dog',
    },
  ]),[]);
    
  const radioSpayed: ButtonDataProps[] = useMemo(() => ([
    {
      key: 'spayed1',
      label: 'Yes',
      value: true,
    },
    {
      key: 'spayed2',
      label:'No',
      value: false,
    },
  ]),[]);

  const petLocationsArray = useMemo(() => ([
    {
      label: 'Indoor only',
      value: 'Indoor only'
    },
    {
      label: 'Outdoor only',
      value: 'Outdoor only',
    },
    {
      label:'Indoor and Outdoor',
      value: 'Indoor and Outdoor',
    }
]),[])

  const handlePetTypeSelected = useCallback( ( type: any ) => {
    setPetType(type)
    // Validate input fields
    if((isSpayed != null) && (petLocation != null) && (petName != null || '' )){
      setDisableSave(false)
    }
  },[])

  const handlePetSpayedSelection = useCallback( ( spayed: any ) => {
    setIsSpayed(spayed)
    // Validate input fields
    if((petLocation != null) && (petType != null) && (petName != null || '' )){
      setDisableSave(false)
    }
  },[])

  const handlePetLocationChange = useCallback( ( petLocation: Pet_Locaitons ) => {
    setPetLocation(petLocation)
    // Validate input fields
    if((isSpayed != null) && (petType != null) && (petName != null || '' )){
      setDisableSave(false)
    }
  },[])

  const handlePetNameChange = (name: string) => {

    setPetName(name)
    
    // if(name.trim() === ''){
    //   setDisableSave(true)
    //   return
    // }
    
    // // Validate input fields
    // if((isSpayed != null) && (petType != null) && (petLocation != null)){
    //   setDisableSave(false)
    // }
  }

  const handleSavePet = async ()=>{



    // move image to users pets folder

    // Parse the fielname from the the photoUrl
    // let newFileName;
    // if(petPhotoUrl){
    //   const position = petPhotoUrl.lastIndexOf("/");
    //   newFileName = storageBucket + '/' + petPhotoUrl.substring(position+1)
      
    //   const { data, error } = await supabase.storage
    //   .from(`avatars`)
    //   .move(`${petPhotoUrl}`, `${newFileName}`)
    // }  

    // // Call mutate addPet to save data
    // InsertPet({
    //   name: petName,
    //   type: petType,
    //   spayed_neutered: isSpayed,
    //   pet_stays: petLocation,
    //   photo_url: newFileName,
    //   owner_id: UserID
    // })

    // Close and reset bottomsheet and Navigate to pet handled in useEffect?
  }

  const resetInputs = () =>{
    setPetLocation(null)
    setPetPhotoUrl(null)
    setPetType(null)
    setIsSpayed(null)
    // setPetName(null)
  }

  useEffect(() => {
    if(isSuccess){
      console.log(newPetData.id);
      //  reset state
      resetInputs()
      // Close BottomSheet
      router.navigate(`/(client)/(pets)/${newPetData.id}`)
    }
  },[isSuccess])

  console.log('called');

// NOTE: When saving new pet - DELETE UserID/Temp folder in storage bucket

  
  return (
    <RNView 
      ref={ref}
      style={styles.container} 
    >

      <View style={styles.header}>
        <Text style={styles.headerText}>Add a Pet</Text>
      </View>

      <Spacer Size={4} />

      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <Avatar 
            size={110}
            url={petPhotoUrl}
            onUpload={(url:string) =>{
              setPetPhotoUrl(url)
            }}
            StorageBucket={tempStorageBucket}
            />
        </View>

  
        <View style={styles.smallColumn}>
          <View>
            <Text style={styles.label}>What is your pets name?</Text>
            <BottomSheetTextInput 
              onChangeText={(value) => handlePetNameChange(value)} 
              style={styles.textInputContainer}
              placeholder='Fido'
              value={petName || ''}
            />
          </View>

          <View style={styles.smallRow}>
            { radioPetTypes.map((item) =>{
              return (
                <RadioButton 
                  ButtonData={item}
                  key={item.key}
                  OnPress={() => handlePetTypeSelected(item.value)}
                  SelectedValue={petType}
                />
              )
            })}
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        
        <View style={styles.smallColumn}>
          <Text style={styles.label}>Spayed or Neutered?</Text>
          <View style={styles.radioInputContainer}>
            { radioSpayed.map((item) =>{
              return (
                <RadioButton 
                  ButtonData={item}
                  key={item.key}
                  OnPress={() => handlePetSpayedSelection(item.value)}
                  SelectedValue={isSpayed}
                />
              )
            })}
          </View>
        </View>

        <View style={styles.smallColumn}>
          <Text style={[styles.label, {marginBottom: 12} ]}>They primarily stay</Text>
          <Dropdown
            placeholder='My pet stays...'
            data={petLocationsArray}
            labelField='label'
            valueField='value'
            onChange={(item) => handlePetLocationChange(item.value as Pet_Locaitons)}
            value={petLocation}
            style={[styles.dropdown, { backgroundColor: colorScheme === 'light' ? Colors.brand[50] : Colors.brand[100] }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            maxHeight={180}
          />
        </View>

      </View>
      
      <View style={{ flex: 1}}>
        <Button Text='Add Pet' onPress={handleSavePet} Disabled={disableSave} />
      </View>
      
      <Spacer Size={4} />

    </RNView>
  )
}

)

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header:{
    flex: 0.4,
    borderBottomWidth: 1,
    borderColor: Colors.brand[200]
  },
  headerText:{
    textAlign: 'center',
    fontSize: 20,
  },
  topContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    flexGrow: 1,
    flexDirection: 'row',
    gap: 8,
  },
  bottomContainer:{
    // borderWidth: 1,
    // borderColor: 'green',
    flexGrow: .5,
    flexDirection: 'row',
  },
  avatarContainer:{
    // borderWidth: 1,
    flex: .75,
  },
  label:{
    marginTop: 7,
    marginBottom: 2,
  },
  radioInputContainer:{
    flexDirection: 'row',
  },
  dropdown:{
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    height: 42,
  },
  placeholderStyle:{
    fontSize: 15,
  },
  selectedTextStyle:{
    fontSize: 15,
  },
  smallRow:{
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  smallColumn:{
    flex: 1,
  },
  textInputContainer:{
    color: Colors.brand[900],
    backgroundColor: Colors.brand[50], 
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    // height: 38,
    minHeight: 40,
    // maxHeight: 38,
    justifyContent:'center',
    marginVertical: 4,
    // flex: 1,
  },
})


export default AddPet