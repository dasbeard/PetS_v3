import { StyleSheet } from 'react-native'
import { View, Text } from './Themed'
import ValidationInput from './ValidationInput'
import { useForm } from 'react-hook-form'
import AddressComponent from './AddressComponent';

export default function VeterinarianComponent({sourceId, VetId}:{sourceId?: string | number, VetId?: number}) {

  const { control, handleSubmit, formState: { isDirty, isSubmitSuccessful } } = useForm({
    defaultValues:{

    }
  });

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.label}>Vetrinarian Name</Text>
      <ValidationInput 
        name='name'
        placeholder='My Local Vet'
        control={control}
        rules={{required: 'Vetrinarian Name is Required'}}
      />

      {/* <AddressComponent sourceId={} AddressData={} /> */}

    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer:{
    // borderWidth: 1,
    // borderColor: 'red',
    flex: 1,
    marginBottom: 15,
  },
  container: {
    flexDirection: 'row',
    gap: 8
  },
  label:{
    marginTop: 7,
    marginBottom: 2,
  },
})