import { StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { View, Text } from './Themed';
import ValidationInput from './ValidationInput';
import Button from './Buttons/StyledButton';
import Avatar from './Avatar';
import { useUpdateUserContact } from '@/api/userInfo';

export default function UserDetailsComponent({UserData}:any) {
  const { mutate: updateProfile } = useUpdateUserContact();

  // const [ first, setFirst ] = useState<string>(UserData.first_name)
  // const [ last, setLast ] = useState<string>(UserData.last_name)
  // const [ emergency, setEmergency ] = useState<string>(UserData.emergency_contact)

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

  const updateAvatar = (url: any) => {

  }


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
              updateAvatar(url)
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