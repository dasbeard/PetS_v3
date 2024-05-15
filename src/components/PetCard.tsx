import { Pressable, StyleSheet } from 'react-native'
import { View, Text, CardView } from './Themed';
import React from 'react'
import RemoteImage from './RemoteImage'
import { useColorScheme } from './useColorScheme';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { InteractiveStyles } from '@/constants/Styles';

export type QuickPetDataProps = {
  id: number,
  name: string,
  age: number | string,
}


export default function PetCard({PetData} : { PetData: QuickPetDataProps}) {
  const colorScheme = useColorScheme();



  return (
    <Link href={`/(client)/(pets)/${PetData?.id}`} asChild>
      <Pressable>
        {({ pressed }) => (

          <CardView style={[InteractiveStyles({pressed: pressed, colorScheme: colorScheme!}).Shadow, styles.rootContainer ]}>
            <CardView style={[styles.imageContainer, shadow({colorScheme: colorScheme!}).shadow ]}>
              <RemoteImage style={[styles.image]} path={null}  />
            </CardView>

            <CardView style={styles.textContainer}>
              <Text style={styles.name}>{PetData?.name}</Text>
              <Text style={styles.age}>{PetData?.age} old</Text>
            </CardView>
            
          </CardView>
        )}
      </Pressable>
    </Link>
  )
}

const shadow = ({colorScheme}:{colorScheme?:string}) => StyleSheet.create({
  shadow:{ 
    shadowColor: colorScheme === 'light' ? Colors.light.shadow : Colors.dark.shadow,
    borderColor: colorScheme === 'light' ? Colors.light.shadow : Colors.dark.shadow,
    elevation: 1,
    shadowOffset:  {height: 2, width: 2},
    shadowOpacity: 0.25,
    shadowRadius:  1.5,
  }
})


const styles= StyleSheet.create({
  rootContainer:{
    flex: 1,
    flexDirection: 'row',
    padding: 18,
    borderRadius: 12,
    maxHeight: 145,
    marginVertical: 6,
    marginHorizontal: 10,
    borderWidth: 0.25,
    gap: 25
  },
  imageContainer:{
    maxWidth: '40%',
    borderRadius: 100,
  },
  image: {
    borderWidth: 0.25,
    height: '100%',
    aspectRatio: 1,
    objectFit: 'contain',
    borderRadius: 100,
  },
  textContainer:{
    justifyContent: 'center',
  },
  name:{
    fontSize: 24,
    marginBottom: 20,
  },
  age:{
    fontSize: 16,
  },

})