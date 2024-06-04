import { memo, useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native'
import { View, Text } from '../Themed'
import { useColorScheme } from '../useColorScheme';
import Colors from '@/constants/Colors'
import { InteractiveStyles } from '@/constants/Styles';


export type MultiSelectButtonProps = {
  key: string,
  label: string,
  value: string,
  disabled?: boolean
}

interface Props {
  ButtonData: MultiSelectButtonProps[];
  OnSelect: (selected: string | string[]) => void;
  SelectedValues: string | string[];
  SingleSelection?: boolean;
}

function MultiSelectButton({ButtonData, SelectedValues, OnSelect, SingleSelection=false}: Props) {
    
  // console.log('rendered MultiSelectButton ');

  const colorScheme = useColorScheme();
  
  const handleSelection = ( item: MultiSelectButtonProps ) => {
    // Check if SingleSelection 
    if(SingleSelection){
      OnSelect(item.value)
    } else {
      if( typeof SelectedValues != 'string'){
      // check if adding or removing value from current array
        let updatedValues;
        if (SelectedValues.includes(item.value)){
          updatedValues = SelectedValues.filter( d => d !== item.value);
        } else {
          updatedValues = [...SelectedValues, item.value];
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
              // onPress={ () => handleSelection( item.value) }
              onPress={ () => handleSelection(item) }
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


export default memo(MultiSelectButton);