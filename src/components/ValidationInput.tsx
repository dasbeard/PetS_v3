import { StyleSheet, TextInput } from 'react-native'
import { Controller } from 'react-hook-form'
import {AlertText, View} from '@/components/Themed'
import Colors from '@/constants/Colors'

import { useColorScheme } from './useColorScheme'

export default function ValidationInput({
  control, 
  name, 
  rules={}, 
  placeholder, 
  secureTextEntry,
  InputMode,
  KeyboardType,
  MultiLine = false,
  NumOfLines = 1,
  AutoCorrect,
  AutoCapitalize = 'sentences',
}:{
  control:any, 
  name: string, 
  rules?:{}, 
  placeholder?:string, 
  secureTextEntry?: boolean,
  InputMode?: 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url',
  KeyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url',
  MultiLine?: boolean,
  NumOfLines?: number,
  AutoCorrect?:boolean,
  AutoCapitalize?: 'characters' | 'none' | 'sentences' | 'words'
}) {
  const colorScheme = useColorScheme();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error} }) => (
        <>
          <View 
            style={[
              styles.container,
              {
                borderColor: error ? Colors.red[500] : Colors.brand[700],
                height: MultiLine ? ( 38 * NumOfLines ) : 40, 
                maxHeight: 36 * NumOfLines + 4, 
                paddingVertical: MultiLine ? 2 : undefined,
                backgroundColor: colorScheme === 'light' ? Colors.brand[50] : Colors.brand[100]
              }, 
              ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              autoCapitalize={AutoCapitalize}
              autoCorrect={AutoCorrect}
              placeholderTextColor={ Colors.placeholderText }
              inputMode={InputMode ? InputMode : 'text'}
              keyboardType={KeyboardType ? KeyboardType : 'default'}            
              multiline={MultiLine}
              numberOfLines={NumOfLines ? NumOfLines : 1}
              // returnKeyType={'next'}
              style={{
                textAlignVertical: MultiLine ? 'top' : 'auto', 
                height: MultiLine ? '85%' : 'auto', 
              }}
            />
          </View>
          {error && (
            <View style={styles.alert}>
              <AlertText style={[{alignSelf: 'stretch', marginBottom: 6}]}>{error.message || 'Error'}</AlertText>
            </View>
          )}
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container:{
    color: Colors.brand[900],
    // backgroundColor: Colors.brand[50], 
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    // height: 38,
    minHeight: 40,
    // maxHeight: 38,
    justifyContent:'center',
    marginVertical: 4,
    flex: 1,
  },

  alert:{
    marginTop: -2
  },
  
})

