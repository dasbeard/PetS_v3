import { StyleSheet } from 'react-native'
// import { useState } from 'react';
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


  console.log('-*-*-*-*-*-*-*-*');
  // const [selectedCountry, setSelectedCountry] = useState<undefined | ICountry>(undefined);
    
  const ICountryUSA = {
    "callingCode": "+1", "cca2": "US", "flag": "🇺🇸", "name": {"ar": "الولايات المتحدة", "bg": "Съединени щати", "by": "Злучаныя Штаты", "cn": "美国", "cz": "Spojené státy", "de": "Vereinigte Staaten", "ee": "Ühendriigid", "el": "Ηνωμένες Πολιτείες Αμερικής", "en": "United States", "es": "Estados Unidos", "fr": "États-Unis", "he": "ארצות הברית", "it": "stati Uniti", "jp": "アメリカ", "nl": "Verenigde Staten", "pl": "Stany Zjednoczone", "pt": "Estados Unidos", "ro": "Statele Unite", "ru": "Соединенные Штаты", "ua": "Сполучені Штати", "zh": "美國"}
  }

  // function handleSelectedCountry(country: ICountry) {
  //   setSelectedCountry(country);
  // }
  return (
    <Controller
      control={control}
      name={name}
      // rules={rules}
      render={({ field: { value, onChange, onBlur } }) => (
        <>
        <View style={styles.container}>
          <PhoneInput
            placeholder={placeholder}
            // defaultCountry='US'
            value={value}
            defaultValue='+1234567890'
            // onBlur={onBlur}
            onChangePhoneNumber={onChange}
            selectedCountry={ICountryUSA}
            onChangeSelectedCountry={() =>null}
            // selectedCountry={selectedCountry}
            // onChangeSelectedCountry={handleSelectedCountry}
            // modalDisabled
            phoneInputStyles={{
              container: {
                borderWidth: 1,
                borderColor: Colors.brand[700],
                // borderColor: error ? Colors.red[500] : Colors.brand[700],
                backgroundColor: Colors.brand[50],
                borderRadius: 6,
                minHeight: 38,
                maxHeight: 38,
                marginVertical: 4,
              },
              flagContainer: {
                display: 'none'
              },
              input: {
                color:  Colors.light.text,
                fontSize: 14,
                paddingHorizontal: 10,
                marginVertical: 4,
              },
            }}
          />
        </View>
        {/* {error && (
          <View style={styles.alert}>
            <AlertText style={[{alignSelf: 'stretch', marginBottom: 6}]}>{error.message || 'Error'}</AlertText>
          </View>
        )} */}
        </>
      )}
    />
  );
}



const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  alert:{
    marginTop: -2
  },
})







