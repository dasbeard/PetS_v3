import { Platform, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import BackHeader from '@/components/Headers/BackHeader'
import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview'
import { useColorScheme } from '@/components/useColorScheme'
import Colors from '@/constants/Colors'
import { View, Text } from '@/components/Themed'
import PetDetailsComponent from '@/components/PetDetailsComponent'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Avatar from '@/components/Avatar'
import { useAuth } from '@/providers/AuthProvider'
import { useForm } from 'react-hook-form';
import ValidationInput from '@/components/ValidationInput'
import { FontAwesome6 } from '@expo/vector-icons'
import Button from '@/components/Buttons/StyledButton'



export default function Pet() {
  const colorScheme = useColorScheme();
  const { petID: petIDString  } = useLocalSearchParams();
  const petID = parseFloat(typeof petIDString === 'string' ? petIDString : petIDString[0])
  const isUpdating = !!petID;
  const { session } = useAuth();
  const router = useRouter();

  // Get pet data if not creating new

  const { control, handleSubmit, formState:{ isDirty, isSubmitSuccessful}, reset } = useForm({
    defaultValues:{
      name: '',
      type: '',
      color: '',
      breed: '',
      age: '',
      gender: '',
      weight: '',
      spayed_neutered: '',
      pet_stays: '',
      dietary_needs: '',
      feeding_food_brand: '',
      personality: '',
      medical_needs: '',
      other_needs: '',
      notes: '',
      routine: '',
      special_needs: '',
      photo_url: '',
    }
  });

 
  const handleUpdateAvatar = async (url: any) => {
    // Check if new pet or


    // check if previous image and remove from storage
    // if(UserData.avatar_url){
    //   // delete original 
    //   const oldUrl = UserData.avatar_url
    //   const {error} = await supabase.storage.from('avatars').remove([oldUrl])      
    //   if(error){
    //     console.log('Error removing old avatar - id:', oldUrl, {error});
    //     Alert.alert(error.message)
    //   }
    // }
    // update value in users profile
    // updateAvatar({
    //   id: UserData.id,
    //   avatar_url: url
    // })
  };

  const handleNavigateBack = () => {
    router.navigate('(client)/pets')
  }

  const handleSavePetData = (data: any) => {

  }

  return (
    <>
  {/* Custom back header - Drawer is causing issues using raouter.back() */}
      {/* <BackHeader BackTo='/(client)/pets'  /> */}
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
            Text={isUpdating ? 'Update' : 'Save'} 
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
            url={''}
            onUpload={(url:string) =>{
              handleUpdateAvatar(url)
            }}
            userId={session?.user.id || '' }
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

      <Text style={styles.label}>What color is your pet?</Text>
      <ValidationInput
        name='color'
        placeholder='Black with white spots'
        control={control}
        rules={{required:'Pet color is required'}}
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