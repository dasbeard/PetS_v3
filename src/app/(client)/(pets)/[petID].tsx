import { ActivityIndicator, StyleSheet } from 'react-native'
import { useColorScheme } from '@/components/useColorScheme'
import Colors from '@/constants/Colors'
import { View, Text } from '@/components/Themed'
import { useLocalSearchParams, useRouter } from 'expo-router'

import { useAuth } from '@/providers/AuthProvider'
import { useGetPet } from '@/api/pets'
import PetDetailsComponent from '@/components/PetDetailsComponent'
import LoadingComponent from '@/components/LoadingComponent'

export type Pet_Locaitons = "Indoor only" | "Outdoor only" | "Indoor and Outdoor"

export default function Pet() {
  const { petID: petIDString  } = useLocalSearchParams();
  const petID = parseFloat(typeof petIDString === 'string' ? petIDString : petIDString[0])
  const { session } = useAuth();
  
  const { data: petProfile, error, isFetching } = useGetPet(petID);

  if(error){
    return <Text>Error: Fail to fetch pet details</Text>
  }
  
  return (
    isFetching 
    ? <LoadingComponent />
    : <PetDetailsComponent petProfile={petProfile!} UserID={session?.user.id!} />
  )
}