import { View, Text as RootText } from '@/components/Themed'
import { Pressable, StyleSheet } from 'react-native'

import { useColorScheme } from '../useColorScheme';
import Colors from "@/constants/Colors";
import { InteractiveStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';

export default function IconButton ({ 
  Disabled=false, 
  onPress,
  Selected=false,
  ButtonWidth,
  BackgroundColor,
  BorderColor,
  Icon,
  IconSize,
  IconColor,
  styles,
} : {
  Disabled?: boolean, 
  onPress?: any,
  Selected?: boolean,
  ButtonWidth?: number,
  BackgroundColor?: string,
  BorderColor?: string,
  Icon?:string,
  IconSize?:number,
  IconColor?:string,
  styles?:{}
}) {
  
  const colorScheme = useColorScheme();

  const defaultFunction = () => {
    console.log('Button Clicked');
  }

  
  return (
    <Pressable 
      style={ Disabled ? {opacity: 0.7}: {opacity: 1}}
      disabled={Disabled}
      onPress={onPress ? onPress : defaultFunction }
    >
        {({ pressed }) => ( 
          <View 
            style={[
              buttonStyles(Selected, colorScheme!).innerContainer,
              Selected ? buttonStyles(Selected, colorScheme!, pressed).Selected : InteractiveStyles({pressed:pressed, colorScheme:colorScheme!, disabled: Disabled}).Shadow, 
              ButtonWidth ? ({ width: ButtonWidth }) : ({width: '100%'}),
              BackgroundColor ? ({backgroundColor: BackgroundColor}) : (null),
              BorderColor ? ({borderColor: BorderColor}) : (BackgroundColor ? ({borderColor: BackgroundColor}) : (null)),
              styles,
            ]}
          >
            <Ionicons 
              name={Icon ? Icon : 'code'} 
              size={IconSize ? IconSize : 16} 
              color=
                { IconColor 
                  ? IconColor 
                  : (colorScheme === 'light' ? Colors.dark.text : Colors.light.text)
                } 
            
            />
          </View>

        )}
    </Pressable>
  )
}

const buttonStyles = (Selected?: boolean, colorScheme?: string, pressed?: boolean) =>  StyleSheet.create({
  innerContainer:{
    borderRadius: 6,
    padding: 8,
    backgroundColor: Selected ? (colorScheme === 'light' ? Colors.brand[800] : Colors.brand[200] ): ( colorScheme === 'light' ? Colors.brand[500] : Colors.brand[200]),
    borderWidth:1,
    marginVertical: 5,
    alignSelf: 'center',
    justifyContent: 'center',
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
