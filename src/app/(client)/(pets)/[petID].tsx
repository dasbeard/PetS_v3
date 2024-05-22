import { ActivityIndicator, Alert, Platform, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview'
import { useColorScheme } from '@/components/useColorScheme'
import Colors from '@/constants/Colors'
import { View, Text } from '@/components/Themed'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import Avatar from '@/components/Avatar'
import { useAuth } from '@/providers/AuthProvider'
import { set, useForm } from 'react-hook-form';
import ValidationInput from '@/components/ValidationInput'
import { FontAwesome6 } from '@expo/vector-icons'
import Button from '@/components/Buttons/StyledButton'
import { useDeletePet, useGetPet, useInsertPet, useUpdatePetPhoto, useUpdatePetProfile } from '@/api/pets'
import { supabase } from '@/util/supabase'
import RadioButton, { ButtonDataProps } from '@/components/Buttons/RadioButton'
import CustomInput from '@/components/CustomInput'
import { Dropdown } from 'react-native-element-dropdown'
import dayjs, { Dayjs } from 'dayjs'
import Spacer from '@/components/Spacer'

export type Pet_Locaitons = "Indoor only" | "Outdoor only" | "Indoor and Outdoor"

export default function Pet() {
  const colorScheme = useColorScheme();
  const { petID: petIDString  } = useLocalSearchParams();
  const petID = parseFloat(typeof petIDString === 'string' ? petIDString : petIDString[0])
  const isUpdating = !!petID;
  const { session } = useAuth();
  const router = useRouter();

  // console.log({petIDString});
  // console.log({petID});
  // console.log({isUpdating});
  

  const TodayStamp = dayjs().startOf('day');
  const storageBucket = session?.user.id + '/pets';

  const [ isSpayed, setIsSpayed ] = useState<boolean | null>(null)
  const [ petType, setPetType ] = useState<string | null>(null)
  const [ petLocation, setPetLocation ] = useState<Pet_Locaitons | null>(null)
  const [ petGender, setPetGender ] = useState<string | null>(null)
  const [ petWeight, setPetWeight ] = useState<number | null>(null)
  const [ petPhotoUrl, setPetPhotoUrl ] = useState<string | null>(null)
  const [ allowSave, setAllowSave ] = useState(false)
  const [ petAgeInt, setPetAgeInt ] = useState<number | null>(null)
  const [ petAgeDate, setPetAgeDate ] = useState<string | null>(null)

  const { data: petProfile, error, isLoading, isFetching, isFetched } = useGetPet(petID);
  const { mutate: updatePhotoUrl } = useUpdatePetPhoto();
  const { mutate: updatePetProfile } = useUpdatePetProfile();
  const { mutate: insertPet } = useInsertPet();
  const { mutate: deletePet } = useDeletePet();
  // console.log('petProfile', {petProfile});


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

  const petGenderArray = useMemo(() => ([
    {
      label: 'Male',
      value: 'Male'
    },
    {
      label: 'Female',
      value: 'Female',
    },
  ]),[])

  const { control, handleSubmit, formState:{ isDirty, isSubmitSuccessful}, reset } = useForm({
    defaultValues: {
      name: petProfile?.name,
      // type: petProfile?.type,
      color: petProfile?.color,
      breed: petProfile?.breed,
      // age: petProfile?.age,
      gender: petProfile?.gender,
      weight: petProfile?.weight,
      // spayed_neutered: petProfile?.spayed_neutered,
      // pet_stays: petProfile?.pet_stays,
      dietary_needs: petProfile?.dietary_needs,
      feeding_food_brand: petProfile?.feeding_food_brand,
      personality: petProfile?.personality,
      medical_needs: petProfile?.medical_needs,
      other_needs: petProfile?.other_needs,
      notes: petProfile?.notes,
      routine: petProfile?.routine,
      special_needs: petProfile?.special_needs,
      photo_url: petProfile?.photo_url,
    }
  });
 
  const handleUpdateAvatar = async (url: string) => {
    setPetPhotoUrl(url)
    
    // Check if there is a record
    // if(!isUpdating){
    //   // no record yet - keep url in state
    //   console.log('No record yet - url:', url);
    //   setPetPhotoUrl(url)
    //   return
    // }
    
    // Check that updating the profile is allowed
    if(!isDirty){

    // check if previous image and remove from storage
    if(petProfile?.photo_url){
      // delete original 
      const oldUrl = petProfile?.photo_url
      const {error} = await supabase.storage.from('avatars').remove([oldUrl])      
      if(error){
        console.log('Error removing old pet photo - id:', oldUrl, {error});
        Alert.alert(error.message)
      }
    }

    // update value in pets profile
    updatePhotoUrl({
      pet_id: petID,
      photo_url: url,
      
    })
    }
  };

  const handleNavigateBack = () => {
    router.navigate('(client)/pets')
  }

  const handlePetTypeChange = ( petType: any ) => {
    setPetType(petType)
    isSpayed != null && petLocation ? setAllowSave(true) : setAllowSave(false)
  }

  const handlePetSpayedChange = ( spayed: any ) => {
    setIsSpayed(spayed)
    petType && petLocation ? setAllowSave(true) : setAllowSave(false)
  }

  const handlePetLocationChange = ( petLocation: Pet_Locaitons ) => {
    setPetLocation(petLocation)
    petType && isSpayed != null ? setAllowSave(true) : setAllowSave(false)
  }

  const handlePetGenderChange = ( petGender: string ) => {
    setPetGender(petGender)
    petType && isSpayed != null ? setAllowSave(true) : setAllowSave(false)
  }

  const handleSetAge = (ageInt: number) => {
    // get current date and set age to current date - ageInt in years
    setPetAgeInt(ageInt)
    const ageDate = TodayStamp.subtract(ageInt, 'year')
    setPetAgeDate(ageDate.toString())    
    petType && isSpayed != null ? setAllowSave(true) : setAllowSave(false)
  }

  const handleSetPetWeight = (weight: number) => {
    setPetWeight(weight)
    petType && isSpayed != null ? setAllowSave(true) : setAllowSave(false)
  }

  const calculatePetAge = (petDate: any) => {
    // Calculate and return age as int from date 
    const ageInt = TodayStamp.diff(petDate, 'years')
    return(ageInt)
  }



  const handleSavePetData = (data: any) => {

    if(isUpdating){
      console.log('updating');
      
      // Update pet profile
      updatePetProfile(
        {
          name: data.name,
          type: petType,
          color: data.color,
          breed: data.breed,
          age: petAgeDate,
          gender: petGender,
          weight: petWeight,
          spayed_neutered: isSpayed,
          pet_stays: petLocation,
          dietary_needs: data.dietary_needs,
          feeding_food_brand: data.feeding_food_brand,
          personality: data.personality,
          medical_needs: data.medical_needs,
          other_needs: data.other_needs,
          notes: data.notes,
          routine: data.routine,
          special_needs: data.special_needs,
          // photo_url: data.photo_url,
          photo_url: petPhotoUrl,
          pet_id: petID,
        },
        {
          onSuccess: () =>{
            // Reset all feilds ?

            // Reset AllowSave
            setAllowSave(false)

            // move back to pet list?
            // handleNavigateBack();
          }
        }
      )
    } else {
      console.log('Inserting new pet');

      // Create new record
      insertPet(
        {
          name: data.name,
          type: petType,
          color: data.color,
          breed: data.breed,
          age: petAgeDate,
          gender: petGender,
          weight: petWeight,
          spayed_neutered: isSpayed,
          pet_stays: petLocation,
          dietary_needs: data.dietary_needs,
          feeding_food_brand: data.feeding_food_brand,
          personality: data.personality,
          medical_needs: data.medical_needs,
          other_needs: data.other_needs,
          notes: data.notes,
          routine: data.routine,
          special_needs: data.special_needs,
          photo_url: petPhotoUrl,
          owner_id: session?.user.id
        },
        {
          onSuccess: () => {
            // Reset all feilds ?
            
            // Reset AllowSave
            setAllowSave(false)

            // move back to pet list
            handleNavigateBack();
          }
        }
      )
    }

  }

  const onDelete = () => {
    // RQ - delete pet
    deletePet({
      petID: petID,
      imagePath: petPhotoUrl || petProfile?.photo_url,
    },
    {
      onSuccess: () => {
        // reset screen
        // navigate back to pets
        router.navigate('/(client)/pets')
      }
    })

  }

  const confirmDelete = () => {
    Alert.alert("Confirm", `Are you sure you want to delete ${petProfile?.name}?`,[
      {
        text: 'Cancel'
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete
      }
    ])  }


  useEffect(() => {
    //  Set the default inputs for react-hook-form
    reset(petProfile) 

    // Set the values for the radio buttons and dropdown in state
    if(petProfile?.type){
      setPetType(petProfile?.type)
    }
    if(petProfile?.pet_stays){
      setPetLocation(petProfile?.pet_stays)
    }
    if(petProfile?.spayed_neutered != null){
      setIsSpayed(petProfile?.spayed_neutered)
    }
    if(petProfile?.gender){
      setPetGender(petProfile?.gender)
    }
    if(petProfile?.weight){
      setPetWeight(petProfile?.weight)
    }
    if(petProfile?.age){
      const age = calculatePetAge(petProfile.age)
      setPetAgeInt(age)
    }
    if(petProfile?.photo_url){
      setPetPhotoUrl(petProfile?.photo_url)
    }
    
  },[isFetched])
  
  if(isLoading || isFetching){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems:'center'}}>
        {/* <ActivityIndicator size='large' color={Colors.brand[500]} /> */}
      </View>
    )
  }

  if(error){
    return <Text>Fail to fetch pet details</Text>
  }
  


  return (
    <>
      <Stack.Screen options={{ title: petProfile?.name || 'Pet Name' }} />
      {/* <Text> Allow Save? { allowSave ? 'yes' : 'no' } :</Text>
      <Text> Is Dirty? { isDirty ? 'yes' : 'no' } :</Text>
      <Text> Spayed: { isSpayed ? 'Y' : 'N' } :</Text>
      <Text> PetType: { petType } :</Text>
      <Text> PetLocation: { petLocation } :</Text> 
      <Text>{petID}</Text>
      */}


      <View style={[headerStyles.container, {borderColor: colorScheme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(251, 251, 251, 0.1)'}]}>
       
        <Pressable style={headerStyles.leftContainer} onPress={handleNavigateBack}>
          {({ pressed }) => (
            <View style={[ headerStyles.left, { opacity: pressed ? 0.5 : 1}]}>
              <FontAwesome6 name="arrow-left" size={20} color={colorScheme=== 'light' ? Colors.light.text : Colors.dark.text}  />
              <Text style={headerStyles.backText}>Back</Text>
            </View>
            )}
        </Pressable>
        

        <View style={headerStyles.rightContainer}>
          <Button 
            Text={'Update'} 
            onPress={handleSubmit(handleSavePetData)}  
            Disabled={ !allowSave && !isDirty  }
          />
        </View>

      </View>

      <KeyboardAwareScrollView
        extraHeight={36}
        style={[styles.rootContainer, { backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background  }]}
      >
      
        <View style={styles.avatarname}>

          <View style={styles.avatarContainer}>
            <Avatar 
              size={150}
              url={ petProfile?.photo_url ||  null}
              onUpload={(url:string) =>{
                handleUpdateAvatar(url)
              }}
              StorageBucket={storageBucket}
            />
          </View>

          <View style={styles.container}>

            <Text style={styles.label}>Pets Name</Text>
            <ValidationInput
              name='name'
              placeholder='Frank'
              control={control}
              rules={{required:'Pet name is required'}}
            />

          
            {/* <Text style={styles.label}>Dog or Cat?</Text> */}
            <View style={styles.radioContainer}>
              { radioPetTypes.map((item) => {
                return(
                  <RadioButton 
                    ButtonData={item} 
                    key={item.key}
                    OnPress={ () => handlePetTypeChange(item.value)}
                    SelectedValue={petType || ''} 
                  />
                )
              })}
            </View>


          </View>
        </View>
      
        <View style={styles.smallRow}>

          <View style={styles.smallColumn}>

            <Text style={styles.label}>Spayed or Neutered?</Text>
            <View style={styles.radioContainer}>
              { radioSpayed.map((item) => {
                return (
                  <RadioButton 
                    ButtonData={item} 
                    key={item.key}
                    OnPress={ () => handlePetSpayedChange(item.value)}
                    SelectedValue={isSpayed}
                  />
                )
              })}
            </View>
          </View>

          <View style={styles.smallColumn}>
            <Text style={[styles.label, {marginBottom: 12}]}>They primarily stay</Text>
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



        <Text style={styles.label}>What color is your pet?</Text>
        <ValidationInput
          name='color'
          placeholder='Black with white spots'
          control={control}
        />
        
        <Text style={styles.label}>What breed is your pet?</Text>
        <ValidationInput
          name='breed'
          placeholder='Siamese'
          control={control}
        />
        




        <Text style={styles.label}>How old is your pet?</Text>
        <CustomInput
          Placeholder='5'
          InputMode='numeric'
          RightText='years old'
          Value={petAgeInt?.toString()}
          OnChange={(value: number) => handleSetAge(value)}
        />

        <Text style={styles.label}>What gender is your pet?</Text>
        <Dropdown
          placeholder='Gender...'
          data={petGenderArray}
          labelField='label'
          valueField='value'
          onChange={({value}) => handlePetGenderChange(value)}
          value={petGender}
          style={[styles.dropdown, { backgroundColor: colorScheme === 'light' ? Colors.brand[50] : Colors.brand[100] }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          maxHeight={130}
        />

        <Text style={styles.label}>About how much does your pet weigh?</Text>
        <CustomInput
          Placeholder='6'
          InputMode='numeric'
          RightText='lbs'
          Value={petWeight?.toString()}
          OnChange={(value: number) => handleSetPetWeight(value)}
        />
        
        <Text style={styles.label}>What brand of feed do they eat?</Text>
        <ValidationInput
          name='feeding_food_brand'
          placeholder='Purina'
          control={control}
        />

        <Text style={styles.label}>Do they have any dietary needs?</Text>
        <ValidationInput
          name='dietary_needs'
          placeholder='Wet food only'
          control={control}
          MultiLine
          NumOfLines={1.5}
        />
        
        <Text style={styles.label}>What kind of personality do they have?</Text>
        <ValidationInput
          name='personality'
          placeholder='Skittish at first, but very affectionate'
          control={control}
          MultiLine
          NumOfLines={1.5}
        />      

        <Text style={styles.label}>Do they have a specific routine?</Text>
        <ValidationInput
          name='routine'
          placeholder=''
          control={control}
          MultiLine
          NumOfLines={1.5}
        />

        <Text style={styles.label}>Do they have any medical concerns/needs?</Text>
        <ValidationInput
          name='medical_needs'
          placeholder=''
          control={control}
          MultiLine
          NumOfLines={1.5}
        />

        <Text style={styles.label}>Are there any other special needs we should be aware of?</Text>
        <ValidationInput
          name='special_needs'
          placeholder=''
          control={control}        
          MultiLine
          NumOfLines={1.5}
        />

        <Text style={styles.label}>Any other notes you would like to share with us?</Text>
        <ValidationInput
          name='notes'
          placeholder=''
          control={control}
          MultiLine
          NumOfLines={1.5}
        />


        <View style={styles.deleteButton}> 
          <Button 
            Text='Delete' 
            BorderColor={Colors.red[300]} 
            BackgroundColor={Colors.red[400]} 
            TextColor={Colors.light.text} 
            BoldText 
            onPress={confirmDelete}
          />
        </View>
      </KeyboardAwareScrollView>

    </>
  )
}


const styles = StyleSheet.create({
  rootContainer:{
    flex: 1,
    padding: 10,
  },
  avatarname: {
    flex: 1,
    flexDirection: 'row',
    gap: 8
  },
  avatarContainer:{
    flex: 1,
  },
  container:{
    flex: 1,
    flexDirection: 'column',
  },
  label:{
    marginTop: 7,
    marginBottom: 2,
  },
  radioContainer: {
    flexDirection: 'row',
  },
  dropdown:{
    color: Colors.brand[900],
    backgroundColor: Colors.brand[50], 
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
    flexDirection: 'row',
  },
  smallColumn:{
    flex: 1,
  },
  deleteButton:{
    marginTop: 10,
    marginBottom: 18,

  },
})

const headerStyles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    maxHeight: 55,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  leftContainer:{
    justifyContent: 'center',
  },
  left:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Platform.OS === 'web'? 20 : 9,
    gap: 10,
  },
  backText:{
    fontSize: 14,
    fontWeight: '300',
  },
  rightContainer:{
    alignItems: 'center',
    paddingRight: Platform.OS === 'web'? 20 : 9,
  },

})