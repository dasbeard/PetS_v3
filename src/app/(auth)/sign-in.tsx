import { Pressable, StyleSheet, Image, ScrollView } from 'react-native'
import { useState } from 'react'
import { View, Text } from '@/components/Themed'
import { useAuth } from '@/providers/AuthProvider'
import ValidationInput from '@/components/ValidationInput';
import { useForm } from 'react-hook-form';
import Button from '@/components/Buttons/StyledButton';
import Spacer from '@/components/Spacer';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import LogoComponent from '@/components/LogoComponent';

export default function SignInScreen() {
  const { signInWithEmail } = useAuth();
  const [ loading, setLoading ] = useState<boolean>(false)
  const { control, handleSubmit } = useForm()
  const router = useRouter();
  const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ 

  const handleCreateAccountNavigation = () => {
    router.push('/(auth)/sign-up')
  }

  const handleLogin = async (data:any) => {
    // console.log({data});
    setLoading(true)
    signInWithEmail(data.email, data.password)
    setLoading(false)
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <LogoComponent styles={styles.image}/>
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Email</Text>
        <ValidationInput
          name='email'
          placeholder='name@gmail.com'
          control={control}       
          InputMode='email' 
          AutoCorrect={false}
          AutoCapitalize='none'
          rules={{
            required: 'Email is required',
            pattern:{
              value: emailRegex,
              message: 'Please enter a valid email address'
            }
          }}
        />

        <Text style={styles.label}>Password</Text>
        <ValidationInput
          name='password'
          placeholder='Password'
          control={control}
          InputMode='text'
          AutoCorrect={false}
          AutoCapitalize='none'
          rules={{
            required: 'Password is required', 
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long'
            }
          }}
          secureTextEntry
        />
        
        <Spacer Size={3} />

        <Button Text='Sign In' onPress={handleSubmit(handleLogin)} Disabled={loading} />

        <Spacer />

        <Pressable onPress={handleCreateAccountNavigation}>
          <Text style={styles.textButton}>Create an account</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    // gap: 10,
    marginTop: 50,
  },
  imageContainer:{
    maxHeight: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  image:{
    height: '100%',
		aspectRatio: 1,
		resizeMode: 'contain'
  },
  container:{
    flex: 1,
    // borderWidth: 1,
  },
  label:{
    marginTop: 14,
    marginBottom: 2,
  },
  textButton:{
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
    color: Colors.brandAlt[500] 
  },

});