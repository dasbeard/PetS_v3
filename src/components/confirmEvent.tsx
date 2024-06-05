import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Button from '@/components/Buttons/StyledButton';
import { NewEventProps } from '@/app/(client)/(events)/createEvent';
import PetSelection from './Buttons/PetSelection';
import { useEffect, useState } from 'react';
import { PetDetailProps } from './BottomSheets/PetSelectionBottomSheet';
import LoadingComponent from './LoadingComponent';


interface ConfirmEventProps {
  EventData: NewEventProps;
  Saving:boolean;
  OnSave: () => void;
  OnCancel: () => void;

}

export default function ConfirmEvent({ EventData, OnSave, OnCancel, Saving }: ConfirmEventProps ) {
  const [ pets, setPets ] = useState<PetDetailProps[]>([])

  const filterPets = () => {
    let list:PetDetailProps[] =[];

    EventData.petData.map(( p ) => {
      if( EventData.pet_ids.includes(p.id) ){
        list.push(p)
      }
    })
    setPets(list)   
  }

  useEffect(() => {
    filterPets()
  },[EventData])


  return (
    <>
    {
      Saving 
      ? (
        <LoadingComponent />
      ):(
        <View style={styles.rootContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText} >Confirm {EventData.event_type}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>For: </Text>
            <Text style={styles.text}>{EventData.event_date}</Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>When: </Text>

            { EventData.event_time.map( (t, idx, arr) => {
              if(arr.length > 1 ){
                  if (idx != arr.length -1) {
                    return (
                      <View key={'value' + idx}  style={styles.inline}>
                        <Text style={styles.text}>{t}</Text> 
                        <Text>and</Text>
                      </View>
                    )
                  } else {
                    return <Text key={'value' + idx}  style={styles.text}>{t}</Text>
                  }
              } else {
                return <Text key={'value' + idx} style={styles.text}>{t}</Text>
              }
            })}
          </View>

          <View style={styles.petContainer}>
            <Text style={[styles.label, { marginBottom: 16}]}>{ EventData.pet_ids.length > 1 ? 'Pets:' : 'Pet:'}</Text>
            <FlatList
              data={pets}
              numColumns={2}
              contentContainerStyle={{ alignItems: 'center' }}
              renderItem={({ item }) => (
                <PetSelection
                  key={item.id}
                  PetData={item}
                  OnSelect={ () => null }
                  Disabled
                  />
                )}
            />
          </View>      

          <View style={styles.buttonContainer}>
            <Button Text='Confirm' onPress={OnSave} />
            <Button Text='Go Back' onPress={OnCancel} />
          </View>

        </View>
      )
    }
    </>
  )
}

const styles = StyleSheet.create({
  rootContainer:{
    flex: 1,
    padding: 12,
  },
  container:{
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'baseline',
    // justifyContent: 'center'
  },
  petContainer:{
    flex: 5,
  },
  buttonContainer:{
    flex: 3,
    alignContent: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 20
  },
  inline: {
    flexDirection: 'row',
    gap: 6,
    // justifyContent: 'center',
    alignItems: 'flex-end',
  },


  header:{
    height: 35,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerText:{
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
  },
  label:{
    fontSize: 16,
    marginBottom: 8,
  },
  text:{
    fontSize: 15,
    textTransform: 'capitalize'
  },
})