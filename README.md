# Crunch Debt - Sistema de Gestión de Cobranzas

Sistema integral para la automatización del ciclo de ventas y cobranzas, diseñado para optimizar la trazabilidad de letras por pagar y mejorar la liquidez organizacional.

## 🚀 Tecnologías Utilizadas

### Frontend
- **Framework:** React con Vite
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS / shadcn/ui

### Backend
- **Framework:** Spring Boot 3.2.2
- **Lenguaje:** Java 17
- **Persistencia:** Spring Data JPA / Hibernate
- **Gestión de Dependencias:** Maven

### Base de Datos
- **Gestor:** MySQL 8.0+ / PostgreSQL (Supabase)
- **Modelado:** Scripts de migración en `supabase/migrations/`

---

## 🛠️ Cómo arrancar la aplicación

### 1. Requisitos Previos
- Node.js (v18+)
- Java JDK 17
- Maven (opcional, se puede usar el wrapper `./mvnw`)
- Servidor MySQL activo

### 2. Configuración de la Base de Datos
1. Crea una base de datos llamada `crunch_debt` en tu servidor MySQL.
2. Ejecuta el script de modelado: `supabase/migrations/Modelado_de_Datos_Mysql.sql`.

### 3. Ejecutar el Backend (Java)
Navega a la carpeta del backend y arranca el servicio:
```sh
cd backend
# En Windows
mvnw.cmd spring-boot:run
# En Linux/Mac
./mvnw spring-boot:run
```
El backend estará disponible por defecto en `http://localhost:8080` (configurado en `application.properties`).

### 4. Ejecutar el Frontend (React)
Desde la raíz del proyecto (donde se encuentra `package.json`):
```sh
# Instalar dependencias (solo la primera vez)
npm install

# Iniciar servidor de desarrollo
npm run dev
```
La aplicación web se abrirá usualmente en `http://localhost:5173`.

---

## 📄 Documentación
Toda la documentación del proyecto, incluyendo el Proceso Unificado Ágil (AUP) y el Informe Final de Cibertec, se encuentra en la carpeta:
- `Documentacion_Proyecto/EFRSIV_Proyecto_Cobranzas.md`

## 📝 Historial de Cambios
Consulta el archivo [CHANGELOG.md](./CHANGELOG.md) para ver la evolución del proyecto.
