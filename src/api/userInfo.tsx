import { supabase } from '@/util/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetProfile = (id:string) => {
  return useQuery({
    queryKey: ['userProfile', id],
    queryFn: async () => {
      const { data, error } = await 
        supabase
          .from('users')
          .select('id, first_name, last_name, avatar_url, emergency_contact')
          .eq('id', id)
          .single()
      if(error){
        console.log('Error retreiving profile: ', error);
        throw new Error(error.message)
      }
      
      return data;
    }
  })
};


export const useUpdateUserContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any){
      const { error, data: updatedProfile } = await supabase
        .from('users')
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
          emergency_contact: data.emergency_contact,
        })
        .eq('id', data.id)
        .select()
        .single();
      
      if(error){
        console.log('Error updateing User Profile: ', error);
        throw new Error(error.message)
      }
      
      return updatedProfile;
    },
    async onSuccess(_, data) {
      await queryClient.invalidateQueries({queryKey: ['userProfile', data.id]})
    },
    onError(error) {
      console.log('Error: ', error);
    }
  })
};