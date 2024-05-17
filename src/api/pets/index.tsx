import { supabase } from '@/util/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Tables, TablesInsert, TablesUpdate } from '@/database.types'

export const useGetUsersPetList = (userId: string) => {
  return useQuery({
    queryKey: ['petList'],
    queryFn: async () => {
      const { data, error } = await 
        supabase
          .from('pets')
          .select('id, age, name, photo_url, type')
          .eq('owner_id', userId)
      if(error){
        console.log('Error retreiving users pet list: ', error);
        throw new Error(error.message)
      }
      
      return data;
    }
  })
};

export const useGetPet = (petId: number) => {
  return useQuery({
    queryKey: ['pet', petId],
    queryFn: async () => {
      const { data, error } = await 
        supabase
          .from('pets')
          .select('*')
          .eq('id', petId)
          .single()
      if(error){
        console.log('Error retreiving pet profile: ', error);
        throw new Error(error.message)
      }
      
      return data;
    }
  })
};


export const useInsertPet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: TablesInsert<'pets'>) {
      const { error, data: newPet } = await supabase.from('pets').insert({
        name: data.name,
        type: data.type,
        color: data.color,
        breed: data.breed,
        age: data.age,
        gender: data.gender,
        weight: data.weight,
        spayed_neutered: data.spayed_neutered,
        pet_stays: data.pet_stays,
        dietary_needs: data.dietary_needs,
        feeding_food_brand: data.feeding_food_brand,
        personality: data.personality,
        medical_needs: data.medical_needs,
        other_needs: data.other_needs,
        notes: data.notes,
        routine: data.routine,
        special_needs: data.special_needs,
        photo_url: data.photo_url,
        owner_id: data.owner_id
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey: ['petList']})
    },
    onError(error) {
      console.log(error);
    },
  })
};


export const useUpdatePetProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any){
      const { error, data: updatedPetProfile } = await supabase
        .from('pets')
        .update({
          name: data.name,
          type: data.type,
          color: data.color,
          breed: data.breed,
          age: data.age,
          gender: data.gender,
          weight: data.weight,
          spayed_neutered: data.spayed_neutered,
          pet_stays: data.pet_stays,
          dietary_needs: data.dietary_needs,
          feeding_food_brand: data.feeding_food_brand,
          personality: data.personality,
          medical_needs: data.medical_needs,
          other_needs: data.other_needs,
          notes: data.notes,
          routine: data.routine,
          special_needs: data.special_needs,
          photo_url: data.photo_url,
          updated_at: ((new Date()).toISOString()).toLocaleString()
        })
        .eq('id', data.pet_id)
        .select()
        .single();
      
      if(error){
        console.log('Error updateing Pet Profile: ', error);
        throw new Error(error.message)
      }
      
      return updatedPetProfile;
    },
    async onSuccess(_, data) {
      await queryClient.invalidateQueries({queryKey: ['pet', data.pet_id]})
      await queryClient.invalidateQueries({queryKey: ['petList']})
    },
    onError(error) {
      console.log('Error: ', error);
    }
  })
};

export const useUpdatePetPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any){
      const { error, data: updatedPhoto } = await supabase
        .from('pets')
        .update({
          photo_url: data.photo_url,
        })
        .eq('id', data.pet_id)
        .select()
        .single();
      
      if(error){
        console.log('Error updateing Pet Photo Path: ', error);
        throw new Error(error.message)
      }
      
      return updatedPhoto;
    },
    async onSuccess(_, data) {
      await queryClient.invalidateQueries({queryKey: ['pet', data.pet_id]})
      await queryClient.invalidateQueries({queryKey: ['petList']})
    },
    onError(error) {
      console.log('Error: ', error);
    }
  })
};

// export const useCreateUsersAddress = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     async mutationFn(data: any){
//       const { error, data: addressData }= await supabase
//         .from('addresses')
//         .insert([{
//           address: data.address,
//           city: data.city,
//           state: data.city,
//           zipcode: data.zipcode,
//           directions: data.directions,
//         }])
//         .select()
//         .single();

//       if(error){
//         console.log('Error creating new address: ', error);
//         throw new Error(error.message)
//       }
      
//       return addressData;
//     },
//     async onSuccess(successData, data) {
//       // insert new address id into users table      
//       await supabase.from('users').update({address_id: successData.id}).eq('id', data.userId).select().single()
//       //  update profile query
//       await queryClient.invalidateQueries({queryKey: ['userProfile', data.id]})
//     },
//     onError(error) {
//       console.log('Error: ', error);
//     }
//   })
// };

// export const useUpdateUsersAddress = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     async mutationFn({userId, addressId, updatedAddressFields}:{userId: string, addressId: number, updatedAddressFields: TablesUpdate<'addresses'>}){
//       const { error, data: updatedAddress } = await supabase
//         .from('addresses')
//         .update({...updatedAddressFields, updated_at: ((new Date()).toISOString()).toLocaleString()})
//         .eq('id', addressId)
//         .select()
//         .single();
      
//       if(error){
//         console.log('Error updateing User Address: ', error);
//         throw new Error(error.message)
//       }
      
//       return updatedAddress;
//     },
//     async onSuccess(_, data) {
//       await queryClient.invalidateQueries({queryKey: ['userProfile', data.userId]})
//     },
//     onError(error) {
//       console.log('Error: ', error);
//     }
//   })
// };

// export const useCreateHomeInfo = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     async mutationFn({userId, data}:{userId: string, data: any}){
//       const { error, data: HomeInfo }= await supabase
//         .from('home_info')
//         .insert([
//           {...data}
//         ])
//         .select()
//         .single();

//       if(error){
//         console.log('Error creating new Home Info: ', error);
//         throw new Error(error.message)
//       }
      
//       return HomeInfo;
//     },
//     async onSuccess(successData, data) {
//       // insert new address id into users table      
//       await supabase.from('users').update({home_info_id: successData.id}).eq('id', data.userId).select().single()
//       //  update profile query
//       await queryClient.invalidateQueries({queryKey: ['userProfile', data.userId]})
//     },
//     onError(error) {
//       console.log('Error: ', error);
//     }
//   })
// };

// export const useUpdateHomeInfo = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     async mutationFn({userId, HomeInfoId, updatedHomeInfoFields}:{userId: string, HomeInfoId: number, updatedHomeInfoFields: TablesUpdate<'addresses'>}){
//       const { error, data: updatedAddress } = await supabase
//         .from('home_info')
//         .update(updatedHomeInfoFields)
//         .eq('id', HomeInfoId)
//         .select()
//         .single();
      
//       if(error){
//         console.log('Error updateing Home Info: ', error);
//         throw new Error(error.message)
//       }
      
//       return updatedAddress;
//     },
//     async onSuccess(_, data) {
//       await queryClient.invalidateQueries({queryKey: ['userProfile', data.userId]})
//     },
//     onError(error) {
//       console.log('Error: ', error);
//     }
//   })
// };

// export const useCreateUserPhoneNumber = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     async mutationFn({userId, data}:{userId: string, data: any}){
//       const { error, data: newPhoneNumber }= await supabase
//         .from('phone_numbers')
//         .insert([
//           {...data, user_id:userId}
//         ])
//         .select()
//         .single();

//       if(error){
//         console.log('Error creating new PhoneNumber: ', error);
//         throw new Error(error.message)
//       }
      
//       return newPhoneNumber;
//     },
//     async onSuccess(_, data) {
//       //  update profile query
//       await queryClient.invalidateQueries({queryKey: ['userProfile', data.userId]})
//     },
//     onError(error) {
//       console.log('Error: ', error);
//     }
//   })
// };

// export const useUpdateUserPhoneNumber = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     async mutationFn({userId, phoneId, updatedPhoneFields}:{userId: string, phoneId: number, updatedPhoneFields: TablesUpdate<'phone_numbers'>}){
//       const { error, data: updatedAddress } = await supabase
//         .from('phone_numbers')
//         .update(updatedPhoneFields)
//         .eq('id', phoneId)
//         .select()
//         .single();
      
//       if(error){
//         console.log('Error updateing Users Phone Number: ', error);
//         throw new Error(error.message)
//       }
      
//       return updatedAddress;
//     },
//     async onSuccess(_, data) {
//       await queryClient.invalidateQueries({queryKey: ['userProfile', data.userId]})
//     },
//     onError(error) {
//       console.log('Error: ', error);
//     }
//   })
// };


// export const useDeleteUserPhoneNumber = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     async mutationFn({userId, phoneId}:{userId: string, phoneId: number}) {
//       const {error} = await supabase.from('phone_numbers').delete().eq('id', phoneId);

//       if (error) {
//         throw new Error(error.message);
//       }

//     },
//     async onSuccess(_,data) {
//       await queryClient.invalidateQueries({queryKey: ['userProfile', data.userId ]});  
//     },
//   })
// };