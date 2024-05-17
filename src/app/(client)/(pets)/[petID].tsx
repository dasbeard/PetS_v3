import { ActivityIndicator, Alert, Platform, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackHeader from '@/components/Headers/BackHeader'
import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview'
import { useColorScheme } from '@/components/useColorScheme'
import Colors from '@/constants/Colors'
import { View, Text } from '@/components/Themed'
import PetDetailsComponent from '@/components/PetDetailsComponent'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import Avatar from '@/components/Avatar'
import { useAuth } from '@/providers/AuthProvider'
import { useForm } from 'react-hook-form';
import ValidationInput from '@/components/ValidationInput'
import { FontAwesome6 } from '@expo/vector-icons'
import Button from '@/components/Buttons/StyledButton'
import { useGetPet, useInsertPet, useUpdatePetPhoto, useUpdatePetProfile } from '@/api/pets'
import { supabase } from '@/util/supabase'
import { Tables, TablesInsert } from '@/database.types'



export default function Pet({ PetID, PetData }: {PetID?:number, PetData?: any}) {
  const colorScheme = useColorScheme();
  const { petID: petIDString  } = useLocalSearchParams();
  const petID = parseFloat(typeof petIDString === 'string' ? petIDString : petIDString[0])
  
  

  const { session } = useAuth();
  const router = useRouter();


  const [ petPhotoUrl, setPetPhotoUrl ] = useState<string | null>(null)
  // const [ petProfile, setPetProfile ] = useState<TablesInsert<'pets'> | null>(null)

  const  { data: petProfile, error, isLoading, isFetching, isFetched } = useGetPet(petID);
  const { mutate: updatePhotoUrl } = useUpdatePetPhoto();
  const { mutate: updatePetProfile } = useUpdatePetProfile();
  const { mutate: insertPet } = useInsertPet();
  
  const storageBucket = session?.user.id + '/pets';



  const { control, handleSubmit, formState:{ isDirty, isSubmitSuccessful}, reset } = useForm({
    defaultValues: {
      name: petProfile?.name,
      type: petProfile?.type,
      color: petProfile?.color,
      breed: petProfile?.breed,
      age: petProfile?.age,
      gender: petProfile?.gender,
      weight: petProfile?.weight,
      spayed_neutered: petProfile?.spayed_neutered,
      pet_stays: petProfile?.pet_stays,
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

  const handleSavePetData = (data: any) => {
    // if(isUpdating){
    //   // Update pet profile
    //   updatePetProfile(
    //     {
    //       name: data.name,
    //       type: data.type,
    //       color: data.color,
    //       breed: data.breed,
    //       age: data.age,
    //       gender: data.gender,
    //       weight: data.weight,
    //       spayed_neutered: data.spayed_neutered,
    //       pet_stays: data.pet_stays,
    //       dietary_needs: data.dietary_needs,
    //       feeding_food_brand: data.feeding_food_brand,
    //       personality: data.personality,
    //       medical_needs: data.medical_needs,
    //       other_needs: data.other_needs,
    //       notes: data.notes,
    //       routine: data.routine,
    //       special_needs: data.special_needs,
    //       photo_url: data.photo_url,
    //       pet_id: petID,
    //     },
    //     {
    //       onSuccess: () =>{
    //         // Reset all feilds ?

    //         // move back to pet list
    //         handleNavigateBack();
    //       }
    //     }
    //   )
    // } else {

      // Create new record
      insertPet(
        {
          name: data.name,
          type: data.type,
          // spayed_neutered: data.spayed_neutered,
          spayed_neutered: true,
          pet_stays: data.pet_stays,
          
          // color: data.color,
          // breed: data.breed,
          // age: data.age,
          // gender: data.gender,
          // weight: data.weight,
          // dietary_needs: data.dietary_needs,
          // feeding_food_brand: data.feeding_food_brand,
          // personality: data.personality,
          // medical_needs: data.medical_needs,
          // other_needs: data.other_needs,
          // notes: data.notes,
          // routine: data.routine,
          // special_needs: data.special_needs,
          photo_url: petPhotoUrl,
          owner_id: session?.user.id
        },
        {
          onSuccess: () => {
            // Reset all feilds ?

            // move back to pet list
            handleNavigateBack();
          }
        }
      )
    // }


  }


  // useEffect(() => {
  //   // const setData = async () => {
  //   //   if(getPetProfile){

  //   //     setPetProfile({
  //   //       age: getPetProfile?.age ,
  //   //       name: getPetProfile?.name,
  //   //       type: getPetProfile?.type,
  //   //       color: getPetProfile?.color,
  //   //       breed: getPetProfile?.breed,
  //   //       gender: getPetProfile?.gender,
  //   //       weight: getPetProfile?.weight,
  //   //       spayed_neutered: getPetProfile?.spayed_neutered,
  //   //       pet_stays: getPetProfile?.pet_stays,
  //   //       dietary_needs: getPetProfile?.dietary_needs,
  //   //       feeding_food_brand: getPetProfile?.feeding_food_brand,
  //   //       personality: getPetProfile?.personality,
  //   //       medical_needs: getPetProfile?.medical_needs,
  //   //       other_needs: getPetProfile?.other_needs,
  //   //       notes: getPetProfile?.notes,
  //   //       routine: getPetProfile?.routine,
  //   //       special_needs: getPetProfile?.special_needs,
  //   //       photo_url: getPetProfile?.photo_url,
  //   //     })
  //   //   }
  //   // }

  //   // console.log({getPetProfile});
    
  //   // setData()


  // },[petProfile])


useEffect(() => {
  reset(petProfile) 
},[isFetched])



  if(isLoading || isFetching){
    return <ActivityIndicator />
  }

  if(error){
    return <Text>Fail to fetch products</Text>
  }
  

  return (
    <>
      <Stack.Screen options={{ title: 'petName' }} />

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
            Disabled={ !isDirty }
          />
        </View>

      </View>


      <Text>{petID}</Text>

      <KeyboardAwareScrollView
        extraHeight={36}
        style={[styles.rootContainer, { backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background  }]}
      >
      
      <View style={styles.avatarname}>

        <View style={styles.avatarContainer}>
          <Avatar 
            size={150}
            url={petPhotoUrl}
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

        
          <Text style={styles.label}>Dog or Cat?</Text>
          <ValidationInput
            name='type'
            placeholder='Cat'
            control={control}
            rules={{required:'Pet type is required'}}
          />
        </View>
      </View>
      
      <Text style={styles.label}>Are they spayed/neutered?</Text>
      <ValidationInput
        name='spayed_neutered'
        placeholder='Yes'
        control={control}
        rules={{required:'Spayed or Neutered is required'}}
      />
      
      <Text style={styles.label}>Where does your pet stay primarily?</Text>
      <ValidationInput
        name='pet_stays'
        placeholder='Indoor only'
        control={control}
        rules={{required:'Pet local is required'}}
      />

      <Text style={styles.label}>What color is your pet?</Text>
      <ValidationInput
        name='color'
        placeholder='Black with white spots'
        control={control}
        // rules={{required:'Pet color is required'}}
      />
      
      <Text style={styles.label}>What breed is your pet?</Text>
      <ValidationInput
        name='breed'
        placeholder='Siamese'
        control={control}
        // rules={{required:'Pet color is required'}}
      />
      
      <Text style={styles.label}>How old is your pet?</Text>
      <ValidationInput
        name='age'
        placeholder='6'
        control={control}
        // rules={{required:'Pet color is required'}}
      />
      
      <Text style={styles.label}>What gender is your pet?</Text>
      <ValidationInput
        name='gender'
        placeholder='Male'
        control={control}
        // rules={{required:'Pet color is required'}}
      />
      
      <Text style={styles.label}>About how much does your pet weigh?</Text>
      <ValidationInput
        name='weight'
        placeholder='8 lbs'
        control={control}
        // rules={{required:'Pet color is required'}}
      />
      
      <Text style={styles.label}>Do they have any dietary needs?</Text>
      <ValidationInput
        name='dietary_needs'
        placeholder='Wet food only'
        control={control}
        // rules={{required:'Pet local is required'}}
      />
      
      <Text style={styles.label}>What brand of feed do they eat?</Text>
      <ValidationInput
        name='feeding_food_brand'
        placeholder=''
        control={control}
        // rules={{required:'Pet local is required'}}
      />
      
      <Text style={styles.label}>What kind of personality do they have?</Text>
      <ValidationInput
        name='personality'
        placeholder='Skittish at first, but very affectionate'
        control={control}
        // rules={{required:'Pet local is required'}}
      />      

      <Text style={styles.label}>Do they have a specific routine?</Text>
      <ValidationInput
        name='routine'
        placeholder=''
        control={control}
        // rules={{required:'Pet local is required'}}
      />

      <Text style={styles.label}>Do they have any medical concerns/needs?</Text>
      <ValidationInput
        name='medical_needs'
        placeholder=''
        control={control}
        // rules={{required:'Pet local is required'}}
      />

      <Text style={styles.label}>Are there any other special needs we should be aware of?</Text>
      <ValidationInput
        name='special_needs'
        placeholder=''
        control={control}
        // rules={{required:'Pet local is required'}}
      />

      <Text style={styles.label}>Any other notes you would like to share with us?</Text>
      <ValidationInput
        name='notes'
        placeholder=''
        control={control}
        // rules={{required:'Pet local is required'}}
      />

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