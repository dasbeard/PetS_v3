import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TablesInsert } from '@/database.types'
import { supabase } from "@/util/supabase";

export const useCreateOneEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: TablesInsert<'events'> ) {
      const { data: newEvent, error } = await supabase
        .from('events')
        .insert({
          // created_at
          client_id: data.client_id,
          event_type: data.event_type,
          event_date: data.event_date,
          event_time: data.event_time,
          location_id: data.location_id,
          pet_ids: data.pet_ids,
        })
        ;
        if(error){
          throw new Error(error.message)
        }
    },
    async onSuccess() {
      // reset dashboard queries
    },
    onError(error){
      console.log('Error creating event', {error});
    },
  })
};