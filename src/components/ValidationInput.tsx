import { StyleSheet, TextInput } from 'react-native'
import { Controller } from 'react-hook-form'
import {AlertText, View} from '@/components/Themed'
import Colors from '@/constants/Colors'

// import { useColorScheme } from './useColorScheme'

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
  // const colorScheme = useColorScheme();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View 
          style={[{borderColor: error ? Colors.red[500] : Colors.brand[700]}, styles.container]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              autoCapitalize='none'
              placeholderTextColor={ Colors.placeholderText }
            />
          </View>
          {error && (
            <View style={styles.alert}>
              <AlertText style={[{alignSelf: 'stretch', marginBottom: 6}]}>{error.message || 'Erorr'}</AlertText>
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
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    minHeight: 38,
    justifyContent:'center',
    marginVertical: 4,
  },
  input:{

  },
  alert:{
    marginTop: -2
  },
  
})

