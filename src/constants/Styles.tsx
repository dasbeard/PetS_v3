import { StyleSheet } from "react-native"
import Colors from "./Colors"

export const InteractiveStyles = ({pressed=false, colorScheme='light'}:{pressed?: boolean, colorScheme?: string}) => StyleSheet.create({
// export const InteractiveStyles = ({pressed=false, colorScheme='light'}:{pressed?: boolean, colorScheme?: string}) => StyleSheet.create({
  Shadow:{
    shadowColor: colorScheme === 'light' ? Colors.light.shadow : Colors.dark.shadow,
    opacity: pressed ? 0.5 : 1,
    elevation: pressed ? 1 : 3,
    shadowOffset: {height: pressed ? .75 : 2, width: pressed ? 0.75 : 2},
    shadowOpacity: pressed ? .75 : 0.25,
    shadowRadius: pressed ? 3 : 5,
    borderColor: colorScheme === 'light' ? Colors.light.border : Colors.dark.border,
  },
})
