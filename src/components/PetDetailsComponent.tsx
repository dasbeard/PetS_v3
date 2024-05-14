import { StyleSheet } from 'react-native'
import Colors from '@/constants/Colors'
import { View, Text } from '@/components/Themed'
import { useForm } from 'react-hook-form';
import ValidationInput from './ValidationInput';

export default function PetDetailsComponent() {
  const { control, handleSubmit, formState:{ isDirty, isSubmitSuccessful}, reset } = useForm({
    defaultValues:{
      name: '',
      type: '',
      color: '',
      breed: '',
      age: '',
      gender: '',
      weight: '',
      spayed_neutered: '',
      pet_stays: '',
      dietary_needs: '',
      feeding_food_brand: '',
      personality: '',
      medical_needs: '',
      other_needs: '',
      notes: '',
      routine: '',
      special_needs: '',
      photo_url: '',
    }
  });
  
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.label}>Pets Name</Text>
      <ValidationInput
        name='name'
        placeholder='Frank'
        control={control}
        rules={{required:'Pet name is required'}}
      />
      
      <Text style={styles.label}>Dog or Cat?</Text>
      <ValidationInput
        name='type'
        placeholder='Cat'
        control={control}
        rules={{required:'Pet type is required'}}
      />
      
      <Text style={styles.label}>What color is your pet?</Text>
      <ValidationInput
        name='color'
        placeholder='Black with white spots'
        control={control}
        rules={{required:'Pet color is required'}}
      />
      
      <Text style={styles.label}>What breed is your pet?</Text>
      <ValidationInput
        name='breed'
        placeholder='Siamese'
        control={control}
        // rules={{required:'Pet color is required'}}
      />
      
      <Text style={styles.label}>How old is your pet?</Text>
      <ValidationInput
        name='age'
        placeholder='6'
        control={control}
        // rules={{required:'Pet color is required'}}
      />
      
      <Text style={styles.label}>What gender is your pet?</Text>
      <ValidationInput
        name='gender'
        placeholder='Male'
        control={control}
        // rules={{required:'Pet color is required'}}
      />
      
      <Text style={styles.label}>About how much does your pet weigh?</Text>
      <ValidationInput
        name='weight'
        placeholder='8 lbs'
        control={control}
        // rules={{required:'Pet color is required'}}
      />
      
      <Text style={styles.label}>Are they spayed/neutered?</Text>
      <ValidationInput
        name='spayed_neutered'
        placeholder='Yes'
        control={control}
        rules={{required:'Spayed or Neutered is required'}}
      />
      
      <Text style={styles.label}>Where does your pet stay primarily?</Text>
      <ValidationInput
        name='pet_stays'
        placeholder='Indoor only'
        control={control}
        rules={{required:'Pet local is required'}}
      />
      
      <Text style={styles.label}>Do they have any dietary needs?</Text>
      <ValidationInput
        name='dietary_needs'
        placeholder='Wet food only'
        control={control}
        // rules={{required:'Pet local is required'}}
      />
      
      <Text style={styles.label}>What brand of feed do they eat?</Text>
      <ValidationInput
        name='feeding_food_brand'
        placeholder=''
        control={control}
        // rules={{required:'Pet local is required'}}
      />
      
      <Text style={styles.label}>What kind of personality do they have?</Text>
      <ValidationInput
        name='personality'
        placeholder='Skittish at first, but very affectionate'
        control={control}
        // rules={{required:'Pet local is required'}}
      />      

      <Text style={styles.label}>Do they have a specific routine?</Text>
      <ValidationInput
        name='routine'
        placeholder=''
        control={control}
        // rules={{required:'Pet local is required'}}
      />

      <Text style={styles.label}>Do they have any medical concerns/needs?</Text>
      <ValidationInput
        name='medical_needs'
        placeholder=''
        control={control}
        // rules={{required:'Pet local is required'}}
      />

      <Text style={styles.label}>Are there any other special needs we should be aware of?</Text>
      <ValidationInput
        name='special_needs'
        placeholder=''
        control={control}
        // rules={{required:'Pet local is required'}}
      />

      <Text style={styles.label}>Any other notes you would like to share with us?</Text>
      <ValidationInput
        name='notes'
        placeholder=''
        control={control}
        // rules={{required:'Pet local is required'}}
      />

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