import { View, Text as RootText } from '@/components/Themed'
import { Pressable, StyleSheet } from 'react-native'

import { useColorScheme } from '../useColorScheme';
import Colors from "@/constants/Colors";
import { InteractiveStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';

export default function Button ({ 
  Disabled=false, 
  Text='Click Me',
  onPress,
  Selected=false,
  ButtonWidth,
  TextColor,
  BackgroundColor,
  BorderColor,
  BoldText=false,
  LeftIcon,
  LeftIconColor,
  LeftIconSize,
  RightIcon,
  RightIconSize,
  RightIconColor,
} : {
  Disabled?: boolean, 
  Text?: string,
  onPress?: any,
  Selected?: boolean,
  ButtonWidth?: number,
  TextColor?: string,
  BackgroundColor?: string,
  BorderColor?: string,
  BoldText?: boolean,
  LeftIcon?:string,
  LeftIconSize?:number,
  LeftIconColor?:string,
  RightIcon?:string,
  RightIconSize?:number,
  RightIconColor?:string,
}) {
  
  const colorScheme = useColorScheme();

  const defaultFunction = () => {
    console.log('Button Clicked');
  }
  
  return (
    <Pressable 
      style={Disabled ? {opacity: 0.5}: {opacity: 1}}
      disabled={Disabled}
      onPress={onPress ? onPress : defaultFunction }
    >
        {({ pressed }) => ( 
          <View 
            style={[
              styles(Selected, colorScheme!).innerContainer,
              Selected ? styles(Selected, colorScheme!, pressed).Selected : InteractiveStyles({pressed:pressed, colorScheme:colorScheme!}).Shadow, 
              ButtonWidth ? ({ width: ButtonWidth }) : ({width: '100%'}),
              
              BackgroundColor ? ({backgroundColor: BackgroundColor}) : (null),
              BorderColor ? ({borderColor: BorderColor}) : (BackgroundColor ? ({borderColor: BackgroundColor}) : (null)),
            ]}
          >
            <View style={styles(Selected, colorScheme!, pressed).textContainer}>
              
              {LeftIcon ? (
                <Ionicons 
                  name={LeftIcon} 
                  size={LeftIconSize ? LeftIconSize : 20} 
                  color={LeftIconColor ? LeftIconColor : (colorScheme === 'light' ? Colors.dark.text : Colors.light.text)} />
                ):(
                  null
                )
              }
                            
              <RootText 
                style={[
                  styles(Selected, colorScheme!, pressed).text, 
                  TextColor ? ({color: TextColor}) : (null),
                  BoldText ? {fontWeight: '600'}: {fontWeight:'400'},
                ]}              
              >
                {Text}
              </RootText>
              
              {RightIcon ? (
                <Ionicons 
                  name={RightIcon} 
                  size={RightIconSize ? RightIconSize : 20} 
                  color={RightIconColor ? RightIconColor : (colorScheme === 'light' ? Colors.dark.text : Colors.light.text)} />
                ):(
                  null
                )
              }

            </View>
          </View>

        )}
    </Pressable>
  )
}

const styles = (Selected?: boolean, colorScheme?: string, pressed?: boolean) =>  StyleSheet.create({
  innerContainer:{
    borderRadius: 4,
    padding: 12,
    backgroundColor: Selected ? Colors.brand[800] : Colors.brand[500],
    borderColor: Selected ? Colors.brand[800] : Colors.brand[500],
    borderWidth:1,
    marginVertical: 5,
    alignSelf: 'center',
  },
  text: {
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: 15,
    color: Colors.dark.text,
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  Selected:{
    opacity: pressed ? 0.5 : 1,
    elevation: pressed ? 0 : 1,
    shadowColor: colorScheme === 'light' ? '#111' : '#222328',
    shadowOffset: {height: pressed ? 2 :.75, width: pressed ? 2 : 0.75},
    shadowOpacity: pressed ? 0.25 : .75,
    shadowRadius: pressed ? 2 : 1,
  },

})
