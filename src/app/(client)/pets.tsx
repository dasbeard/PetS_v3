import { StyleSheet } from 'react-native'
import { View, Text } from '@/components/Themed'
import PetCard from '@/components/PetCard'
import { useColorScheme } from '@/components/useColorScheme'
import Colors from '@/constants/Colors';
import { FlashList } from '@shopify/flash-list';
import Button from '@/components/Buttons/StyledButton';
import { useRouter } from 'expo-router';
import { Tables, TablesInsert } from '@/database.types';
import { useGetUsersPetList } from '@/api/pets';
import { useAuth } from '@/providers/AuthProvider';

// export const testData = [
//   {
//     age: 4,
//     id: 25489,
//     name: 'Frank',
//   },
//   {
//     age: 3,
//     id: 956475,
//     name: 'Fido',
//   },
// ]


export default function ClientPets() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();
  const router = useRouter();
  const { data: PetList, error, isLoading } = useGetUsersPetList( session?.user.id! );

// console.log({PetList});
// console.log(session?.user.id);


  const AddPetButton = () => {
    return(
      <View style={{paddingHorizontal: 12}}>
        <Button Text='Add A Pet' onPress={() => router.navigate(`/(client)/(pets)/${null}`) } />
      </View>
    )
  }


  return (
    <View style={styles.rootContainer}>
      <FlashList 
        data={PetList}
        renderItem={({ item }) => <PetCard PetData={item} /> }
        estimatedItemSize={145}
        ListFooterComponent={ <AddPetButton /> }
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer:{
    // borderWidth: 1,
    // borderColor: 'red',
    flex: 1,
    // backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background  ,
    // padding: 22,
  },
  // container: {
  //   flexDirection: 'row',
  //   gap: 8
  // },
  // label:{
  //   marginTop: 7,
  //   marginBottom: 2,
  // },
})