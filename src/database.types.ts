export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          directions: string | null
          id: number
          state: string | null
          zipcode: number | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          directions?: string | null
          id?: number
          state?: string | null
          zipcode?: number | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          directions?: string | null
          id?: number
          state?: string | null
          zipcode?: number | null
        }
        Relationships: []
      }
      event_times: {
        Row: {
          id: number
          period: string
          time_range: string | null
        }
        Insert: {
          id?: number
          period: string
          time_range?: string | null
        }
        Update: {
          id?: number
          period?: string
          time_range?: string | null
        }
        Relationships: []
      }
      event_types: {
        Row: {
          id: number
          type: string
        }
        Insert: {
          id?: number
          type: string
        }
        Update: {
          id?: number
          type?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          checked_in_at: string | null
          client_id: string | null
          client_viewed_at: string | null
          completed_at: string | null
          created_at: string
          employee_id: string | null
          event_date: string | null
          event_time_id: number | null
          event_type_id: number | null
          id: number
          important_notes: string | null
          location_id: number | null
          manager_viewed_at: string | null
          notes: string | null
          pet_ids: number[] | null
          photo_public_urls: string[] | null
          photo_urls: string[] | null
          updated_at: string | null
        }
        Insert: {
          checked_in_at?: string | null
          client_id?: string | null
          client_viewed_at?: string | null
          completed_at?: string | null
          created_at?: string
          employee_id?: string | null
          event_date?: string | null
          event_time_id?: number | null
          event_type_id?: number | null
          id?: number
          important_notes?: string | null
          location_id?: number | null
          manager_viewed_at?: string | null
          notes?: string | null
          pet_ids?: number[] | null
          photo_public_urls?: string[] | null
          photo_urls?: string[] | null
          updated_at?: string | null
        }
        Update: {
          checked_in_at?: string | null
          client_id?: string | null
          client_viewed_at?: string | null
          completed_at?: string | null
          created_at?: string
          employee_id?: string | null
          event_date?: string | null
          event_time_id?: number | null
          event_type_id?: number | null
          id?: number
          important_notes?: string | null
          location_id?: number | null
          manager_viewed_at?: string | null
          notes?: string | null
          pet_ids?: number[] | null
          photo_public_urls?: string[] | null
          photo_urls?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_events_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_events_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_events_event_time_id_fkey"
            columns: ["event_time_id"]
            isOneToOne: false
            referencedRelation: "event_times"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_events_event_type_id_fkey"
            columns: ["event_type_id"]
            isOneToOne: false
            referencedRelation: "event_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_events_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      home_info: {
        Row: {
          access_parking: string | null
          alarm: boolean | null
          cleaning_supplies: string | null
          created_at: string
          door_lockbox_code: string | null
          house_notes: string | null
          id: number
          other_notes: string | null
          others_with_access: string | null
          pet_carriers: string | null
          pet_supplies: string | null
          pet_waste: string | null
          trails_walking_route: string | null
          trash_recycling: string | null
          updated_at: string | null
        }
        Insert: {
          access_parking?: string | null
          alarm?: boolean | null
          cleaning_supplies?: string | null
          created_at?: string
          door_lockbox_code?: string | null
          house_notes?: string | null
          id?: number
          other_notes?: string | null
          others_with_access?: string | null
          pet_carriers?: string | null
          pet_supplies?: string | null
          pet_waste?: string | null
          trails_walking_route?: string | null
          trash_recycling?: string | null
          updated_at?: string | null
        }
        Update: {
          access_parking?: string | null
          alarm?: boolean | null
          cleaning_supplies?: string | null
          created_at?: string
          door_lockbox_code?: string | null
          house_notes?: string | null
          id?: number
          other_notes?: string | null
          others_with_access?: string | null
          pet_carriers?: string | null
          pet_supplies?: string | null
          pet_waste?: string | null
          trails_walking_route?: string | null
          trash_recycling?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pets: {
        Row: {
          age: string | null
          breed: string | null
          color: string | null
          created_at: string
          dietary_needs: boolean | null
          feeding_food_brand: string | null
          gender: string | null
          id: number
          medical_needs: boolean | null
          name: string | null
          notes: string | null
          other_needs: boolean | null
          owner_id: string | null
          personality: string | null
          pet_stays: Database["public"]["Enums"]["pet_locaiton"] | null
          photo_url: string | null
          routine: string | null
          spayed_neutered: boolean | null
          special_needs: string | null
          type: string | null
          updated_at: string | null
          weight: number | null
        }
        Insert: {
          age?: string | null
          breed?: string | null
          color?: string | null
          created_at?: string
          dietary_needs?: boolean | null
          feeding_food_brand?: string | null
          gender?: string | null
          id?: number
          medical_needs?: boolean | null
          name?: string | null
          notes?: string | null
          other_needs?: boolean | null
          owner_id?: string | null
          personality?: string | null
          pet_stays?: Database["public"]["Enums"]["pet_locaiton"] | null
          photo_url?: string | null
          routine?: string | null
          spayed_neutered?: boolean | null
          special_needs?: string | null
          type?: string | null
          updated_at?: string | null
          weight?: number | null
        }
        Update: {
          age?: string | null
          breed?: string | null
          color?: string | null
          created_at?: string
          dietary_needs?: boolean | null
          feeding_food_brand?: string | null
          gender?: string | null
          id?: number
          medical_needs?: boolean | null
          name?: string | null
          notes?: string | null
          other_needs?: boolean | null
          owner_id?: string | null
          personality?: string | null
          pet_stays?: Database["public"]["Enums"]["pet_locaiton"] | null
          photo_url?: string | null
          routine?: string | null
          spayed_neutered?: boolean | null
          special_needs?: string | null
          type?: string | null
          updated_at?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_pets_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      phone_numbers: {
        Row: {
          created_at: string
          id: number
          number: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          number?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          number?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_phone_numbers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["app_permission"]
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          address_id: number | null
          avatar_url: string | null
          contact_email: string | null
          created_at: string | null
          emergency_contact: string | null
          first_name: string | null
          home_info_id: number | null
          id: string
          last_name: string | null
          updated_at: string | null
          username: string | null
          veterinary_id: number | null
        }
        Insert: {
          address_id?: number | null
          avatar_url?: string | null
          contact_email?: string | null
          created_at?: string | null
          emergency_contact?: string | null
          first_name?: string | null
          home_info_id?: number | null
          id: string
          last_name?: string | null
          updated_at?: string | null
          username?: string | null
          veterinary_id?: number | null
        }
        Update: {
          address_id?: number | null
          avatar_url?: string | null
          contact_email?: string | null
          created_at?: string | null
          emergency_contact?: string | null
          first_name?: string | null
          home_info_id?: number | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
          username?: string | null
          veterinary_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_users_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_users_home_info_id_fkey"
            columns: ["home_info_id"]
            isOneToOne: false
            referencedRelation: "home_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_users_veterinary_id_fkey"
            columns: ["veterinary_id"]
            isOneToOne: false
            referencedRelation: "veterinarians"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      veterinarians: {
        Row: {
          address_id: number | null
          created_at: string
          id: number
          name: string | null
          phone_id: number | null
          verified: boolean | null
        }
        Insert: {
          address_id?: number | null
          created_at?: string
          id?: number
          name?: string | null
          phone_id?: number | null
          verified?: boolean | null
        }
        Update: {
          address_id?: number | null
          created_at?: string
          id?: number
          name?: string | null
          phone_id?: number | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "public_veterinarians_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_veterinarians_phone_id_fkey"
            columns: ["phone_id"]
            isOneToOne: false
            referencedRelation: "phone_numbers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      custom_access_token_hook1: {
        Args: {
          event: Json
        }
        Returns: Json
      }
    }
    Enums: {
      app_permission: "event.delete" | "event.update" | "user.change_role"
      app_role: "client" | "employee" | "manager" | "owner"
      pet_locaiton: "Indoor only" | "Outdoor only" | "Indoor and Outdoor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
