import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { View, Text } from './Themed'
import { Tables } from '@/database.types'
import ValidationInput from './ValidationInput'
import { useForm } from 'react-hook-form'
import Button from './Buttons/StyledButton'
import { useCreateHomeInfo, useUpdateHomeInfo } from '@/api/users/userInfo'

export default function HomeInfoComponent({userId, HomeInfo}: {userId: string, HomeInfo: Tables<'home_info'> | null}) {
  const { mutate: createHomeInfo } = useCreateHomeInfo();
  const { mutate: updateHomeInfo } = useUpdateHomeInfo();

  const { control, handleSubmit, formState:{ isDirty, isSubmitSuccessful}, reset } = useForm({
    defaultValues:{
      access_parking: HomeInfo?.access_parking,
      alarm: HomeInfo?.alarm,
      door_lockbox_code: HomeInfo?.door_lockbox_code,
      others_with_access: HomeInfo?.others_with_access,
      house_notes: HomeInfo?.house_notes,
      trails_walking_route: HomeInfo?.trails_walking_route,
      pet_supplies: HomeInfo?.pet_supplies,
      pet_carriers: HomeInfo?.pet_carriers,
      pet_waste: HomeInfo?.pet_waste,
      cleaning_supplies: HomeInfo?.cleaning_supplies,
      trash_recycling: HomeInfo?.trash_recycling,
      other_notes: HomeInfo?.other_notes,
    }
  })

  const handleUpdateHouseNotes = (data: any)=>{
    if(!HomeInfo || HomeInfo === null){
      // create new record
      createHomeInfo({userId, data})
    } else {
      // update record
      updateHomeInfo({userId, HomeInfoId: HomeInfo.id, updatedHomeInfoFields:{...data, updated_at: ((new Date()).toISOString()).toLocaleString()}})
    }
  } 


  useEffect(() => {
    if(isSubmitSuccessful){
      reset({
        access_parking: HomeInfo?.access_parking,
        alarm: HomeInfo?.alarm,
        door_lockbox_code: HomeInfo?.door_lockbox_code,
        others_with_access: HomeInfo?.others_with_access,
        house_notes: HomeInfo?.house_notes,
        trails_walking_route: HomeInfo?.trails_walking_route,
        pet_supplies: HomeInfo?.pet_supplies,
        pet_carriers: HomeInfo?.pet_carriers,
        pet_waste: HomeInfo?.pet_waste,
        cleaning_supplies: HomeInfo?.cleaning_supplies,
        trash_recycling: HomeInfo?.trash_recycling,
        other_notes: HomeInfo?.other_notes,
      })
    }
  },[HomeInfo])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.label}>Parking Notes</Text>
      <ValidationInput
        name='access_parking'
        placeholder=''
        control={control}
        MultiLine
        NumOfLines={2}
      />
      <Text style={styles.label}>Home Alarm Code</Text>
      <ValidationInput
        name='alarm'
        placeholder=''
        control={control}
      />
      <Text style={styles.label}>Door or Lockbox Code</Text>
      <ValidationInput
        name='door_lockbox_code'
        placeholder=''
        control={control}
      />
      <Text style={styles.label}>Others that have access to the house</Text>
      <ValidationInput
        name='others_with_access'
        placeholder=''
        control={control}
        MultiLine
      />
      <Text style={styles.label}>Is there a perfered walking route or trail?</Text>
      <ValidationInput
        name='trails_walking_route'
        placeholder=''
        control={control}
        MultiLine
        NumOfLines={2}
      />
      <Text style={styles.label}>House Notes</Text>
      <ValidationInput
        name='house_notes'
        placeholder=''
        control={control}
        MultiLine
        NumOfLines={2}
      />
      <Text style={styles.label}>Where are the pet supplies located? (i.e. dog leash, extra litter)</Text>
      <ValidationInput
        name='pet_supplies'
        placeholder=''
        control={control}
        MultiLine
        NumOfLines={2}
      />
      <Text style={styles.label}>Where are the pet carriers located?</Text>
      <ValidationInput
        name='pet_carriers'
        placeholder=''
        control={control}
        MultiLine
        NumOfLines={2}
      />
      <Text style={styles.label}>Where should we place the pet waste?</Text>
      <ValidationInput
        name='pet_waste'
        placeholder=''
        control={control}
        MultiLine
        NumOfLines={2}
      />
      <Text style={styles.label}>Where are the cleaning supplies if needed?</Text>
      <ValidationInput
        name='cleaning_supplies'
        placeholder=''
        control={control}
        MultiLine
        NumOfLines={2}
      />
      <Text style={styles.label}>Where are the Trash and Recycling bins located?</Text>
      <ValidationInput
        name='trash_recycling'
        placeholder=''
        control={control}
        MultiLine
        NumOfLines={2}
      />
      <Text style={styles.label}>Anything else we should be aware of?</Text>
      <ValidationInput
        name='other_notes'
        placeholder=''
        control={control}
        MultiLine
        NumOfLines={2}
      />

      <Button
        Text='Update My House Notes' 
        onPress={handleSubmit(handleUpdateHouseNotes)} 
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
})