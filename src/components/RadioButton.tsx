import { StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text } from './Themed'
import Colors from '@/constants/Colors'

export type ButtonDataProps = {
  key: string,
  label: string,
  value: string | boolean,
}

export default function RadioButton(
  {
    ButtonData, 
    SelectedValue, 
    OnPress,
    // OnPress = () => null
  }:{
    ButtonData: ButtonDataProps, 
    SelectedValue: string | boolean | null, 
    OnPress?: any,
  }) {

  return (
    <View key={ButtonData.key} style={styles.rootContainer}>
      <Text style={styles.label}>{ButtonData.label}</Text>
      
        <TouchableOpacity onPress={OnPress} style={styles.container}>

        {/* <View style={styles.innerContainer} /> */}
          { SelectedValue === ButtonData.value && <View style={styles.innerContainer} />}
          
        </TouchableOpacity>
    </View>  
  )
}

const styles = StyleSheet.create({
  rootContainer:{
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: 4,
    marginHorizontal: 8,
    paddingHorizontal: 4
  },
  container:{
    borderWidth: 1,
    borderColor: Colors.brand[400],

    height: 30,
    width: 30,
    borderRadius: 30,

    justifyContent: 'center',
    padding: 5,
  },
  label:{
    fontSize: 15,
  },
  innerContainer:{
    borderWidth: 1,
    borderColor: Colors.brand[500],
    // margin: 10,

    alignSelf: 'center',
    backgroundColor: Colors.brand[500],

    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
})