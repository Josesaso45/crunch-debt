-- =====================================================
-- SCHEMA DE GESTIÓN DE COBRANZAS
-- =====================================================

-- TABLAS
CREATE TABLE IF NOT EXISTS public.vendedores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(20) UNIQUE NOT NULL,
  nombre VARCHAR(200) NOT NULL,
  email VARCHAR(100),
  telefono VARCHAR(20),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(20) UNIQUE NOT NULL,
  razon_social VARCHAR(300) NOT NULL,
  ruc VARCHAR(11) UNIQUE NOT NULL,
  direccion TEXT,
  email VARCHAR(100),
  telefono VARCHAR(20),
  nivel_riesgo VARCHAR(10) CHECK (nivel_riesgo IN ('Bajo', 'Medio', 'Alto')) DEFAULT 'Medio',
  limite_credito DECIMAL(12,2) DEFAULT 0,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.entidades_financieras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(20) UNIQUE NOT NULL,
  nombre VARCHAR(200) NOT NULL,
  tipo VARCHAR(50),
  contacto VARCHAR(200),
  email VARCHAR(100),
  telefono VARCHAR(20),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.pedidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero VARCHAR(50) UNIQUE NOT NULL,
  fecha DATE NOT NULL,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE RESTRICT NOT NULL,
  vendedor_id UUID REFERENCES public.vendedores(id) ON DELETE RESTRICT NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
  igv DECIMAL(12,2) NOT NULL DEFAULT 0,
  total DECIMAL(12,2) NOT NULL DEFAULT 0,
  condicion_pago VARCHAR(20) CHECK (condicion_pago IN ('Contado', 'Credito')) DEFAULT 'Contado',
  dias_credito INTEGER DEFAULT 0,
  estado VARCHAR(20) CHECK (estado IN ('Pendiente', 'Facturado', 'Anulado')) DEFAULT 'Pendiente',
  observaciones TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.facturas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero VARCHAR(50) UNIQUE NOT NULL,
  serie VARCHAR(10) NOT NULL,
  fecha DATE NOT NULL,
  fecha_vencimiento DATE,
  pedido_id UUID REFERENCES public.pedidos(id) ON DELETE RESTRICT,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE RESTRICT NOT NULL,
  vendedor_id UUID REFERENCES public.vendedores(id) ON DELETE RESTRICT NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
  igv DECIMAL(12,2) NOT NULL DEFAULT 0,
  total DECIMAL(12,2) NOT NULL DEFAULT 0,
  saldo_pendiente DECIMAL(12,2) NOT NULL DEFAULT 0,
  estado VARCHAR(20) CHECK (estado IN ('Pendiente', 'Pagada', 'Vencida', 'Anulada')) DEFAULT 'Pendiente',
  condicion_pago VARCHAR(20) CHECK (condicion_pago IN ('Contado', 'Credito')) DEFAULT 'Contado',
  moneda VARCHAR(3) DEFAULT 'PEN',
  observaciones TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.letras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_unico VARCHAR(50) UNIQUE NOT NULL,
  factura_id UUID REFERENCES public.facturas(id) ON DELETE RESTRICT NOT NULL,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE RESTRICT NOT NULL,
  entidad_financiera_id UUID REFERENCES public.entidades_financieras(id) ON DELETE SET NULL,
  importe DECIMAL(12,2) NOT NULL,
  fecha_emision DATE NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  fecha_aceptacion DATE,
  fecha_descuento DATE,
  fecha_pago DATE,
  estado VARCHAR(30) CHECK (estado IN ('Generada', 'Enviada a Cliente', 'Aceptada', 'En Cartera', 'En Cobranza', 'Descontada', 'Pagada', 'Protestada')) DEFAULT 'Generada',
  tasa_descuento DECIMAL(5,2),
  monto_descuento DECIMAL(12,2),
  observaciones TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.planillas_letras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero VARCHAR(50) UNIQUE NOT NULL,
  fecha_envio DATE NOT NULL,
  entidad_financiera_id UUID REFERENCES public.entidades_financieras(id) ON DELETE RESTRICT NOT NULL,
  total_letras INTEGER DEFAULT 0,
  importe_total DECIMAL(12,2) DEFAULT 0,
  estado VARCHAR(20) CHECK (estado IN ('Pendiente', 'Enviada', 'Recibida', 'Procesada')) DEFAULT 'Pendiente',
  observaciones TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.planillas_letras_detalle (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  planilla_id UUID REFERENCES public.planillas_letras(id) ON DELETE CASCADE NOT NULL,
  letra_id UUID REFERENCES public.letras(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(planilla_id, letra_id)
);

CREATE TABLE IF NOT EXISTS public.pagos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero VARCHAR(50) UNIQUE NOT NULL,
  fecha DATE NOT NULL,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE RESTRICT NOT NULL,
  factura_id UUID REFERENCES public.facturas(id) ON DELETE RESTRICT,
  letra_id UUID REFERENCES public.letras(id) ON DELETE RESTRICT,
  monto DECIMAL(12,2) NOT NULL,
  metodo_pago VARCHAR(30) CHECK (metodo_pago IN ('Efectivo', 'Transferencia', 'Cheque', 'Letra', 'Otro')) DEFAULT 'Transferencia',
  numero_operacion VARCHAR(100),
  banco VARCHAR(100),
  estado VARCHAR(20) CHECK (estado IN ('Pendiente', 'Confirmado', 'Conciliado', 'Anulado')) DEFAULT 'Pendiente',
  observaciones TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ÍNDICES
CREATE INDEX IF NOT EXISTS idx_facturas_cliente ON public.facturas(cliente_id);
CREATE INDEX IF NOT EXISTS idx_facturas_fecha ON public.facturas(fecha);
CREATE INDEX IF NOT EXISTS idx_facturas_estado ON public.facturas(estado);
CREATE INDEX IF NOT EXISTS idx_letras_cliente ON public.letras(cliente_id);
CREATE INDEX IF NOT EXISTS idx_letras_factura ON public.letras(factura_id);
CREATE INDEX IF NOT EXISTS idx_letras_vencimiento ON public.letras(fecha_vencimiento);
CREATE INDEX IF NOT EXISTS idx_letras_estado ON public.letras(estado);
CREATE INDEX IF NOT EXISTS idx_pagos_cliente ON public.pagos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_pagos_fecha ON public.pagos(fecha);

-- TRIGGERS
DROP TRIGGER IF EXISTS update_vendedores_updated_at ON public.vendedores;
CREATE TRIGGER update_vendedores_updated_at BEFORE UPDATE ON public.vendedores
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_clientes_updated_at ON public.clientes;
CREATE TRIGGER update_clientes_updated_at BEFORE UPDATE ON public.clientes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_entidades_financieras_updated_at ON public.entidades_financieras;
CREATE TRIGGER update_entidades_financieras_updated_at BEFORE UPDATE ON public.entidades_financieras
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_pedidos_updated_at ON public.pedidos;
CREATE TRIGGER update_pedidos_updated_at BEFORE UPDATE ON public.pedidos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_facturas_updated_at ON public.facturas;
CREATE TRIGGER update_facturas_updated_at BEFORE UPDATE ON public.facturas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_letras_updated_at ON public.letras;
CREATE TRIGGER update_letras_updated_at BEFORE UPDATE ON public.letras
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_planillas_letras_updated_at ON public.planillas_letras;
CREATE TRIGGER update_planillas_letras_updated_at BEFORE UPDATE ON public.planillas_letras
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_pagos_updated_at ON public.pagos;
CREATE TRIGGER update_pagos_updated_at BEFORE UPDATE ON public.pagos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS
ALTER TABLE public.vendedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entidades_financieras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.letras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planillas_letras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planillas_letras_detalle ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pagos ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS
DROP POLICY IF EXISTS "Allow public read vendedores" ON public.vendedores;
CREATE POLICY "Allow public read vendedores" ON public.vendedores FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read clientes" ON public.clientes;
CREATE POLICY "Allow public read clientes" ON public.clientes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read entidades" ON public.entidades_financieras;
CREATE POLICY "Allow public read entidades" ON public.entidades_financieras FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read pedidos" ON public.pedidos;
CREATE POLICY "Allow public read pedidos" ON public.pedidos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read facturas" ON public.facturas;
CREATE POLICY "Allow public read facturas" ON public.facturas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read letras" ON public.letras;
CREATE POLICY "Allow public read letras" ON public.letras FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read planillas" ON public.planillas_letras;
CREATE POLICY "Allow public read planillas" ON public.planillas_letras FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read planillas_detalle" ON public.planillas_letras_detalle;
CREATE POLICY "Allow public read planillas_detalle" ON public.planillas_letras_detalle FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read pagos" ON public.pagos;
CREATE POLICY "Allow public read pagos" ON public.pagos FOR SELECT USING (true);