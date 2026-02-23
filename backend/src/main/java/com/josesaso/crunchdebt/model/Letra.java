package com.josesaso.crunchdebt.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "letras")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Letra {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(length = 36, updatable = false, nullable = false)
    private String id;

    @Column(name = "numero_unico", unique = true, nullable = false, length = 50)
    private String numeroUnico;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "factura_id", nullable = false)
    private Factura factura;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "entidad_financiera_id")
    private EntidadFinanciera entidadFinanciera;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal importe;

    @Column(name = "fecha_emision", nullable = false)
    private LocalDate fechaEmision;

    @Column(name = "fecha_vencimiento", nullable = false)
    private LocalDate fechaVencimiento;

    @Column(name = "fecha_aceptacion")
    private LocalDate fechaAceptacion;

    @Column(name = "fecha_descuento")
    private LocalDate fechaDescuento;

    @Column(name = "fecha_pago")
    private LocalDate fechaPago;

    @Column(length = 30)
    private String estado = "Generada";

    @Column(name = "tasa_descuento", precision = 5, scale = 2)
    private BigDecimal tasaDescuento;

    @Column(name = "monto_descuento", precision = 12, scale = 2)
    private BigDecimal montoDescuento;

    @Column(columnDefinition = "TEXT")
    private String observaciones;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
