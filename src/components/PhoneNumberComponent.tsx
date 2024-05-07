import { StyleSheet, Alert } from 'react-native'
import { View } from './Themed'
import { useForm } from 'react-hook-form'
import ValidationInput from './ValidationInput';
import Colors from '@/constants/Colors';
import IconButton from './Buttons/IconButton';
import { TablesInsert } from '@/database.types';
import { useEffect } from 'react';

export default function PhoneNumberComponent({
  PhoneNumber, 
  SaveFunction,
  RemoveFunction,
  ConfirmDelete = true,
}:{
  PhoneNumber?:TablesInsert<'phone_numbers'> | null, 
  SaveFunction?: any,
  RemoveFunction?: any,
  ConfirmDelete?: boolean
}) {
  
  const { control, handleSubmit, formState:{ isDirty, isValid, isSubmitSuccessful}, reset } = useForm({
    defaultValues:{
      phoneType: PhoneNumber?.type || '',
      phoneNum: PhoneNumber?.number,
    }
  });

  function onDelete(){
    RemoveFunction(PhoneNumber)
  }

  function confirmDelete(){
    if(!ConfirmDelete){
      RemoveFunction()
    } else {
      Alert.alert("Confirm", 'Are you sure you want to delete this product?',[
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: onDelete
        }
      ])
    }
  }

  function saveUpdateNumber(data: any){
    console.log('saved');
    if(PhoneNumber){
      SaveFunction(data, PhoneNumber.id)
    } else {
      SaveFunction(data)
    }
  }


  useEffect(() => {
    if(isSubmitSuccessful){
      reset({
        phoneType: PhoneNumber?.type || '',
        phoneNum: PhoneNumber?.number,
      })
    }
  },[PhoneNumber])

  return (
    <View style={styles.rootContainer}>
      <View style={styles.phoneType}>
        <ValidationInput 
          name='phoneType'
          control={control}
          placeholder='Cell'
          rules={{required:'Type of number is required'}}
        />
      </View>

      <View style={styles.phoneNumber}>
        <ValidationInput 
          name='phoneNum'
          control={control}
          placeholder='555 555 5555'
          InputMode='tel'
          rules={{
            required:'Number is required',
            minLength:{
              value: 10,
              message:'Min length 10 chars'
            }
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <IconButton
          Icon= 'save-outline'
          Disabled={ !ConfirmDelete ? !isValid : !isDirty && isValid }
          onPress={handleSubmit(saveUpdateNumber)}
        />

        <IconButton
          Icon='trash-outline'
          BackgroundColor={Colors.red[500]} 
          onPress={confirmDelete}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer:{
    marginBottom: 8,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10
  },
  label:{
    marginTop: 7,
    marginBottom: 2,
  },
  phoneType:{
    flex: 2.25,
  },
  phoneNumber:{
    flex: 2.5,
  },
  buttonContainer:{
    flexDirection: 'row',
    gap: 6,
    flex: 1.25,
  },

})