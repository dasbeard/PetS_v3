import { View, StyleSheet } from 'react-native'
import React, { forwardRef, memo, useCallback, useMemo } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import { NewPetProps } from '@/app/(client)/pets';
import Spacer from './Spacer';
import Avatar from './Avatar';
import RadioButton, { ButtonDataProps } from './Buttons/RadioButton';
import { Dropdown } from 'react-native-element-dropdown';
import Button from './Buttons/StyledButton';
import { Pet_Locaitons } from '@/app/(client)/(pets)/[petID]';
import { Text } from './Themed';

interface IncomingProps {
  petData: NewPetProps | null;
  setPetData: ({}:NewPetProps) => void;
  onSave: () => void;
  SheetChanges: (index: number) => void;
  saveDisabled: boolean;
  setSaveDisabled: ( value: boolean) => void;
  UserID: string;
}
type Ref = BottomSheet;

const AddPetBottomSheet = forwardRef<Ref, IncomingProps>(({petData, setPetData, onSave, SheetChanges, saveDisabled, setSaveDisabled, UserID}, ref) => {
  
  const colorScheme = useColorScheme();
  const snapPoints = useMemo(() => ['65%'], [])
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
  const tempStorageBucket = UserID + '/temp';

  const radioPetTypes: ButtonDataProps[] = useMemo(() => ([
    {
      key: 'petType1',
      label: 'Cat',
      value:'cat',
    },
    {
      key: 'petType2',
      label:'Dog',
      value:'dog',
    },
  ]),[]);
    
  const radioSpayed: ButtonDataProps[] = useMemo(() => ([
    {
      key: 'spayed1',
      label: 'Yes',
      value: true,
    },
    {
      key: 'spayed2',
      label:' No',
      value: false,
    },
  ]),[]);

  const petLocationsArray = useMemo(() => ([
    {
      label: 'Indoor only',
      value: 'Indoor only'
    },
    {
      label: 'Outdoor only',
      value: 'Outdoor only',
    },
    {
      label:'Indoor and Outdoor',
      value: 'Indoor and Outdoor',
    }
]),[])


// add useCallback to these functions for performance??? -=might cause issues with disable button
const handlePetNameChange = (name: string) => {
  setPetData({...petData, petName:name})
  
  if(name.trim() === ''){
    setSaveDisabled(true)
    setPetData({...petData, petName: ''})
    return
  }
  
  // Validate input fields
  if((petData?.petIsSpayed != null) && (petData.petType != null) && (petData.petStays != null)){
    setSaveDisabled(false)
  }
}

const handlePetTypeSelected = ( type: any ) => {
  setPetData({...petData, petType:type})
  // Validate input fields
  if((petData?.petIsSpayed != null) && (petData.petName != '') && (petData.petStays != null)){
    setSaveDisabled(false)
  }
}

const handlePetSpayedSelection = ( spayed: any ) => {
  setPetData({...petData, petIsSpayed:spayed})
  // Validate input fields
  if((petData?.petType != null) && (petData.petName != '') && (petData.petStays != null)){
    setSaveDisabled(false)
  }
}

const handlePetLocationChange = ( stays: Pet_Locaitons ) => {
  setPetData({...petData, petStays:stays})
  // Validate input fields
  if((petData?.petType != null) && (petData.petName != '') && (petData.petIsSpayed != null)){
    setSaveDisabled(false)
  }
}
// 

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onChange={(index) => SheetChanges(index)}
      backgroundStyle={{
        backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.view, 
      }}
    >
      <BottomSheetView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add a Pet</Text>
      </View>

      <Spacer Size={4} />

      <View style={styles.topContainer}> 
        <View style={styles.leftContainer}>
          <Avatar 
            size={125}
            url={petData?.petPhotoUrl ? petData.petPhotoUrl : null}
            onUpload={(url:string) =>{
              setPetData({...petData, petPhotoUrl: url})
            }}
            StorageBucket={tempStorageBucket}
            />
        </View>

  
        <View style={styles.rightContainer}>
          <View>
            <Text style={styles.label}>What is your pets name?</Text>
            <BottomSheetTextInput 
              onChangeText={(value) => handlePetNameChange(value)} 
              style={[styles.textInputContainer, {backgroundColor: colorScheme === 'light' ? Colors.brand[50] : Colors.brand[100] }]}
              placeholder='Fido'
              value={petData?.petName}
            />
          </View>

          <View style={styles.smallRow}>
            { radioPetTypes.map((item) =>{
              return (
                <RadioButton 
                  ButtonData={item}
                  key={item.key}
                  OnPress={() => handlePetTypeSelected(item.value)}
                  SelectedValue={petData?.petType || null}
                />
              )
            })}
          </View>
        </View>

      </View>

      <View style={styles.bottomContainer}>
        
        <View style={styles.leftContainer}>
          <Text style={styles.label}>Spayed or Neutered?</Text>
          <View style={styles.radioInputContainer}>
            { radioSpayed.map((item) =>{
              return (
                <RadioButton 
                  ButtonData={item}
                  key={item.key}
                  OnPress={() => handlePetSpayedSelection(item.value)}
                  SelectedValue={petData?.petIsSpayed!}
                />
              )
            })}
          </View>
        </View>

        <View style={styles.rightContainer}>
          <Text style={[styles.label, {marginBottom: 12} ]}>They primarily stay</Text>
          <Dropdown
            placeholder='My pet stays...'
            data={petLocationsArray}
            labelField='label'
            valueField='value'
            onChange={(item) => handlePetLocationChange(item.value as Pet_Locaitons)}
            value={petData?.petStays}
            style={[styles.dropdown, { backgroundColor: colorScheme === 'light' ? Colors.brand[50] : Colors.brand[100] }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            // itemContainerStyle={styles.test}
            itemTextStyle={{fontSize: 14}}
            maxHeight={150}
          />
        </View>

      </View>
      
      <View style={{ flex: 1}}>
        <Button Text='Add Pet' onPress={onSave} Disabled={saveDisabled} />
      </View>

      </BottomSheetView>
    </BottomSheet>
  )
})



const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: 12,
  },
  header:{
    flex: 0.4,
    borderBottomWidth: 1,
    borderColor: Colors.brand[200]
  },
  headerText:{
    textAlign: 'center',
    fontSize: 20,
  },
  topContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    gap: 8,
  },

  leftContainer:{
    flex: 0.8,
  },
  label:{
    marginTop: 7,
    marginBottom: 2,
  },
  radioInputContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 1,
    marginRight: 20,
  },
  dropdown:{
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    height: 42,
  },
  placeholderStyle:{
    fontSize: 15,
  },
  selectedTextStyle:{
    fontSize: 15,
  },
  smallRow:{
    // flex: 1,
    flex: 0.85,
    flexDirection: 'row',
    // gap: 12,
    justifyContent: 'space-evenly',
    marginRight: 20,
  },
  bottomContainer:{
    flexGrow: .5,
    flexDirection: 'row',
    // borderWidth:1,
    // borderColor: 'green',
  },
  rightContainer:{
    flex: 1,
  },
  textInputContainer:{
    color: Colors.brand[900],
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    minHeight: 40,
    justifyContent:'center',
    marginVertical: 4,
  },
})


export default AddPetBottomSheet;
