import { Pressable, StyleSheet, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import RemoteImage from '../RemoteImage'
import { Text } from '../Themed'
import { Feather } from '@expo/vector-icons'
import { useColorScheme } from '../useColorScheme'
import Colors from '@/constants/Colors'
import { InteractiveStyles } from '@/constants/Styles'
import { PetDetailProps } from '../BottomSheets/PetSelection'

interface PetSelectionProps {
  PetData: PetDetailProps;
  Selected?: boolean ;
  OnSelect: (selected: number) => void;
}

function PetSelection({PetData, Selected, OnSelect}: PetSelectionProps  ) {
  const colorScheme = useColorScheme();

  const handleSelection = () => {
    OnSelect(PetData.id)
  }

  return (
    <Pressable 
      key={PetData.id} 
      style={styles.buttonContainer}
      onPress={ handleSelection }
    >
      {({ pressed }) => (
        <>
          <Feather
            name={ Selected ? 'check-square' : 'square'}
            size={28}
            color={ Colors.light.text }
            style={styles.selected}
          />

          <View style={styles.container}>
            <View 
              style={[
                styles.imageContainer,
                {shadowColor: colorScheme === 'light' ? Colors.light.shadow : Colors.dark.shadow},
                pressed || Selected ? {
                  opacity: .5,
                  elevation: 0.4,
                  shadowOffset: { height: 0.75, width: 0.75},
                  shadowOpacity: .25,
                  shadowRadius: 1,
                } : {
                  opacity: 1,
                  elevation: 1,
                  shadowOffset: { height: 1.5, width: 1.5},
                  shadowOpacity: .65,
                  shadowRadius: 2,
                }
              ]}
            
            >
              <RemoteImage
                path={PetData.photo_url} 
                style={styles.image}
              />
            </View>
  
            <Text style={styles.petName}>{PetData.name}</Text>
          </View>
        </>
      )}
    </Pressable>
  )

}
const styles = StyleSheet.create({
  rootContainer:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  buttonContainer:{
  },
  selected:{
    top: '15%',
    left: '75%',
    zIndex:99,
    width: 28,
    backgroundColor: 'rgba(255,255,255, 0.45)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    top: -10,
    padding: 10,
  },
  imageContainer:{
    borderRadius: 8,
    overflow: 'hidden',
  },
  image:{
    height: 150,
    aspectRatio: 1,
    borderWidth: 0.5,
    objectFit: 'contain',
  },
  petName:{
    fontSize: 16,
    fontWeight: '500'
  },
})


export default memo(PetSelection)
