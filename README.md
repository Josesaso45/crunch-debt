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

### Opción A (Recomendada): Con Docker 🐳
Esta opción arranca automáticamente la base de datos MySQL, el backend Java y el frontend React con las versiones correctas. Solo necesitas tener **Docker Desktop** instalado.

1.  Abre una terminal en la raíz del proyecto.
2.  Ejecuta el siguiente comando para construir y levantar todo:
    ```sh
    docker-compose up --build
    ```
3.  Acceso a los servicios:
    - **Frontend:** `http://localhost:8080`
    - **Backend (API):** `http://localhost:8081`
    - **Base de Datos:** `localhost:3307` (Usuario: root, Contraseña: root)

---

### Opción B: Ejecución Manual
#### 1. Requisitos Previos
- Node.js (v18+)
- Java JDK 17
- Servidor MySQL activo

#### 2. Configuración de la Base de Datos
1. Crea una base de datos llamada `crunch_debt` en tu servidor MySQL.
2. Ejecuta el script de modelado: `supabase/migrations/Modelado_de_Datos_Mysql.sql`.

#### 3. Ejecutar el Backend (Java)
Navega a la carpeta del backend y arranca el servicio:
```sh
cd backend
mvn spring-boot:run
```
*(Nota: Si no tienes Maven instalado, usa el IDE Eclipse/STS para ejecutarlo).*

#### 4. Ejecutar el Frontend (React)
Desde la raíz del proyecto:
```sh
npm install --legacy-peer-deps
npm run dev
```

---

## 📄 Documentación
Toda la documentación del proyecto, incluyendo el Proceso Unificado Ágil (AUP) y el Informe Final de Cibertec, se encuentra en la carpeta:
- `Documentacion_Proyecto/EFRSIV_Proyecto_Cobranzas.md`

## 📝 Historial de Cambios
Consulta el archivo [CHANGELOG.md](./CHANGELOG.md) para ver la evolución del proyecto.
