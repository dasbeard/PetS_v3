import { StyleSheet } from 'react-native'
import { View, Text } from '@/components/Themed'
import PetCard from '@/components/PetCard'
import { useColorScheme } from '@/components/useColorScheme'
import Colors from '@/constants/Colors';
import { FlashList } from '@shopify/flash-list';
import Button from '@/components/Buttons/StyledButton';
import { useRouter } from 'expo-router';
import { Tables, TablesInsert } from '@/database.types';

export const testData = [
  {
    age: 4,
    id: 25489,
    name: 'Frank',
  },
  {
    age: 3,
    id: 956475,
    name: 'Fido',
  },
]


export default function ClientPets() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const AddPetButton = () => {
    return(
      <View style={{paddingHorizontal: 12}}>
        <Button Text='Add A Pet' onPress={() => router.push('/(client)/addNewPet') } />
      </View>
    )
  }


  return (
    <View style={styles({colorScheme:colorScheme!}).rootContainer}>
      <FlashList 
        data={testData}
        renderItem={({ item }) => <PetCard PetData={item} /> }
        estimatedItemSize={145}
        ListFooterComponent={ <AddPetButton /> }
      />
      
    </View>
  )
}

const styles = ( {colorScheme}:{colorScheme?:string} ) =>  StyleSheet.create({
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