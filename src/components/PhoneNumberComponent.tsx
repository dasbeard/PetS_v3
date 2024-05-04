import { StyleSheet } from 'react-native'
import { View, Text } from './Themed'
import { useForm } from 'react-hook-form'
import ValidationInput from './ValidationInput'

export default function PhoneNumberComponent({sourceId}:{sourceId?:string | number}) {
  
  const { control, handleSubmit, formState: { isDirty, isSubmitSuccessful}, reset } = useForm({
    defaultValues:{

    }
  })

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.label}>Type of number</Text>
      <ValidationInput 
        name='type'
        placeholder='Cell'
        control={control}
        rules={{
          required: 'Type of number is required'
        }}
      />

      <Text style={styles.label}>Phone Number</Text>
      <ValidationInput 
        name='number'
        placeholder='555-555-5555'
        control={control}
        rules={{
          required: 'Number is required',
          minLength:{
            value: 10,
            message: 'Must be at least 10 characters long'
          }
        }}
      />



    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer:{
    borderWidth: 1,
    borderColor: 'red',
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