import { Text, CardView } from "@/components/Themed"
import { Pressable, StyleSheet, Image, Platform } from "react-native"

import { useColorScheme } from '@/components/useColorScheme';
import { InteractiveStyles } from "@/constants/Styles";

export default function ServiceSelectionButton ( { service, onPress } :{service: string, onPress?: any } ) {
  const colorScheme = useColorScheme(); 

  const allImagesArray = [
    {
      id: 'cat',
      light: require('@assets/icons/Cat_Icon.png'),
      dark: require('@assets/icons/Cat_Icon_Alt.png'),
    },
    {
      id:'dog',
      light: require('@assets/icons/Dog_Icon.png'),
      dark: require('@assets/icons/Dog_Icon_Alt.png'),
    },
    {
      id:'boarding',
      light: require('@assets/icons/Boarding_Icon.png'),
      dark: require('@assets/icons/Boarding_Icon_Alt.png'),
    },
    {
      id:'clock',
      light: require('@assets/icons/Clock_Icon.png'),
      dark: require('@assets/icons/Clock_Icon_Alt.png'),
    },
    {
      id:'dogwalk',
      light: require('@assets/icons/Dog_Walk_Icon.png'),
      dark: require('@assets/icons/Dog_Walk_Icon_Alt.png'),
    },
    {
      id:'medication',
      light: require('@assets/icons/Medication_Icon.png'),
      dark: require('@assets/icons/Medication_Icon_Alt.png'),
    },
    {
      id:'paws',
      light: require('@assets/icons/Paws_Icon.png'),
      dark: require('@assets/icons/Paws_Icon_Alt.png'),
    },
    {
      id:'petlocation',
      light: require('@assets/icons/Pet_Location_Icon.png'),
      dark: require('@assets/icons/Pet_Location_Icon_Alt.png'),
    },
    {
      id:'homevisit',
      light: require('@assets/icons/Pet_Food_Icon.png'),
      dark: require('@assets/icons/Pet_Food_Icon_Alt.png'),
    },
  ];

  let Icon = allImagesArray.find(ob => ob.id === service.replace(' ','').toLowerCase() )

  return (
    <Pressable onPress={onPress} >
      {({ pressed }) => (
        <CardView style={[styles.container, InteractiveStyles({pressed:pressed, colorScheme:colorScheme!}).Shadow]}>
          <Image 
            source={ colorScheme === 'light' ? Icon?.light : Icon?.dark } 
            style={styles.image}
          />
          
          <CardView style={styles.textContainer}>
            <Text style={styles.mainText}>{service}</Text>
            <Text style={styles.secondaryText}>Here are some details about the service</Text>
          </CardView>

        </CardView>
      )}
    </Pressable> 
  )
}



// const styles = ( pressed?: boolean, colorScheme?: string ) =>  StyleSheet.create({
const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',    
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 2,
    padding: 12,
    alignItems: 'center',
    alignContent: 'space-between',
    gap: 8,
  },
  image:{
    flex: 1,
    height: 110,
    width: 110,
    resizeMode: 'contain',
  },
  textContainer:{
    flex: 2,
    paddingHorizontal: 4,
  },
  mainText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  secondaryText: {
    fontSize: 12,
    fontWeight: '300'
  },
})

