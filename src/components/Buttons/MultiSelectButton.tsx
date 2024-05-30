import { Pressable, StyleSheet } from 'react-native'
import { View, Text } from '../Themed'
import Colors from '@/constants/Colors'
import { useColorScheme } from '../useColorScheme';
import { useState } from 'react';
import { InteractiveStyles } from '@/constants/Styles';


export type MultiSelectButtonProps = {
  key: string,
  label: string,
  value: string,
  disabled?: boolean
}

export default function MultiSelectButton(
  {
    ButtonData, 
    SelectedValues, 
    OnSelect,
    SingleSelection=false,
  }:{
    ButtonData: MultiSelectButtonProps[], 
    SelectedValues: string | string[], 
    OnSelect: ( selectedValues: string | string[]) => void,
    SingleSelection?: boolean,
  }) 
{
  const colorScheme = useColorScheme();

  const handleSelection = ( value: string ) => {
    // Check if SingleSelection 
    if(SingleSelection){
      OnSelect(value)
    } else {
      if( typeof SelectedValues != 'string'){
      // check if adding or removing value from current array
        let updatedValues;
        if (SelectedValues.includes(value)){
          updatedValues = SelectedValues.filter( d => d !== value);
        } else {
          updatedValues = [...SelectedValues, value];
        } 
        // return values to caller with new value appended or removed from array
        OnSelect(updatedValues);
      }
    }
  }


  return (
    <View style={styles.rootContainer}>
      {
        ButtonData.map((item) => {
          return(
            <Pressable 
              key={item.key} 
              disabled={item.disabled}
              style={[
                styles.btnContainer,
                item.disabled ? {opacity: 0.7} : {opacity: 1},
              ]}
              onPress={ () => handleSelection( item.value) }
            >
              {({ pressed }) =>(
                <View 
                  style={[
                    styles.btn, 
                    InteractiveStyles({pressed: pressed, colorScheme: colorScheme!, disabled: item.disabled}).Shadow,
                    SelectedValues.includes(item.value) 
                    ? { 
                      backgroundColor: (colorScheme === 'light' ? Colors.brandAlt[500] : Colors.brandAlt[400]), 
                    }
                    : { 
                      backgroundColor: (colorScheme === 'light' ? Colors.brand[500] : Colors.brand[400]), 
                    },
                  ]}
                >
                  <Text style={styles.label}>{item.label}</Text>            
                </View>
              )}
            </Pressable>
          )
        })

      }



    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer:{
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  btnContainer:{
    flex:1,
  },
  btn:{
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label:{
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
    letterSpacing: 0.7,
    textAlign: 'center',
  },

})