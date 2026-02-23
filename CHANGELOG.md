# Changelog - Crunch Debt Project

## [1.0.0] - 2026-02-23

### Added
- **Backend Java:** Implementación inicial del servidor con Spring Boot 3.2.2.
- **Entidades JPA:** Creación de modelos para Vendedores, Clientes, Pedidos, Facturas, Letras y Pagos.
- **Repositorios:** Implementación de interfaces `JpaRepository` para todas las tablas.
- **Controladores:** API inicial para la gestión de Clientes.
- **MySQL Migration:** Nuevo script de base de datos compatible con MySQL 8.0 en `supabase/migrations/Modelado_de_Datos_Mysql.sql`.
- **Documentación:** Generación del informe de proyecto `EFRSIV_Proyecto_Cobranzas.md` basado en plantillas de Cibertec.
- **README:** Actualización completa con instrucciones de ejecución de Front y Back.

### Changed
- **Configuración de Datos:** Migración de tipos UUID de PostgreSQL a CHAR(36) en MySQL.
- **Diagramas:** Corrección de sintaxis Mermaid en la documentación para asegurar visualización correcta en editores de Markdown.

### Technical Notes
- El backend utiliza Java 17 por compatibilidad con Spring Boot 3.x.
- Se configuró el driver `com.mysql.cj.jdbc.Driver` en `application.properties`.
