-- =====================================================
-- DATA DE PRUEBA PARA CRUNCH DEBT
-- =====================================================
-- 1. INSERTAR VENDEDORES
INSERT INTO vendedores (id, codigo, nombre, email, telefono, activo)
VALUES (
        UUID(),
        'V001',
        'Juan Pérez',
        'juan.perez@crunchdebt.com',
        '987654321',
        true
    ),
    (
        UUID(),
        'V002',
        'Maria Garcia',
        'maria.garcia@crunchdebt.com',
        '912345678',
        true
    );
-- 2. INSERTAR CLIENTES (Necesitamos IDs fijos para las relaciones siguientes o usar subconsultas)
-- Para facilitar, insertaremos con IDs fijos para esta prueba
SET @cliente1_id = '88888888-4444-4444-4444-121212121212';
SET @cliente2_id = '99999999-5555-5555-5555-131313131313';
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
        @cliente1_id,
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
        @cliente2_id,
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
SET @banco_id = '77777777-3333-3333-3333-111111111111';
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
        @banco_id,
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
        UUID(),
        'F001-0000101',
        'F001',
        '2026-02-01',
        '2026-03-01',
        @cliente1_id,
        (
            SELECT id
            FROM vendedores
            WHERE codigo = 'V001'
            LIMIT 1
        ), 1000.00, 180.00, 1180.00, 1180.00, 'Pendiente', 'Credito'
    ), (
        UUID(), 'F001-0000102', 'F001', '2026-02-10', '2026-03-10', @cliente2_id, (
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
        UUID(),
        'L-2026-0001',
        (
            SELECT id
            FROM facturas
            WHERE numero = 'F001-0000101'
            LIMIT 1
        ), @cliente1_id, @banco_id, 1180.00, '2026-02-23', '2026-03-23', 'Generada'
    );