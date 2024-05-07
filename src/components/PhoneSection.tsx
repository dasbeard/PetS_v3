import { StyleSheet } from 'react-native'
import { View, Text } from '@/components/Themed'
import { Tables } from '@/database.types'
import {  useState } from 'react'
import PhoneNumberComponent from './PhoneNumberComponent';
import Button from './Buttons/StyledButton';
import { useCreateUserPhoneNumber, useDeleteUserPhoneNumber, useUpdateUserPhoneNumber } from '@/api/users/userInfo';


export default function PhoneSection({userId, vetId, PhoneNumberData}: {userId?: string, vetId?: string | number, PhoneNumberData?: any | null}) {
// export default function PhoneSection({userId, vetId, PhoneNumberData}: {userId?: string, vetId?: string | number, PhoneNumberData?: Tables<'phone_numbers'> | null}) {
  const [ showNewInput, setShowNewInput ] = useState<boolean>(false);
  const { mutate: createUserPhoneNumber } = useCreateUserPhoneNumber();
  const { mutate: updateUserPhoneNumber } = useUpdateUserPhoneNumber();
  const { mutate: deleteUserPhoneNumber } = useDeleteUserPhoneNumber();


  function ToggleAddNewNumber(){ 
    setShowNewInput(!showNewInput)
  }

  function handleDeleteNumber(data: any){
    console.log('** PhoneSection ** Handle Delete Number', {data});
    if(userId){
      // Delete Users phone umber
      deleteUserPhoneNumber({userId, phoneId: data.id})
    } else {
      // Delete Vet phone number
    }
    
  }

  function handleAddNumber(data: any, phoneId?: number){
    console.log('** PhoneSection ** Handle Add Number',{data});
    // Check if this is for a user or a vet
    if(userId){
      // User
      if(phoneId){
        // Update phone number data 
        updateUserPhoneNumber({userId, phoneId, updatedPhoneFields:{type: data.phoneType, number: data.phoneNum}})
      } else {
        // Create new phone number
        createUserPhoneNumber({userId, data:{type: data.phoneType, number: data.phoneNum}} )
        ToggleAddNewNumber()
      }
    } else {
      // Veterinarian
    }
 
  }


  return (
    <View style={styles.rootContainer}>
      <Text>Phone Numbers</Text>
      {
        PhoneNumberData 
          && 
        PhoneNumberData.map((item: any) => 
          (<PhoneNumberComponent 
            key={item.id} 
            PhoneNumber={item} 
            SaveFunction={handleAddNumber} 
            RemoveFunction={handleDeleteNumber}
          />)
        )
      }

      {
        !showNewInput 
          &&
        <Button
          Text= {PhoneNumberData ? 'Add Another Number' : 'Add Phone Number'}
          LeftIcon='add-outline'
          onPress={ToggleAddNewNumber}
          styles={styles.button}
        />
      }

      {
        showNewInput
          &&
        <PhoneNumberComponent 
          RemoveFunction={ToggleAddNewNumber} 
          SaveFunction={handleAddNumber} 
          ConfirmDelete={false}  
        />
      }

    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer:{
    // borderWidth: 1,
    // borderColor: 'red',
    flex: 1,
    marginBottom: 15,
  },
  container: {
    flexDirection: 'row',
    gap: 8
  },
  label:{
    marginTop: 7,
    marginBottom: 2,
  },
  button:{
    // height: 38,
    // paddingVertical: 8
  },

})