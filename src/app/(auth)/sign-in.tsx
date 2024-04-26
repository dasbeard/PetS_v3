import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { View, Text } from '@/components/Themed'
import { useAuth } from '@/providers/AuthProvider'
import ValidationInput from '@/components/ValidationInput';
import { useForm } from 'react-hook-form';
import Button from '@/components/Buttons/StyledButton';
import Spacer from '@/components/Spacer';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';


export default function SignInScreen() {
  const { signInWithEmail } = useAuth();
  // const [ email, setEmail ] = useState<string | null>(null)
  // const [ password, setPassword ] = useState<string | null>(null)
  // const [ confPassword, setConfPassword ] = useState<string | null>(null)
  const [ loading, setLoading ] = useState<boolean>(false)
  
  const { control, handleSubmit } = useForm()

  // const handleLogin = async ({email, password}:{email: string, password: string}) => {
  const handleLogin = async (data:any) => {
    // console.log({data});
    setLoading(true)
    await signInWithEmail(data.email, data.password)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <ValidationInput
        name='email'
        placeholder='name@gmail.com'
        control={control}
        // rules={{required: true}}        
        rules={{required: true, pattern: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ 
      }}
      />

      <Text>Password</Text>
      <ValidationInput
        name='password'
        placeholder='Password'
        control={control}
        rules={{required: true, min: 6}}
        secureTextEntry
      />
      
      <Button Text='Sign In' onPress={handleSubmit(handleLogin)} Disabled={loading} />

      <Spacer />

      <Link href={'/(auth)/sign-up'} asChild>
        <Text  style={styles.textButton}>Create an account</Text>
      </Link>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  textButton:{
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
    color: Colors.brandAlt[500] 
  },



})