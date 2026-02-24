-- =====================================================
-- DATA DE PRUEBA PARA CRUNCH DEBT (PostgreSQL)
-- =====================================================

-- 1. INSERTAR VENDEDORES
INSERT INTO vendedores (id, codigo, nombre, email, telefono, activo)
VALUES (
        gen_random_uuid(),
        'V001',
        'Juan Pérez',
        'juan.perez@crunchdebt.com',
        '987654321',
        true
    ),
    (
        gen_random_uuid(),
        'V002',
        'Maria Garcia',
        'maria.garcia@crunchdebt.com',
        '912345678',
        true
    );

-- 2. INSERTAR CLIENTES (Ids fijos para mantener relaciones)
INSERT INTO clientes (
        id,
        codigo,
        razon_social,
        ruc,
        direccion,
        email,
        telefono,
        nivel_riesgo,
        limite_credito,
        activo
    )
VALUES (
        '88888888-4444-4444-4444-121212121212',
        'C001',
        'Corporación Textil S.A.C.',
        '20123456789',
        'Av. Las Gardenias 123, Lima',
        'contacto@textil.com',
        '01-444-5555',
        'Bajo',
        50000.00,
        true
    ),
    (
        '99999999-5555-5555-5555-131313131313',
        'C002',
        'Inversiones Alianza E.I.R.L.',
        '10987654321',
        'Calle Los Álamos 456, Arequipa',
        'ventas@alianza.pe',
        '054-223344',
        'Medio',
        20000.00,
        true
    );

-- 3. INSERTAR ENTIDADES FINANCIERAS
INSERT INTO entidades_financieras (
        id,
        codigo,
        nombre,
        tipo,
        contacto,
        email,
        telefono,
        activo
    )
VALUES (
        '77777777-3333-3333-3333-111111111111',
        'BCP01',
        'Banco de Crédito del Perú',
        'Banco',
        'Carlos Alcántara',
        'cobranzas@bcp.com.pe',
        '01-311-9898',
        true
    );

-- 4. INSERTAR FACTURAS
INSERT INTO facturas (
        id,
        numero,
        serie,
        fecha,
        fecha_vencimiento,
        cliente_id,
        vendedor_id,
        subtotal,
        igv,
        total,
        saldo_pendiente,
        estado,
        condicion_pago
    )
VALUES (
        gen_random_uuid(),
        'F001-0000101',
        'F001',
        '2026-02-01',
        '2026-03-01',
        '88888888-4444-4444-4444-121212121212',
        (
            SELECT id
            FROM vendedores
            WHERE codigo = 'V001'
            LIMIT 1
        ), 1000.00, 180.00, 1180.00, 1180.00, 'Pendiente', 'Credito'
    ), (
        gen_random_uuid(), 'F001-0000102', 'F001', '2026-02-10', '2026-03-10', '99999999-5555-5555-5555-131313131313', (
            SELECT id
            FROM vendedores
            WHERE codigo = 'V002'
            LIMIT 1
        ), 500.00, 90.00, 590.00, 0.00, 'Pagada', 'Contado'
    );

-- 5. INSERTAR LETRAS
INSERT INTO letras (
        id,
        numero_unico,
        factura_id,
        cliente_id,
        entidad_financiera_id,
        importe,
        fecha_emision,
        fecha_vencimiento,
        estado
    )
VALUES (
        gen_random_uuid(),
        'L-2026-0001',
        (
            SELECT id
            FROM facturas
            WHERE numero = 'F001-0000101'
            LIMIT 1
        ), '88888888-4444-4444-4444-121212121212', '77777777-3333-3333-3333-111111111111', 1180.00, '2026-02-23', '2026-03-23', 'Generada'
    );
