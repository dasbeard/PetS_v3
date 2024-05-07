import { StyleSheet } from 'react-native'
import { View, Text } from '@/components/Themed'
import ValidationPhoneNumber from '@/components/ValidationPhoneNumber'
import { useForm } from 'react-hook-form'
import ValidationInput from '@/components/ValidationInput'
import Button from '@/components/Buttons/StyledButton'
import PhoneNumberComponent from '@/components/PhoneNumberComponent'
import { useEffect, useState } from 'react'

export default function ClientDashboard() {
  const [ phoneNums, setPhoneNums ] = useState<any>()
  const [ addNum, setAddNum ] = useState<boolean>(false)

  const { control, handleSubmit } = useForm({
    defaultValues:{
      test: '1234578'
    }
  })



  function handleClicked (data: any) {
    console.log({data});
  }

  const testNumObj = [
    {
      id: 1676,
      number: '1112357896',
      type: 'Main',
      user_id: 'ef4d7b96-853a-4e80-8b59-112c88db7bba'
    },
    {
      id: 196,
      number: '2224357896',
      type: 'Home',
      user_id: 'ef4d7b96-853a-4e80-8b59-112c88db7bba'
    },
    {
      id: 399,
      number: '3332357896',
      type: 'Cell',
      user_id: 'ef4d7b96-853a-4e80-8b59-112c88db7bba'
    }
  ]
  
  function addNumber(){
    setAddNum(true)
  }

  const removeUnSavedNumber = () => {
    console.log('remove clicked');
    setAddNum(false)
  }


  useEffect(() => {
    setPhoneNums(testNumObj)
  },[])
  
  return (
    <View style={{flex: 1, padding: 12}}>

      {phoneNums && phoneNums.map((item: any, idx: number, array: []) => {
          return <PhoneNumberComponent key={idx} PhoneNumber={item} />
      })}

      <View>
        {!addNum &&
          <Button 
            Text='Add Another Number'
            LeftIcon='add-outline'
            onPress={addNumber}
          />
        }
      </View>

      { addNum
         && 
        <PhoneNumberComponent RemoveFunction={removeUnSavedNumber} />
      }

    </View>
  )
}

const styles = StyleSheet.create({})