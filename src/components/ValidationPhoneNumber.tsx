import { StyleSheet } from 'react-native'
import { useState } from 'react';
import { View, AlertText } from './Themed'
import PhoneInput, { ICountry} from 'react-native-international-phone-number';
import { Controller } from 'react-hook-form';
import Colors from '@/constants/Colors';

export default function ValidationPhoneNumber({
  control,
  name,
  rules={},
  placeholder,
  }:{
    control: any,
    name: string,
    rules?:{},
    placeholder?:any,
  }) { 
  const [selectedCountry, setSelectedCountry] = useState<undefined | ICountry>(undefined);

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }
  return (
    // <View style={{ width: '100%', flex: 1, padding: 24 }}>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, onBlur }, fieldState: {error} }) => (
          <>
          <PhoneInput
            placeholder={placeholder}
            defaultCountry='US'
            onBlur={onBlur}
            value={value}
            onChangePhoneNumber={onChange}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={handleSelectedCountry}
            phoneInputStyles={{
              container: {
                borderWidth: 1,
                borderColor: error ? Colors.red[500] : Colors.brand[700],
                backgroundColor: Colors.brand[50],
                borderRadius: 6,
                height: 38,
                marginVertical: 4,
                justifyContent: 'center',
                // padding: 0,

              },
              flagContainer: {
                display: 'none'
              },
              input: {
                color:  Colors.light.text,
                fontSize: 14,
                paddingHorizontal: 10,
              },
            }}
          />
          {error && (
            <View style={styles.alert}>
              <AlertText style={[{alignSelf: 'stretch', marginBottom: 6}]}>{error.message || 'Error'}</AlertText>
            </View>
          )}

          </>
        )}
      />

  );
}



const styles = StyleSheet.create({
  alert:{
    marginTop: -2
  },
  // rootContainer:{
  //   borderWidth: 1,
  //   borderColor: 'red',
  //   flex: 1,
  //   marginBottom: 15,
  // },
  // container: {
  //   flexDirection: 'row',
  //   gap: 8
  // },
  // label:{
  //   marginTop: 7,
  //   marginBottom: 2,
  // },
})







