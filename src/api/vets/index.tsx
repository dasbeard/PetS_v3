import { supabase } from '@/util/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Tables, TablesInsert, TablesUpdate } from '@/database.types'

export const useGetVeterinarian = (id:string | number) => {
  return useQuery({
    queryKey: ['veterinarian', id],
    queryFn: async () => {
      const { data, error } = await 
        supabase
          .from('veterinarians')
          .select('*, addresses(*), phone_numbers(*)')
          .eq('id', id)
          .single()

      if(error){
        console.log('Error retreiving veterinarian profile: ', error);
        throw new Error(error.message)
      }
      return data;
    }
  })
};


export const useCreateVetPhoneNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({vetId, data}:{vetId: string | number, data: any}){
      const { error, data: newPhoneNumber }= await supabase
        .from('phone_numbers')
        .insert([
          {...data}
        ])
        .select()
        .single();

      if(error){
        console.log('Error creating new Vet PhoneNumber: ', error);
        throw new Error(error.message)
      }
      
      return newPhoneNumber;
    },
    async onSuccess(successData, data) {
        // // insert new phone number id into appropriate table      
        await supabase.from('veterinarians').update({phone_id: successData.id}).eq('id', data.vetId).select().single()
        // //  update profile query
        await queryClient.invalidateQueries({queryKey: ['veterinarian', data.vetId]})
    },
    onError(error) {
      console.log('Error: ', error);
    }
  })
};

export const useUpdateVeterianrainPhoneNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({vetId, phoneId, PhoneData}:{vetId: string | number, phoneId: number, PhoneData: TablesUpdate<'phone_numbers'>}){
      const { error, data: updatedAddress } = await supabase
        .from('phone_numbers')
        .update(PhoneData)
        .eq('id', phoneId)
        .select()
        .single();
      
      if(error){
        console.log('Error updateing Vet Phone Number: ', error);
        throw new Error(error.message)
      }
      
      return updatedAddress;
    },
    async onSuccess(_, data) {
      await queryClient.invalidateQueries({queryKey: ['veterinarian', data.vetId]})
    },
    onError(error) {
      console.log('Error: ', error);
    }
  })
};
