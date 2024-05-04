import { StyleSheet } from 'react-native'
import { View, Text } from './Themed';
import ValidationInput from './ValidationInput';
import { useForm } from 'react-hook-form';
import Button from './Buttons/StyledButton';
import { useCreateUsersAddress, useUpdateUsersAddress } from '@/api/users/userInfo';
import { useEffect } from 'react';

export default function AddressComponent({sourceId, AddressData}: {sourceId: string | null, AddressData:any}) {
  const { mutate: createAddress } = useCreateUsersAddress();
  const { mutate: updateAddress } = useUpdateUsersAddress();

  const { control, handleSubmit, formState: {isDirty, isSubmitSuccessful}, reset, } = useForm({
    defaultValues:{
      address: AddressData.address,
      city: AddressData.city,
      state: AddressData.state,
      zipcode: AddressData.zipcode,
      directions: AddressData.directions,
    }
  });
  
  const handleAddressUpdate = (data: any) => {   
    if(AddressData === null || !AddressData){
      // No address yet - create record with data
      createAddress({
        address: data.address,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        directions: data.directions,
        userId: sourceId
      });
    } else {
    // update address record
      updateAddress({
        userId: sourceId!,
        addressId: AddressData.id,
        updatedAddressFields:{
          address: data.address,
          city: data.city,
          state: data.state,
          zipcode: data.zipcode,
          directions: data.directions,
        }
      })
    }
  };


  useEffect(() => {
    if(isSubmitSuccessful){
      reset({
        address: AddressData.address,
        city: AddressData.city,
        state: AddressData.state,
        zipcode: AddressData.zipcode,
        directions: AddressData.directions,
      })
    }
  },[AddressData])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.label}>Address</Text>
      <ValidationInput
        name='address'
        placeholder='123 Main St Unit 3'
        control={control}
      />

      <View style={styles.container}>
        <View style={styles.cityContainer}>
          <Text style={styles.label}>City</Text>
          <ValidationInput
            name='city'
            placeholder='Los Angeles'
            control={control}
          />
        </View>

        <View style={styles.stateContainer}>
          <Text style={styles.label}>State</Text>
          <ValidationInput
            name='state'
            placeholder='CA'
            control={control}
          />
        </View>
        
        <View style={styles.zipcodeContainer}>
          <Text style={styles.label}>Zipcode</Text>
          <ValidationInput
            name='zipcode'
            placeholder='90001'
            control={control}
            // rules={}
          />
        </View>
      </View>
      
      <Text style={styles.label}>Directions</Text>
      <ValidationInput
        name='directions'
        placeholder='North East Corner of the street, park on side street'
        control={control}
      />

      <Button 
        Text='Update My Address Details' 
        onPress={handleSubmit(handleAddressUpdate)} 
        Disabled={!isDirty}
      />


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


  cityContainer:{
    flex: 4
  },
  stateContainer:{
    flex: 1
  },
  zipcodeContainer:{
    flex: 2
  },

})