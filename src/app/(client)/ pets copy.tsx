import { NativeModules, StyleSheet, View as RNView } from 'react-native'
import { View, Text } from '@/components/Themed'
import PetCard from '@/components/PetCard'
import { useColorScheme } from '@/components/useColorScheme'
import Colors from '@/constants/Colors';
import { FlashList } from '@shopify/flash-list';
import Button from '@/components/Buttons/StyledButton';
import { useRouter } from 'expo-router';
import { useGetUsersPetList } from '@/api/pets';
import { useAuth } from '@/providers/AuthProvider';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import AddPet from '@/components/AddPet';


export default function ClientPets() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();
  const router = useRouter();
  const { data: PetList, error, isLoading } = useGetUsersPetList( session?.user.id! );

// console.log({PetList});
// console.log(session?.user.id);

  const handleAddPet = () => {
    // router.push(`/(client)/(pets)/${undefined}`)
    // console.log('calling');
    bottomSheetRef.current?.snapToIndex(0)
    
  }
 
  const AddPetButton = () => {
    return(
      <View style={{paddingHorizontal: 12}}>

        <Button Text='Add A Pet' onPress={handleAddPet} />
      </View>
    )
  }

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%'], []);
  const renderBackdrop = useCallback(
		(props:any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[]
	);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    console.log(petName);
    
  }, []);


  const AddPetRef = useRef<RNView>(null);
  // const petName1 = useRef('')
  const [ petName, setPetName ] = useState<string | null>(null)


  return (
    <View style={styles.rootContainer}>
      <FlashList 
        data={PetList}
        renderItem={({ item }) => <PetCard PetData={item} /> }
        estimatedItemSize={145}
        ListFooterComponent={ <AddPetButton /> }
      />
      

      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        enablePanDownToClose
        index={-1}
        snapPoints={snapPoints}
        backgroundStyle={{backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background}}
        backdropComponent={renderBackdrop}
        
      >
        <BottomSheetView style={styles.contentContainer}>
          
          <AddPet UserID={session?.user.id!} petName={petName} setPetName={setPetName}  ref={AddPetRef} />

        </BottomSheetView>

      </BottomSheet>

    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer:{
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 12,
    // alignItems: 'center',
    // backgroundColor: 'red',
  },

})