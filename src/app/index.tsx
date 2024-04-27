import { ActivityIndicator } from 'react-native'
import React from 'react'
import { useAuth } from '@/providers/AuthProvider'
import Colors from '@/constants/Colors';
import { Link, Redirect, useRouter } from 'expo-router';
import Button from '@/components/Buttons/StyledButton';
import { Text, View } from '@/components/Themed';

export default function RootIndex() {
  const { session, role, loading, logOutUser } = useAuth();
  const router = useRouter();

  const ownerNavigation = (userType:string) =>{
    router.navigate(`/(${userType})/dashboard`)
  }

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
          <Text style={{alignSelf: 'center', marginVertical: 25, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
            This Screen is only for debugging
          </Text>

          <Button Text='Client' onPress={() => ownerNavigation('client')} />
          <Button Text='Employee' onPress={() => ownerNavigation('employee')} />
          <Button Text='Manager' onPress={() => ownerNavigation('manager')} />
          <Button Text='Owner Dashboard' onPress={() => ownerNavigation('owner')} />

          <Button Text='Logout' onPress={() => logOutUser()} />

        </View>
      )
    }
  }

}
