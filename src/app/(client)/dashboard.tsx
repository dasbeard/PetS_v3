import { StyleSheet } from 'react-native'
import { View, Text } from '@/components/Themed'
import ValidationPhoneNumber from '@/components/ValidationPhoneNumber'
import { useForm } from 'react-hook-form'
import ValidationInput from '@/components/ValidationInput'
import Button from '@/components/Buttons/StyledButton'

export default function ClientDashboard() {
  const { control, handleSubmit } = useForm({
    defaultValues:{
      // test: '1234578'
    }
  })

  function handleClicked (data: any) {
    console.log({data});
  }

  return (
    <View>
      <Text>ClientDashboard</Text>

      <ValidationPhoneNumber 
        name='test'
        control={control}
        placeholder='123 456 7890'
        
      />
      <ValidationInput 
        name='bbb'
        placeholder='Insert your phone number'
        control={control}
      />

      <Button onPress={handleSubmit(handleClicked)} />

    </View>
  )
}

const styles = StyleSheet.create({})