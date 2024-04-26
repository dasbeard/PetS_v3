import { StyleSheet, TextInput } from 'react-native'
import { Controller } from 'react-hook-form'

import {AlertText, View} from '@/components/Themed'
import Colors from '@/constants/Colors'

export default function ValidationInput({
  control, 
  name, 
  rules={}, 
  placeholder, 
  secureTextEntry,
}:{
  control:any, 
  name: string, 
  rules?:{}, 
  placeholder?:string, 
  secureTextEntry?: boolean,
}) {

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View 
          style={[{borderColor: error? Colors.red[500] : undefined}, styles.container]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              autoCapitalize='none'
            />
          </View>
          {error && (
            <View style={styles.alert}>
              <AlertText style={[{alignSelf: 'stretch'}]}>{error.message || 'Erorr'}</AlertText>
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
    backgroundColor: Colors.brand[50], 
    borderColor: Colors.brand[700], 
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    minHeight: 45,
    justifyContent:'center',
    marginVertical: 8,
  },
  input:{
    
  },
  alert:{
    marginTop: -6
  },
  
})

