# ESCUELA DE EDUCACIÓN SUPERIOR CIBERTEC

## FACULTAD DE TECNOLOGÍAS DE LA INFORMACIÓN

**Título del Proyecto:** CRUNCH DEBT - SISTEMA DE GESTIÓN DE COBRANZAS

**EXPERIENCIAS FORMATIVAS EN SITUACIONES REALES DE TRABAJO**

**GRUPO N° XX**

**INTEGRANTES:**

- MONTERO VILCAS JOSE GORGE
- FLORES SOTO JAIRO

**DOCENTE:**

- **ACCILIO CRUZ** CARLOS ISRAEL

**Lima, febrero de 2026**

---

## ÍNDICE

1. [Introducción](#introducción)
2. [CAPÍTULO 1. Diagnóstico del Problema](#capítulo-1-diagnóstico-del-problema)
   1.1. [Diagnóstico situacional](#11-diagnóstico-situacional)
   1.3. [Análisis SEPTE](#13-análisis-septe)
   1.4. [Justificación del Proyecto](#14-justificación-del-proyecto)
3. [CAPITULO 2. Descripción del Proyecto](#capítulo-2-descripción-del-proyecto)
   2.1. [Objetivos](#21-objetivos)
   2.2. [Alcance](#22-alcance)
   2.3. [Ventaja comparativa](#23-ventaja-comparativa)
   2.4. [Ubicación e institución responsable del proyecto](#24-ubicación-e-institución-responsable-del-proyecto)
   2.5. [Organización del Proyecto](#25-organización-del-proyecto)
   2.6. [Beneficiarios directos e indirectos](#26-beneficiarios-directos-e-indirectos)
4. [CAPÍTULO 3. Desarrollo del Proyecto](#capítulo-3-desarrollo-del-proyecto)
   3.1. [Cronograma de actividades](#31-cronograma-de-actividades)
   3.2. [Evaluación tecnológica](#32-evaluación-tecnológica)
5. [Conclusiones](#conclusiones)
6. [Recomendaciones](#recomendaciones)
7. [Bibliografía](#bibliografía)
8. [Anexos](#anexos)

---

## INTRODUCCIÓN

Este proyecto presenta el desarrollo de un Sistema de Gestión de Cobranzas denominado "Crunch Debt". El sistema busca optimizar el ciclo de venta y cobranza de la organización, integrando tecnologías modernas para mejorar la eficiencia operativa y reducir la morosidad. Se fundamenta en un análisis de procesos bajo el enfoque de Proceso Unificado Ágil (AUP) y modelado UML.

---

## CAPÍTULO 1. Diagnóstico del Problema

### 1.1. Diagnóstico situacional

Actualmente, la gestión de cobranzas enfrenta desafíos significativos debido a la falta de trazabilidad en tiempo real de las letras por pagar y la alta dependencia de procesos manuales para la conciliación de pagos. Esto genera errores en la información financiera y retrasos en la toma de decisiones estratégicas.

### 1.3. Análisis SEPTE

- **Socio-cultural:** Necesidad de las empresas de mantener relaciones de confianza con clientes mediante procesos de cobro transparentes.
- **Económico:** Impacto directo en la liquidez de la empresa al reducir el tiempo promedio de cobro.
- **Político-Legal:** Cumplimiento con las normativas locales de facturación electrónica y gestión de títulos valores (letras).
- **Tecnológico:** Uso de arquitecturas Java con Spring Boot y MySQL para garantizar escalabilidad y seguridad.
- **Ecológico:** Reducción del uso de papel mediante la digitalización de planillas y notificaciones electrónicas.

### 1.4. Justificación del Proyecto

La implementación de Crunch Debt se justifica por la necesidad de centralizar la visualización de KPIs de venta y cobranza, permitiendo una gestión proactiva que reduzca el riesgo crediticio y automatice la generación de documentos para entidades financieras.

---

## CAPÍTULO 2. Descripción del Proyecto

### 2.1. Objetivos

- **Objetivo 1 (Eficiencia):** Reducir el Tiempo Promedio de Cobro (TPC) de las facturas a crédito en un 15% para el cierre del segundo semestre de 2025.
- **Objetivo 2 (Control):** Alcanzar el 100% de trazabilidad en tiempo real del estado de todas las Letras por Pagar durante el Q4 de 2025.
- **Objetivo 3 (Automatización):** Disminuir en un 95% los errores manuales en la generación de la Planilla de Letras en los próximos 3 meses.

### 2.2. Alcance

El proyecto abarca desde el registro del pedido por parte del vendedor, la generación de la factura, la emisión y seguimiento de letras, hasta la conciliación final de pagos con entidades financieras.

### 2.3. Ventaja comparativa

Crunch Debt destaca por su integración nativa con procesos de Proceso Unificado Ágil, permitiendo una adaptación rápida a los cambios del negocio y una arquitectura desacoplada basada en microservicios Java.

### 2.4. Ubicación e institución responsable del proyecto

El proyecto se implementará en el área de Créditos y Cobranzas de la organización responsable, bajo la supervisión del equipo de TI.

### 2.5. Organización del Proyecto

- Jefe de Proyecto
- Analista Senior
- Analista Financiero
- Programadores

### 2.6. Beneficiarios directos e indirectos

- **Directos:** Analistas de créditos y cobranzas, facturadores y personal de ventas.
- **Indirectos:** Clientes (mejor servicio), Entidades Financieras (procesos estandarizados) y Gerencia General (mejores reportes).

---

## CAPÍTULO 3. Desarrollo del Proyecto

### 3.1. Cronograma de actividades

- Análisis de Requerimientos: Semanas 1-2
- Diseño de Base de Datos y Arquitectura: Semanas 3-4
- Desarrollo del Backend (Java/Spring Boot): Semanas 5-10
- Desarrollo del Frontend (React/Vite): Semanas 11-14
- Pruebas e Implantación: Semanas 15-16

### 3.2. Evaluación tecnológica

- **Backend:** Java 17, Spring Boot 3.2.2, Spring Data JPA, Hibernate.
- **Frontend:** HTML5, CSS3, JavaScript/TypeScript, TailwindCSS.
- **Base de Datos:** MySQL 8.0+.
- **Herramientas:** Maven, Git/GitHub, Docker.

---

## Conclusiones

1. El uso de Spring Boot y JPA permite un desarrollo acelerado y mantenible de la lógica de negocio compleja.
2. La automatización del ciclo de letras reduce drásticamente el error humano y la carga operativa.
3. El modelo de datos normalizado asegura la integridad de la información financiera a lo largo de todo el proceso.

## Recomendaciones

1. Se sugiere implementar un sistema de auditoría detallado para todos los movimientos financieros en fases posteriores.
2. Considerar la integración con pasarelas de pago automáticas para facilitar el recaudo directo.

---

## Bibliografía

- Cibertec (2026). Manual de Lenguaje de Programación II.
- Mike Keith (2018). Pro JPA 2 in Java EE 8.
- Auribox Training (2018). Creación de un proyecto Maven.

---

## Anexos

### Caso de Uso de Negocio: Gestionar Ciclo de Venta y Cobranza

- **Actores:** Cliente, Entidad Financiera.
- **Trabajadores de Negocio:** Vendedor, Facturador, Analista de Créditos y Cobranzas.
- **Entidades:** Pedido, Factura, Letra por Pagar, Planilla de Letras, Registro de Pago.
