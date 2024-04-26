import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import { useAuth } from './providers/AuthProvider'
import Colors from '@/constants/Colors';
import { Link, Redirect } from 'expo-router';
import Button from '@/components/Buttons/StyledButton';

export default function RootIndex() {
  const { session, role, loading, logOutUser } = useAuth();

  if(loading){
    return <ActivityIndicator size={'large'} color={Colors.brand[500]} />
  }

  if(!session){
    return <Redirect href={'/(auth)/sign-in'} />
  }

  if(session && role){
    if(role === 'client'){
      return <Redirect href={'/(client)/dashboard'} />
    }
    if(role === 'employee'){
      return <Redirect href={'/(employee)/dashboard'} />
    }
    if(role === 'manager'){
      return <Redirect href={'/(manager)/dashboard'} />
    }
    if(role === 'owner'){

      return (
        <View style={{flex:1, justifyContent: 'center', padding: 10}}>
          <Link href={'/(client)/dashboard'} asChild>
            <Button Text='Client' />
          </Link>

          <Link href={'/(employee)/dashboard'} asChild>
            <Button Text='Employee' />
          </Link>

          <Link href={'/(manager)/dashboard'} asChild>
            <Button Text='Manager' />
          </Link>

          <Link href={'/(owner)/dashboard'} asChild>
            <Button Text='Owner Dashboard' />
          </Link>

        </View>
      )
    }
  }

}
