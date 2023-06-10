export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      TestTable: {
        Row: {
          created_at: string | null
          id: number
          TestColumn: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          TestColumn?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          TestColumn?: string | null
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
