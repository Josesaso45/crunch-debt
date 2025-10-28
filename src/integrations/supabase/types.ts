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
      clientes: {
        Row: {
          activo: boolean | null
          codigo: string
          created_at: string | null
          direccion: string | null
          email: string | null
          id: string
          limite_credito: number | null
          nivel_riesgo: string | null
          razon_social: string
          ruc: string
          telefono: string | null
          updated_at: string | null
        }
        Insert: {
          activo?: boolean | null
          codigo: string
          created_at?: string | null
          direccion?: string | null
          email?: string | null
          id?: string
          limite_credito?: number | null
          nivel_riesgo?: string | null
          razon_social: string
          ruc: string
          telefono?: string | null
          updated_at?: string | null
        }
        Update: {
          activo?: boolean | null
          codigo?: string
          created_at?: string | null
          direccion?: string | null
          email?: string | null
          id?: string
          limite_credito?: number | null
          nivel_riesgo?: string | null
          razon_social?: string
          ruc?: string
          telefono?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      entidades_financieras: {
        Row: {
          activo: boolean | null
          codigo: string
          contacto: string | null
          created_at: string | null
          email: string | null
          id: string
          nombre: string
          telefono: string | null
          tipo: string | null
          updated_at: string | null
        }
        Insert: {
          activo?: boolean | null
          codigo: string
          contacto?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          nombre: string
          telefono?: string | null
          tipo?: string | null
          updated_at?: string | null
        }
        Update: {
          activo?: boolean | null
          codigo?: string
          contacto?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          nombre?: string
          telefono?: string | null
          tipo?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      facturas: {
        Row: {
          cliente_id: string
          condicion_pago: string | null
          created_at: string | null
          estado: string | null
          fecha: string
          fecha_vencimiento: string | null
          id: string
          igv: number
          moneda: string | null
          numero: string
          observaciones: string | null
          pedido_id: string | null
          saldo_pendiente: number
          serie: string
          subtotal: number
          total: number
          updated_at: string | null
          vendedor_id: string
        }
        Insert: {
          cliente_id: string
          condicion_pago?: string | null
          created_at?: string | null
          estado?: string | null
          fecha: string
          fecha_vencimiento?: string | null
          id?: string
          igv?: number
          moneda?: string | null
          numero: string
          observaciones?: string | null
          pedido_id?: string | null
          saldo_pendiente?: number
          serie: string
          subtotal?: number
          total?: number
          updated_at?: string | null
          vendedor_id: string
        }
        Update: {
          cliente_id?: string
          condicion_pago?: string | null
          created_at?: string | null
          estado?: string | null
          fecha?: string
          fecha_vencimiento?: string | null
          id?: string
          igv?: number
          moneda?: string | null
          numero?: string
          observaciones?: string | null
          pedido_id?: string | null
          saldo_pendiente?: number
          serie?: string
          subtotal?: number
          total?: number
          updated_at?: string | null
          vendedor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "facturas_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "facturas_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "facturas_vendedor_id_fkey"
            columns: ["vendedor_id"]
            isOneToOne: false
            referencedRelation: "vendedores"
            referencedColumns: ["id"]
          },
        ]
      }
      letras: {
        Row: {
          cliente_id: string
          created_at: string | null
          entidad_financiera_id: string | null
          estado: string | null
          factura_id: string
          fecha_aceptacion: string | null
          fecha_descuento: string | null
          fecha_emision: string
          fecha_pago: string | null
          fecha_vencimiento: string
          id: string
          importe: number
          monto_descuento: number | null
          numero_unico: string
          observaciones: string | null
          tasa_descuento: number | null
          updated_at: string | null
        }
        Insert: {
          cliente_id: string
          created_at?: string | null
          entidad_financiera_id?: string | null
          estado?: string | null
          factura_id: string
          fecha_aceptacion?: string | null
          fecha_descuento?: string | null
          fecha_emision: string
          fecha_pago?: string | null
          fecha_vencimiento: string
          id?: string
          importe: number
          monto_descuento?: number | null
          numero_unico: string
          observaciones?: string | null
          tasa_descuento?: number | null
          updated_at?: string | null
        }
        Update: {
          cliente_id?: string
          created_at?: string | null
          entidad_financiera_id?: string | null
          estado?: string | null
          factura_id?: string
          fecha_aceptacion?: string | null
          fecha_descuento?: string | null
          fecha_emision?: string
          fecha_pago?: string | null
          fecha_vencimiento?: string
          id?: string
          importe?: number
          monto_descuento?: number | null
          numero_unico?: string
          observaciones?: string | null
          tasa_descuento?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "letras_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "letras_entidad_financiera_id_fkey"
            columns: ["entidad_financiera_id"]
            isOneToOne: false
            referencedRelation: "entidades_financieras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "letras_factura_id_fkey"
            columns: ["factura_id"]
            isOneToOne: false
            referencedRelation: "facturas"
            referencedColumns: ["id"]
          },
        ]
      }
      pagos: {
        Row: {
          banco: string | null
          cliente_id: string
          created_at: string | null
          estado: string | null
          factura_id: string | null
          fecha: string
          id: string
          letra_id: string | null
          metodo_pago: string | null
          monto: number
          numero: string
          numero_operacion: string | null
          observaciones: string | null
          updated_at: string | null
        }
        Insert: {
          banco?: string | null
          cliente_id: string
          created_at?: string | null
          estado?: string | null
          factura_id?: string | null
          fecha: string
          id?: string
          letra_id?: string | null
          metodo_pago?: string | null
          monto: number
          numero: string
          numero_operacion?: string | null
          observaciones?: string | null
          updated_at?: string | null
        }
        Update: {
          banco?: string | null
          cliente_id?: string
          created_at?: string | null
          estado?: string | null
          factura_id?: string | null
          fecha?: string
          id?: string
          letra_id?: string | null
          metodo_pago?: string | null
          monto?: number
          numero?: string
          numero_operacion?: string | null
          observaciones?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pagos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pagos_factura_id_fkey"
            columns: ["factura_id"]
            isOneToOne: false
            referencedRelation: "facturas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pagos_letra_id_fkey"
            columns: ["letra_id"]
            isOneToOne: false
            referencedRelation: "letras"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos: {
        Row: {
          cliente_id: string
          condicion_pago: string | null
          created_at: string | null
          dias_credito: number | null
          estado: string | null
          fecha: string
          id: string
          igv: number
          numero: string
          observaciones: string | null
          subtotal: number
          total: number
          updated_at: string | null
          vendedor_id: string
        }
        Insert: {
          cliente_id: string
          condicion_pago?: string | null
          created_at?: string | null
          dias_credito?: number | null
          estado?: string | null
          fecha: string
          id?: string
          igv?: number
          numero: string
          observaciones?: string | null
          subtotal?: number
          total?: number
          updated_at?: string | null
          vendedor_id: string
        }
        Update: {
          cliente_id?: string
          condicion_pago?: string | null
          created_at?: string | null
          dias_credito?: number | null
          estado?: string | null
          fecha?: string
          id?: string
          igv?: number
          numero?: string
          observaciones?: string | null
          subtotal?: number
          total?: number
          updated_at?: string | null
          vendedor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_vendedor_id_fkey"
            columns: ["vendedor_id"]
            isOneToOne: false
            referencedRelation: "vendedores"
            referencedColumns: ["id"]
          },
        ]
      }
      planillas_letras: {
        Row: {
          created_at: string | null
          entidad_financiera_id: string
          estado: string | null
          fecha_envio: string
          id: string
          importe_total: number | null
          numero: string
          observaciones: string | null
          total_letras: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          entidad_financiera_id: string
          estado?: string | null
          fecha_envio: string
          id?: string
          importe_total?: number | null
          numero: string
          observaciones?: string | null
          total_letras?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          entidad_financiera_id?: string
          estado?: string | null
          fecha_envio?: string
          id?: string
          importe_total?: number | null
          numero?: string
          observaciones?: string | null
          total_letras?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "planillas_letras_entidad_financiera_id_fkey"
            columns: ["entidad_financiera_id"]
            isOneToOne: false
            referencedRelation: "entidades_financieras"
            referencedColumns: ["id"]
          },
        ]
      }
      planillas_letras_detalle: {
        Row: {
          created_at: string | null
          id: string
          letra_id: string
          planilla_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          letra_id: string
          planilla_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          letra_id?: string
          planilla_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "planillas_letras_detalle_letra_id_fkey"
            columns: ["letra_id"]
            isOneToOne: false
            referencedRelation: "letras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "planillas_letras_detalle_planilla_id_fkey"
            columns: ["planilla_id"]
            isOneToOne: false
            referencedRelation: "planillas_letras"
            referencedColumns: ["id"]
          },
        ]
      }
      vendedores: {
        Row: {
          activo: boolean | null
          codigo: string
          created_at: string | null
          email: string | null
          id: string
          nombre: string
          telefono: string | null
          updated_at: string | null
        }
        Insert: {
          activo?: boolean | null
          codigo: string
          created_at?: string | null
          email?: string | null
          id?: string
          nombre: string
          telefono?: string | null
          updated_at?: string | null
        }
        Update: {
          activo?: boolean | null
          codigo?: string
          created_at?: string | null
          email?: string | null
          id?: string
          nombre?: string
          telefono?: string | null
          updated_at?: string | null
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
