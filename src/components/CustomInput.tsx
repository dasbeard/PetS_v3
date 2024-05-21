import { StyleSheet, TextInput } from 'react-native'
import { Controller } from 'react-hook-form'
import {AlertText, View, Text} from '@/components/Themed'
import Colors from '@/constants/Colors'

import { useColorScheme } from './useColorScheme'

export default function CustomInput({
  Value,
  Placeholder, 
  SecureTextEntry,
  InputMode,
  KeyboardType,
  MultiLine = false,
  NumOfLines = 1,
  AutoCorrect,
  AutoCapitalize = 'sentences',
  OnChange,
  RightText,
}:{
  Value?: any,
  Placeholder?:string, 
  SecureTextEntry?: boolean,
  InputMode?: 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url',
  KeyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url',
  MultiLine?: boolean,
  NumOfLines?: number,
  AutoCorrect?:boolean,
  AutoCapitalize?: 'characters' | 'none' | 'sentences' | 'words',
  OnChange?: any,
  RightText?: string,
}) {
  const colorScheme = useColorScheme();

  return (
    <>
      <View 
        style={[
          styles.container,
          {
            height: MultiLine ? ( 38 * NumOfLines ) : 40, 
            maxHeight: 36 * NumOfLines + 4, 
            paddingVertical: MultiLine ? 2 : undefined,
            backgroundColor: colorScheme === 'light' ? Colors.brand[50] : Colors.brand[100]
          }, 
          ]}
      >
        <TextInput
          value={Value}
          onChangeText={OnChange}
          placeholder={Placeholder}
          secureTextEntry={SecureTextEntry}
          autoCapitalize={AutoCapitalize}
          autoCorrect={AutoCorrect}
          placeholderTextColor={ Colors.placeholderText }
          inputMode={InputMode ? InputMode : 'text'}
          keyboardType={KeyboardType ? KeyboardType : 'default'}            
          multiline={MultiLine}
          numberOfLines={NumOfLines ? NumOfLines : 1}
          style={{
            flex: 1,
            textAlignVertical: MultiLine ? 'top' : 'auto', 
            height: MultiLine ? '85%' : 'auto', 
          }}
        />
        { RightText && 
        <Text style={{color: Colors.light.text}}>{RightText}</Text>
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    color: Colors.brand[900],
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    // height: 38,
    minHeight: 40,
    // maxHeight: 38,
    // justifyContent:'center',
    justifyContent: 'space-between',
    marginVertical: 4,
    flex: 1,
    flexDirection: 'row',

  },

  alert:{
    marginTop: -2
  },
  
})

