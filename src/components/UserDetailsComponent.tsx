import { Alert, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { View, Text } from './Themed';
import ValidationInput from './ValidationInput';
import Button from './Buttons/StyledButton';
import Avatar from './Avatar';
import { useUpdateUserContact, useUpdateUsersAvatar } from '@/api/userInfo';
import { supabase } from '@/util/supabase';

export default function UserDetailsComponent({UserData}:any) {
  const { mutate: updateProfile } = useUpdateUserContact();
  const { mutate: updateAvatar } = useUpdateUsersAvatar();

  const { control, handleSubmit, formState: {isDirty, isSubmitSuccessful}, reset, } = useForm({
    defaultValues:{
      firstName: UserData.first_name ,
      lastName: UserData.last_name ,
      emergencyContact: UserData.emergency_contact,
    }
  });
  
  const handleUserDetailsUpdate = (data: any) => {
    updateProfile({
      id: UserData.id,
      first_name: data.firstName,
      last_name: data.lastName,
      emergency_contact: data.emergencyContact,
    })
  }

  const handleUpdateAvatar = async (url: any) => {
    // check if previous image and remove from storage
    if(UserData.avatar_url){
      // delete original 
      const oldUrl = UserData.avatar_url
      const {error} = await supabase.storage.from('avatars').remove([oldUrl])      
      if(error){
        console.log('Error removing old avatar - id:', oldUrl, {error});
        Alert.alert(error.message)
      }
    }
    // update value in users profile
    updateAvatar({
      id: UserData.id,
      avatar_url: url
    })
  };


  useEffect(() => {
    if(isSubmitSuccessful){
      reset({
        firstName: UserData.first_name ,
        lastName: UserData.last_name ,
        emergencyContact: UserData.emergency_contact,
      })
    }
  },[UserData])

  return (
    <View style={styles.rootContainer}>
      {/* <Text>My Info</Text> */}
      <View style={ styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar
            size={110}
            url={UserData.avatar_url || ''}
            onUpload={(url:string) =>{
              handleUpdateAvatar(url)
            }}
          />
        </View>

        <View style={styles.nameInputs}>
          <Text style={styles.label}>First Name</Text>
          <ValidationInput
            name='firstName'
            placeholder='First Name'
            control={control}
          />
          
          <Text style={styles.label}>Last Name</Text>
          <ValidationInput
            name='lastName'
            placeholder='Last Name'
            control={control}
          />
        </View>
      </View>
      
      <View style={styles.emergencyContactContainer}>
        <Text style={styles.label}>Emergency Contact Information</Text>
        <ValidationInput
          name='emergencyContact'
          placeholder='Name and number of emergency contact'
          control={control}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          Text='Update My Info' 
          Disabled={!isDirty} 
          // Disabled={isLoading} 
          onPress={handleSubmit(handleUserDetailsUpdate)} 
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer:{
    // borderWidth: 1,
    // borderColor: 'red',
    flex: 1,
    minHeight: 270,
    // height: 280,
    maxHeight: 300,
  },
  container: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5
  },
  label:{
    marginTop: 7,
    marginBottom: 2,
  },
  avatarContainer:{
    flex: 1,
    // borderWidth: 1,
  },
  nameInputs:{
    flex: 2,
    // borderWidth: 1,
  },
  emergencyContactContainer:{
    flex: 1,
    // borderWidth: 1,
  },
  buttonContainer:{
    flex: .75,
    justifyContent: 'center',
  },


})