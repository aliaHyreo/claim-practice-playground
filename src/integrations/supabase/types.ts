export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      claim_forms: {
        Row: {
          claim_line_code_image: string | null
          claim_line_code_system: string | null
          created_at: string
          dcn: string
          dob: string
          eligibility_validation: string[] | null
          id: string
          patient_name: string
          service_date_from: string | null
          service_date_to: string | null
          zip_code: string | null
        }
        Insert: {
          claim_line_code_image?: string | null
          claim_line_code_system?: string | null
          created_at?: string
          dcn: string
          dob: string
          eligibility_validation?: string[] | null
          id?: string
          patient_name: string
          service_date_from?: string | null
          service_date_to?: string | null
          zip_code?: string | null
        }
        Update: {
          claim_line_code_image?: string | null
          claim_line_code_system?: string | null
          created_at?: string
          dcn?: string
          dob?: string
          eligibility_validation?: string[] | null
          id?: string
          patient_name?: string
          service_date_from?: string | null
          service_date_to?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      claim_lines: {
        Row: {
          billed: number | null
          claim_id: string | null
          created_at: string
          diagnosis: string | null
          id: string
          line_no: number | null
          modifiers: string[] | null
          pos: string | null
          procedure_code: string | null
          service: string | null
          service_from_date: string | null
          service_to_date: string | null
          units: number | null
        }
        Insert: {
          billed?: number | null
          claim_id?: string | null
          created_at?: string
          diagnosis?: string | null
          id?: string
          line_no?: number | null
          modifiers?: string[] | null
          pos?: string | null
          procedure_code?: string | null
          service?: string | null
          service_from_date?: string | null
          service_to_date?: string | null
          units?: number | null
        }
        Update: {
          billed?: number | null
          claim_id?: string | null
          created_at?: string
          diagnosis?: string | null
          id?: string
          line_no?: number | null
          modifiers?: string[] | null
          pos?: string | null
          procedure_code?: string | null
          service?: string | null
          service_from_date?: string | null
          service_to_date?: string | null
          units?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "claim_lines_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
        ]
      }
      claims: {
        Row: {
          action_code: string | null
          allowed: number | null
          billed: number | null
          contract_type: string | null
          created_at: string
          dcn: string
          dob: string | null
          edits: string[] | null
          erisa: string | null
          id: string
          last_name: string | null
          member_code: string | null
          paid: number | null
          pcp: string | null
          relationship: string | null
          scenario_type: string | null
          sex: string | null
          status: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          action_code?: string | null
          allowed?: number | null
          billed?: number | null
          contract_type?: string | null
          created_at?: string
          dcn: string
          dob?: string | null
          edits?: string[] | null
          erisa?: string | null
          id?: string
          last_name?: string | null
          member_code?: string | null
          paid?: number | null
          pcp?: string | null
          relationship?: string | null
          scenario_type?: string | null
          sex?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          action_code?: string | null
          allowed?: number | null
          billed?: number | null
          contract_type?: string | null
          created_at?: string
          dcn?: string
          dob?: string | null
          edits?: string[] | null
          erisa?: string | null
          id?: string
          last_name?: string | null
          member_code?: string | null
          paid?: number | null
          pcp?: string | null
          relationship?: string | null
          scenario_type?: string | null
          sex?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          address: string | null
          city: string | null
          contract_type: string | null
          created_at: string
          detail_contract_code: string | null
          dob: string
          effective_date: string | null
          end_date: string | null
          erisa: string | null
          first_name: string
          group_contract: string | null
          group_id: string | null
          group_name: string | null
          hcid: string | null
          id: string
          last_name: string
          member_code: string | null
          member_prefix: string | null
          middle_name: string | null
          network_id: string | null
          network_name: string | null
          pcp: string | null
          pcp_relationship: string | null
          pcp_state: string | null
          prefix: string | null
          product: string | null
          program_code: string | null
          relationship: string | null
          sex: string | null
          state: string | null
          subscriber_id: string | null
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          contract_type?: string | null
          created_at?: string
          detail_contract_code?: string | null
          dob: string
          effective_date?: string | null
          end_date?: string | null
          erisa?: string | null
          first_name: string
          group_contract?: string | null
          group_id?: string | null
          group_name?: string | null
          hcid?: string | null
          id?: string
          last_name: string
          member_code?: string | null
          member_prefix?: string | null
          middle_name?: string | null
          network_id?: string | null
          network_name?: string | null
          pcp?: string | null
          pcp_relationship?: string | null
          pcp_state?: string | null
          prefix?: string | null
          product?: string | null
          program_code?: string | null
          relationship?: string | null
          sex?: string | null
          state?: string | null
          subscriber_id?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          contract_type?: string | null
          created_at?: string
          detail_contract_code?: string | null
          dob?: string
          effective_date?: string | null
          end_date?: string | null
          erisa?: string | null
          first_name?: string
          group_contract?: string | null
          group_id?: string | null
          group_name?: string | null
          hcid?: string | null
          id?: string
          last_name?: string
          member_code?: string | null
          member_prefix?: string | null
          middle_name?: string | null
          network_id?: string | null
          network_name?: string | null
          pcp?: string | null
          pcp_relationship?: string | null
          pcp_state?: string | null
          prefix?: string | null
          product?: string | null
          program_code?: string | null
          relationship?: string | null
          sex?: string | null
          state?: string | null
          subscriber_id?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      providers: {
        Row: {
          address5: string | null
          alternate_facility_npi: string | null
          bha_provider_indicator: string | null
          billing_name2: string | null
          billing_npi: string | null
          billing_tax_id: string | null
          created_at: string
          emergency_pricing_ind: string | null
          facility_type: string | null
          id: string
          license_number: string | null
          location_code: string | null
          medicare_id: string | null
          national_state: string | null
          network_option: string | null
          npi8: string | null
          nsb_indicator: string | null
          pricing_state: string | null
          pricing_zip: string | null
          provider_epin: string | null
          provider_epin4: string | null
          provider_sps: string | null
          provider_sps3: string | null
          referring_npi7: string | null
          referring_physician: string | null
          rendering_address: string | null
          rendering_name: string | null
          rendering_npi: string | null
          service_facility_tier: string | null
          service_provider: string | null
          specialty: string | null
          taxonomy: string | null
          taxonomy6: string | null
        }
        Insert: {
          address5?: string | null
          alternate_facility_npi?: string | null
          bha_provider_indicator?: string | null
          billing_name2?: string | null
          billing_npi?: string | null
          billing_tax_id?: string | null
          created_at?: string
          emergency_pricing_ind?: string | null
          facility_type?: string | null
          id?: string
          license_number?: string | null
          location_code?: string | null
          medicare_id?: string | null
          national_state?: string | null
          network_option?: string | null
          npi8?: string | null
          nsb_indicator?: string | null
          pricing_state?: string | null
          pricing_zip?: string | null
          provider_epin?: string | null
          provider_epin4?: string | null
          provider_sps?: string | null
          provider_sps3?: string | null
          referring_npi7?: string | null
          referring_physician?: string | null
          rendering_address?: string | null
          rendering_name?: string | null
          rendering_npi?: string | null
          service_facility_tier?: string | null
          service_provider?: string | null
          specialty?: string | null
          taxonomy?: string | null
          taxonomy6?: string | null
        }
        Update: {
          address5?: string | null
          alternate_facility_npi?: string | null
          bha_provider_indicator?: string | null
          billing_name2?: string | null
          billing_npi?: string | null
          billing_tax_id?: string | null
          created_at?: string
          emergency_pricing_ind?: string | null
          facility_type?: string | null
          id?: string
          license_number?: string | null
          location_code?: string | null
          medicare_id?: string | null
          national_state?: string | null
          network_option?: string | null
          npi8?: string | null
          nsb_indicator?: string | null
          pricing_state?: string | null
          pricing_zip?: string | null
          provider_epin?: string | null
          provider_epin4?: string | null
          provider_sps?: string | null
          provider_sps3?: string | null
          referring_npi7?: string | null
          referring_physician?: string | null
          rendering_address?: string | null
          rendering_name?: string | null
          rendering_npi?: string | null
          service_facility_tier?: string | null
          service_provider?: string | null
          specialty?: string | null
          taxonomy?: string | null
          taxonomy6?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
