import { supabase } from '@/util/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TablesUpdate } from '@/database.types'

export const useGetProfile = (id:string) => {
  return useQuery({
    queryKey: ['userProfile', id],
    queryFn: async () => {
      const { data, error } = await 
        supabase
          .from('users')
          .select('id, first_name, last_name, avatar_url, emergency_contact, addresses(*), home_info(*), phone_numbers(*)')
          .eq('id', id)
          .order('id', {ascending: false, referencedTable: 'phone_numbers'})
          .single()
      if(error){
        console.log('Error retreiving profile: ', error);
        throw new Error(error.message)
      }
      
      return data;
    }
  })
};


export const useSimpleUserData = (id: string) => {
  return useQuery({
    queryKey: ['simpleUserData', id],
    queryFn: async () => {
      const { data, error } = await supabase.
        from('users')
        .select('id, first_name, last_name, addresses(id)')
        .eq('id', id)
        .single();
      
      if( error ) {
        console.log('Error getting SimpleUserData', {error});
        throw new Error(error.message)
      }
      return data;
    }
  })
}

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
          updated_at: ((new Date()).toISOString()).toLocaleString()
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

export const useUpdateUsersAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any){
      const { error, data: updatedAvatar } = await supabase
        .from('users')
        .update({
          avatar_url: data.avatar_url,
        })
        .eq('id', data.id)
        .select()
        .single();
      
      if(error){
        console.log('Error updateing User Avatar Path: ', error);
        throw new Error(error.message)
      }
      
      return updatedAvatar;
    },
    async onSuccess(_, data) {
      await queryClient.invalidateQueries({queryKey: ['userProfile', data.id]})
    },
    onError(error) {
      console.log('Error: ', error);
    }
  })
};

export const useCreateUsersAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any){
      const { error, data: addressData }= await supabase
        .from('addresses')
        .insert([{
          address: data.address,
          city: data.city,
          state: data.city,
          zipcode: data.zipcode,
          directions: data.directions,
        }])
        .select()
        .single();

      if(error){
        console.log('Error creating new address: ', error);
        throw new Error(error.message)
      }
      
      return addressData;
    },
    async onSuccess(successData, data) {
      // insert new address id into users table      
      await supabase.from('users').update({address_id: successData.id}).eq('id', data.userId).select().single()
      //  update profile query
      await queryClient.invalidateQueries({queryKey: ['userProfile', data.id]})
      await queryClient.invalidateQueries({queryKey: ['simpleUserData', data.id]})
    },
    onError(error) {
      console.log('Error: ', error);
    }
  })
};

export const useUpdateUsersAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({userId, addressId, updatedAddressFields}:{userId: string, addressId: number, updatedAddressFields: TablesUpdate<'addresses'>}){
      const { error, data: updatedAddress } = await supabase
        .from('addresses')
        .update({...updatedAddressFields, updated_at: ((new Date()).toISOString()).toLocaleString()})
        .eq('id', addressId)
        .select()
        .single();
      
      if(error){
        console.log('Error updateing User Address: ', error);
        throw new Error(error.message)
      }
      
      return updatedAddress;
    },
    async onSuccess(_, data) {
      await queryClient.invalidateQueries({queryKey: ['userProfile', data.userId]})
      await queryClient.invalidateQueries({queryKey: ['simpleUserData', data.userId]})
    },
    onError(error) {
      console.log('Error: ', error);
    }
  })
};

export const useCreateHomeInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({userId, data}:{userId: string, data: any}){
      const { error, data: HomeInfo }= await supabase
        .from('home_info')
        .insert([
          {...data}
        ])
        .select()
        .single();

      if(error){
        console.log('Error creating new Home Info: ', error);
        throw new Error(error.message)
      }
      
      return HomeInfo;
    },
    async onSuccess(successData, data) {
      // insert new address id into users table      
      await supabase.from('users').update({home_info_id: successData.id}).eq('id', data.userId).select().single()
      //  update profile query
      await queryClient.invalidateQueries({queryKey: ['userProfile', data.userId]})
    },
    onError(error) {
      console.log('Error: ', error);
    }
  })
};

export const useUpdateHomeInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({userId, HomeInfoId, updatedHomeInfoFields}:{userId: string, HomeInfoId: number, updatedHomeInfoFields: TablesUpdate<'addresses'>}){
      const { error, data: updatedAddress } = await supabase
        .from('home_info')
        .update(updatedHomeInfoFields)
        .eq('id', HomeInfoId)
        .select()
        .single();
      
      if(error){
        console.log('Error updateing Home Info: ', error);
        throw new Error(error.message)
      }
      
      return updatedAddress;
    },
    async onSuccess(_, data) {
      await queryClient.invalidateQueries({queryKey: ['userProfile', data.userId]})
    },
    onError(error) {
      console.log('Error: ', error);
    }
  })
};

export const useCreateUserPhoneNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({userId, data}:{userId: string, data: any}){
      const { error, data: newPhoneNumber }= await supabase
        .from('phone_numbers')
        .insert([
          {...data, user_id:userId}
        ])
        .select()
        .single();

      if(error){
        console.log('Error creating new PhoneNumber: ', error);
        throw new Error(error.message)
      }
      
      return newPhoneNumber;
    },
    async onSuccess(_, data) {
      //  update profile query
      await queryClient.invalidateQueries({queryKey: ['userProfile', data.userId]})
    },
    onError(error) {
      console.log('Error: ', error);
    }
  })
};

export const useUpdateUserPhoneNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({userId, phoneId, updatedPhoneFields}:{userId: string, phoneId: number, updatedPhoneFields: TablesUpdate<'phone_numbers'>}){
      const { error, data: updatedAddress } = await supabase
        .from('phone_numbers')
        .update(updatedPhoneFields)
        .eq('id', phoneId)
        .select()
        .single();
      
      if(error){
        console.log('Error updateing Users Phone Number: ', error);
        throw new Error(error.message)
      }
      
      return updatedAddress;
    },
    async onSuccess(_, data) {
      await queryClient.invalidateQueries({queryKey: ['userProfile', data.userId]})
    },
    onError(error) {
      console.log('Error: ', error);
    }
  })
};

export const useDeleteUserPhoneNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({userId, phoneId}:{userId: string, phoneId: number}) {
      const {error} = await supabase.from('phone_numbers').delete().eq('id', phoneId);

      if (error) {
        throw new Error(error.message);
      }

    },
    async onSuccess(_,data) {
      await queryClient.invalidateQueries({queryKey: ['userProfile', data.userId ]});  
    },
  })
};