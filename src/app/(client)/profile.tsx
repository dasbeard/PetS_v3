import { useGetProfile } from '@/api/users/userInfo';
import AddressComponent from '@/components/AddressComponent';
import HomeInfoComponent from '@/components/HomeInfoComponent';
import PhoneSection from '@/components/PhoneSection';
import { View, Text } from '@/components/Themed'
import UserDetailsComponent from '@/components/UserDetailsComponent';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/providers/AuthProvider'
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KeyboardAwareScrollView } from '@pietile-native-kit/keyboard-aware-scrollview'


export default function ClientProfile() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();
  const { data: userProfile, error, isLoading } = useGetProfile(session!.user.id);
  const { bottom } = useSafeAreaInsets();

  // console.log('-- Profile: UserProfile --', userProfile);
  
  
  if(isLoading){
    return <ActivityIndicator />
  }

  if(error){
    return <Text>Failed to fetch profile</Text>
  }

  return (
    // <ScrollView  style={styles({colorScheme:colorScheme!}).rootConatiner}>
    <KeyboardAwareScrollView 
      extraHeight={36}
      style={styles({colorScheme:colorScheme!}).rootConatiner}
    >

      <UserDetailsComponent UserData={userProfile} />

      <PhoneSection userId={userProfile?.id || ''} PhoneNumberData={userProfile?.phone_numbers } />

      <AddressComponent sourceId={userProfile?.id || ''} AddressData={userProfile?.addresses || null}/>

      <HomeInfoComponent userId={userProfile?.id || ''} HomeInfo={userProfile?.home_info || null}/>

    {/* </ScrollView> */}
    </KeyboardAwareScrollView>
  )
}



const styles = ( {colorScheme}:{colorScheme?:string} ) =>  StyleSheet.create({
  rootConatiner: {
    flex: 1,
    padding: 10,
    backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background  
  },
})