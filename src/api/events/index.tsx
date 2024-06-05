import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TablesInsert } from '@/database.types'
import { supabase } from "@/util/supabase";
import dayjs from "dayjs";


export const useClientFutureEvents = ({ clientID }: { clientID: string} ) => {

  return useQuery({
    queryKey: ['clientFutureEvents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*, employee:users!public_events_employee_id_fkey(first_name, last_name, avatar_url)')
        .eq('client_id', clientID )
        .gte('event_date', dayjs())
        // .is('completed_at', null)
        .order('event_date', {ascending: true})
        .order('event_time', {ascending: false})
        // Order by Times will need to be reworked by implimenting Event_Times table      

        if( error ) {
          console.log('Error fetching client future events');
          throw new Error(error.message)
      }
      return data
    }
  })
};

export const useClientPastEvents = ({ clientID } : {clientID: string}) => {

  return useQuery({
    queryKey: ['clientPastEvents'],
    queryFn: async () => {
      const { error: EventError, data: EventData } = await supabase
        .from('events')
        .select('*, employee:users!public_events_employee_id_fkey(first_name, last_name, avatar_url)')
        .eq('client_id', clientID)
        .not('checked_in_at', 'is', null)
        .lte('event_date', dayjs())
        .order('event_date', {ascending: false})
        .order('completed_at', {ascending: false})
        .order('event_time', {ascending: false})
        // Order by Times will need to be reworked by implimenting Event_Times table  

      if(EventError) {
        console.log('Error fetching client past events', EventError);
        throw new Error(EventError.message)
      }

      return EventData
    }
  })
}


export const useCreateOneEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: TablesInsert<'events'>) {
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
        });
        if(error){
          throw new Error(error.message)
        }
    },
    async onSuccess() {
      // 
      // 
      // reset dashboard queries
      await queryClient.invalidateQueries({queryKey: ['clientFutureEvents']})
      // 
      // 
    },
    onError(error){
      console.log('Error creating event', {error});
    },
  })
};