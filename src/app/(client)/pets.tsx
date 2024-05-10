import { StyleSheet } from 'react-native'
import { View, Text } from '@/components/Themed'
import PetCard from '@/components/PetCard'
import { useColorScheme } from '@/components/useColorScheme'
import Colors from '@/constants/Colors';
import { FlashList } from '@shopify/flash-list';

export const testData =[
  {
    id: 123,
    name: 'Name 1',
    age: 2,
    image: '',
  },
  {
    id: 234,
    name: 'Name 2',
    age: 3,
    image: '',
  },
]

export default function ClientPets() {
  const colorScheme = useColorScheme();



  return (
    <View style={styles({colorScheme:colorScheme!}).rootContainer}>
      <FlashList 
        data={testData}
        renderItem={({ item }) => <PetCard PetData={item} /> }
        estimatedItemSize={145}
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