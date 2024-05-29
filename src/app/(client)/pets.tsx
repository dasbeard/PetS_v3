import { NativeModules, StyleSheet, View as RNView } from 'react-native'
import { View, Text } from '@/components/Themed'
import PetCard from '@/components/PetCard'
import { useColorScheme } from '@/components/useColorScheme'
import Colors from '@/constants/Colors';
import { FlashList } from '@shopify/flash-list';
import Button from '@/components/Buttons/StyledButton';
import { useRouter } from 'expo-router';
import { useGetUsersPetList, useQuickInsertPet } from '@/api/pets';
import { useAuth } from '@/providers/AuthProvider';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import AddPet from '@/components/AddPet';
import AddPetBottomSheet from '@/components/AddPetBottomSheet';



export interface NewPetProps {
  petName?:string;
  petType?:string | null;
  petStays?:string | null;
  petPhotoUrl?:string | null;
  petIsSpayed?:boolean | null;
}

export default function ClientPets() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();
  const { data: PetList, error, isLoading } = useGetUsersPetList( session?.user.id! );
  const { mutate: InsertPet, data: returnedPetData } = useQuickInsertPet()

  const [ newPetData, setNewPetData ] = useState<NewPetProps | null>(null)
  const [ disableNewPetSave, setDisableNewPetSave ] = useState<boolean>(true)

  const handleSaveNewPet = () => {
    // console.log({newPetData});
    
    // Check if photo was added and parse
    let PetPhotoUrl = null;
    if(newPetData?.petPhotoUrl){
      const position = newPetData?.petPhotoUrl.lastIndexOf('/') + 1
      PetPhotoUrl = newPetData?.petPhotoUrl.substring(position)
    }

    // Save data
    InsertPet({
      name: newPetData?.petName,
      type: newPetData?.petType,
      spayed_neutered: newPetData?.petIsSpayed,
      pet_stays: newPetData?.petStays,
      photo_url: PetPhotoUrl,
      owner_id: session?.user.id
    },{
      onSuccess:(data) =>{
        // close bottomSheet
        bottomSheetRef.current?.close()
    
        // Navigate to pet screen
        router.navigate(`/(client)/(pets)/${data.id}`)
      }
    })
  }
 

  const handleSheetChanges = useCallback((index: number) => {
    // reset form
    if(index === -1 ){
      setNewPetData(null)
      setDisableNewPetSave(true)
    }
  }, []);


  return (
    <View style={styles.rootContainer}>

      <FlashList 
        data={PetList}
        renderItem={({ item }) => <PetCard PetData={item} /> }
        estimatedItemSize={145}
        // ListFooterComponent={ <AddPetButton /> }
        ListFooterComponent={ () => (
          <View style={{paddingHorizontal: 12}}>
            <Button Text='Add A Pet' onPress={() => bottomSheetRef.current?.snapToIndex(0)} />
          </View>
        ) }
      />

      <AddPetBottomSheet 
        ref={bottomSheetRef} 
        petData={newPetData}
        setPetData={setNewPetData}
        onSave={handleSaveNewPet}
        SheetChanges={handleSheetChanges}
        saveDisabled={disableNewPetSave}
        setSaveDisabled={setDisableNewPetSave}
        UserID={session?.user.id!}
      />

      {/* <BottomSheet
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

      </BottomSheet> */}

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