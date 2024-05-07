import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet } from 'react-native'
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

export default function SignUpScreen() {
  const { createAccount } = useAuth();
  const [ loading, setLoading ] = useState<boolean>(false)
  const { control, handleSubmit, watch } = useForm()
  const router = useRouter();
  const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ 

  const pwd = watch('password')

  const handleBackToSignInNavigation = () => {
    router.back();
  }

  const handleCreateAccount = async (data:any) => {
    // console.log({data});
    setLoading(true)
    createAccount(data.email, data.password)
    setLoading(false)
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <LogoComponent styles={styles.image} />
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

        <Text style={styles.label}>Confirm Password</Text>
        <ValidationInput
          name='confirmPassword'
          placeholder='Confirm Password'
          control={control}
          AutoCorrect={false}
          AutoCapitalize='none'
          rules={{
            required: 'Confirm Password is required', 
            validate: (value:string) => value === pwd || 'Passwords do not match',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long'
            },
          }}
          secureTextEntry
        />
        
        <Spacer Size={3} />

        <Button Text='Create Account' onPress={handleSubmit(handleCreateAccount)} Disabled={loading} />
        
        <Spacer />

        <Pressable onPress={handleBackToSignInNavigation}>
          <Text style={styles.textButton}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
  imageContainer:{
    // marginTop: -10,
    maxHeight: '35%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  image:{
    // minHeight: '20%',
    height: '95%',
    maxHeight: '100%',
		aspectRatio: .9,
		resizeMode: 'contain'
  },
  container:{
    flex: 1,
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