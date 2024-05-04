import { StyleSheet } from "react-native"
import Colors from "./Colors"

export const InteractiveStyles = ({pressed=false, colorScheme='light', disabled=false}:{pressed?: boolean, colorScheme?: string, disabled?: boolean}) => StyleSheet.create({
  // export const InteractiveStyles = ({pressed=false, colorScheme='light'}:{pressed?: boolean, colorScheme?: string}) => StyleSheet.create({
  
  Shadow:{
    shadowColor: colorScheme === 'light' ? Colors.light.shadow : Colors.dark.shadow,
    opacity: disabled || pressed ? 0.5 : 1,
    elevation: disabled || pressed ? 1 : 3,
    shadowOffset: disabled ? { height: 0.5, width: 0.5} : {height: pressed ? 0.75 : 2, width: pressed ? 0.75 : 2},
    
    shadowOpacity: disabled || pressed ? 0.75 : 0.25,
    shadowRadius: disabled || pressed ? 3 : 5,
    borderColor: colorScheme === 'light' ? Colors.light.border : Colors.dark.border,
  },
})
