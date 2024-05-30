import { StyleSheet } from "react-native"
import Colors from "./Colors"

export const InteractiveStyles = ({pressed=false, colorScheme='light', disabled=false}:{pressed?: boolean, colorScheme?: string, disabled?: boolean}) => StyleSheet.create({
  
  Shadow:{
    opacity: disabled || pressed ? 0.4 : 1,
    shadowColor: colorScheme === 'light' ? Colors.light.shadow : Colors.dark.shadow,
    elevation: disabled || pressed ? 1 : 3,
    shadowOffset: disabled ? { height: 0.5, width: 0.5} : {height: pressed ? 0.75 : 1.5, width: pressed ? 0.75 : 1.5},
    shadowOpacity: disabled || pressed ? 0.25 : 0.65,
    shadowRadius: disabled || pressed ? 1 : 2,
    borderColor: disabled ? (colorScheme === 'light' ? Colors.light.shadow : Colors.dark.shadow) : (colorScheme === 'light' ? Colors.light.border : Colors.dark.border),
    // borderColor: colorScheme === 'light' ? Colors.light.border : Colors.dark.border,
    borderWidth: 0.1,
    
  },
})
