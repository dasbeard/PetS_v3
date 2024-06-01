import { StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text } from '../Themed'
import Colors from '@/constants/Colors'
import { useColorScheme } from '../useColorScheme';
import { memo } from 'react';


export type ButtonDataProps = {
  key: string,
  label: string,
  value: string | boolean,
}

function RadioButton(
  {
    ButtonData, 
    SelectedValue, 
    OnPress,
  }:{
    ButtonData: ButtonDataProps, 
    SelectedValue: string | boolean | null, 
    OnPress?: any,
  }) 
{
  const colorScheme = useColorScheme();
 

  return (
    <View key={ButtonData.key} style={styles.rootContainer}>
      <Text style={styles.label}>{ButtonData.label}</Text>
      
        <TouchableOpacity 
          onPress={OnPress} 
          style={[styles.container,
            {
              borderColor:( colorScheme === 'light' ? Colors.brand[500] : Colors.brand[200])
            }
          ]}>

          { SelectedValue === ButtonData.value && 
            <View 
              style={[
                styles.innerContainer,
                {
                  backgroundColor:( colorScheme === 'light' ? Colors.brand[500] : Colors.brand[200]),
                  borderColor:( colorScheme === 'light' ? Colors.brand[500] : Colors.brand[200]),
                }
              ]} 
            />
          }
          
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
    paddingHorizontal: 4,
    backgroundColor: 'rgba(0,0,0,0)'
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
    // borderColor: Colors.brand[500],

    alignSelf: 'center',

    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
})



export default memo(RadioButton)
