-- =====================================================
-- SCHEMA DE GESTIÓN DE COBRANZAS (Versión MySQL)
-- Basado en el documento de Investigación Aplicada
-- =====================================================
-- 1. TABLA DE VENDEDORES
CREATE TABLE IF NOT EXISTS vendedores (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(20),
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- 2. TABLA DE CLIENTES
CREATE TABLE IF NOT EXISTS clientes (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    codigo VARCHAR(20) UNIQUE NOT NULL,
    razon_social VARCHAR(300) NOT NULL,
    ruc VARCHAR(11) UNIQUE NOT NULL,
    direccion TEXT,
    email VARCHAR(100),
    telefono VARCHAR(20),
    nivel_riesgo VARCHAR(10) DEFAULT 'Medio',
    limite_credito DECIMAL(12, 2) DEFAULT 0,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT check_nivel_riesgo CHECK (nivel_riesgo IN ('Bajo', 'Medio', 'Alto'))
);
-- 3. TABLA DE ENTIDADES FINANCIERAS
CREATE TABLE IF NOT EXISTS entidades_financieras (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    tipo VARCHAR(50),
    -- Banco, Financiera, etc.
    contacto VARCHAR(200),
    email VARCHAR(100),
    telefono VARCHAR(20),
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- 4. TABLA DE PEDIDOS
CREATE TABLE IF NOT EXISTS pedidos (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    numero VARCHAR(50) UNIQUE NOT NULL,
    fecha DATE NOT NULL,
    cliente_id CHAR(36) NOT NULL,
    vendedor_id CHAR(36) NOT NULL,
    subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0,
    igv DECIMAL(12, 2) NOT NULL DEFAULT 0,
    total DECIMAL(12, 2) NOT NULL DEFAULT 0,
    condicion_pago VARCHAR(20) DEFAULT 'Contado',
    dias_credito INTEGER DEFAULT 0,
    estado VARCHAR(20) DEFAULT 'Pendiente',
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_pedidos_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT,
    CONSTRAINT fk_pedidos_vendedor FOREIGN KEY (vendedor_id) REFERENCES vendedores(id) ON DELETE RESTRICT,
    CONSTRAINT check_pedidos_condicion CHECK (condicion_pago IN ('Contado', 'Credito')),
    CONSTRAINT check_pedidos_estado CHECK (estado IN ('Pendiente', 'Facturado', 'Anulado'))
);
-- 5. TABLA DE FACTURAS
CREATE TABLE IF NOT EXISTS facturas (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    numero VARCHAR(50) UNIQUE NOT NULL,
    serie VARCHAR(10) NOT NULL,
    fecha DATE NOT NULL,
    fecha_vencimiento DATE,
    pedido_id CHAR(36),
    cliente_id CHAR(36) NOT NULL,
    vendedor_id CHAR(36) NOT NULL,
    subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0,
    igv DECIMAL(12, 2) NOT NULL DEFAULT 0,
    total DECIMAL(12, 2) NOT NULL DEFAULT 0,
    saldo_pendiente DECIMAL(12, 2) NOT NULL DEFAULT 0,
    estado VARCHAR(20) DEFAULT 'Pendiente',
    condicion_pago VARCHAR(20) DEFAULT 'Contado',
    moneda VARCHAR(3) DEFAULT 'PEN',
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_facturas_pedido FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE RESTRICT,
    CONSTRAINT fk_facturas_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT,
    CONSTRAINT fk_facturas_vendedor FOREIGN KEY (vendedor_id) REFERENCES vendedores(id) ON DELETE RESTRICT,
    CONSTRAINT check_facturas_estado CHECK (
        estado IN ('Pendiente', 'Pagada', 'Vencida', 'Anulada')
    ),
    CONSTRAINT check_facturas_condicion CHECK (condicion_pago IN ('Contado', 'Credito'))
);
-- 6. TABLA DE LETRAS POR PAGAR (Bills of Exchange)
CREATE TABLE IF NOT EXISTS letras (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    numero_unico VARCHAR(50) UNIQUE NOT NULL,
    factura_id CHAR(36) NOT NULL,
    cliente_id CHAR(36) NOT NULL,
    entidad_financiera_id CHAR(36),
    importe DECIMAL(12, 2) NOT NULL,
    fecha_emision DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    fecha_aceptacion DATE,
    fecha_descuento DATE,
    fecha_pago DATE,
    estado VARCHAR(30) DEFAULT 'Generada',
    tasa_descuento DECIMAL(5, 2),
    monto_descuento DECIMAL(12, 2),
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_letras_factura FOREIGN KEY (factura_id) REFERENCES facturas(id) ON DELETE RESTRICT,
    CONSTRAINT fk_letras_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT,
    CONSTRAINT fk_letras_entidad FOREIGN KEY (entidad_financiera_id) REFERENCES entidades_financieras(id) ON DELETE
    SET NULL,
        CONSTRAINT check_letras_estado CHECK (
            estado IN (
                'Generada',
                'Enviada a Cliente',
                'Aceptada',
                'En Cartera',
                'En Cobranza',
                'Descontada',
                'Pagada',
                'Protestada'
            )
        )
);
-- 7. TABLA DE PLANILLAS DE LETRAS
CREATE TABLE IF NOT EXISTS planillas_letras (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    numero VARCHAR(50) UNIQUE NOT NULL,
    fecha_envio DATE NOT NULL,
    entidad_financiera_id CHAR(36) NOT NULL,
    total_letras INTEGER DEFAULT 0,
    importe_total DECIMAL(12, 2) DEFAULT 0,
    estado VARCHAR(20) DEFAULT 'Pendiente',
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_planillas_entidad FOREIGN KEY (entidad_financiera_id) REFERENCES entidades_financieras(id) ON DELETE RESTRICT,
    CONSTRAINT check_planillas_estado CHECK (
        estado IN ('Pendiente', 'Enviada', 'Recibida', 'Procesada')
    )
);
-- 8. TABLA DE DETALLE DE PLANILLAS (Relación muchos a muchos)
CREATE TABLE IF NOT EXISTS planillas_letras_detalle (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    planilla_id CHAR(36) NOT NULL,
    letra_id CHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(planilla_id, letra_id),
    CONSTRAINT fk_detalle_planilla FOREIGN KEY (planilla_id) REFERENCES planillas_letras(id) ON DELETE CASCADE,
    CONSTRAINT fk_detalle_letra FOREIGN KEY (letra_id) REFERENCES letras(id) ON DELETE CASCADE
);
-- 9. TABLA DE PAGOS
CREATE TABLE IF NOT EXISTS pagos (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    numero VARCHAR(50) UNIQUE NOT NULL,
    fecha DATE NOT NULL,
    cliente_id CHAR(36) NOT NULL,
    factura_id CHAR(36),
    letra_id CHAR(36),
    monto DECIMAL(12, 2) NOT NULL,
    metodo_pago VARCHAR(30) DEFAULT 'Transferencia',
    numero_operacion VARCHAR(100),
    banco VARCHAR(100),
    estado VARCHAR(20) DEFAULT 'Pendiente',
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_pagos_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT,
    CONSTRAINT fk_pagos_factura FOREIGN KEY (factura_id) REFERENCES facturas(id) ON DELETE RESTRICT,
    CONSTRAINT fk_pagos_letra FOREIGN KEY (letra_id) REFERENCES letras(id) ON DELETE RESTRICT,
    CONSTRAINT check_pagos_metodo CHECK (
        metodo_pago IN (
            'Efectivo',
            'Transferencia',
            'Cheque',
            'Letra',
            'Otro'
        )
    ),
    CONSTRAINT check_pagos_estado CHECK (
        estado IN (
            'Pendiente',
            'Confirmado',
            'Conciliado',
            'Anulado'
        )
    )
);
-- =====================================================
-- ÍNDICES PARA MEJORAR PERFORMANCE
-- =====================================================
CREATE INDEX idx_facturas_cliente ON facturas(cliente_id);
CREATE INDEX idx_facturas_fecha ON facturas(fecha);
CREATE INDEX idx_facturas_estado ON facturas(estado);
CREATE INDEX idx_letras_cliente ON letras(cliente_id);
CREATE INDEX idx_letras_factura ON letras(factura_id);
CREATE INDEX idx_letras_vencimiento ON letras(fecha_vencimiento);
CREATE INDEX idx_letras_estado ON letras(estado);
CREATE INDEX idx_pagos_cliente ON pagos(cliente_id);
CREATE INDEX idx_pagos_fecha ON pagos(fecha);
-- Nota: MySQL no requiere triggers para updated_at si se usa DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- Nota: MySQL no soporta RLS (Row Level Security) ni Policies de la misma forma que PostgreSQL/Supabase.