package com.josesaso.crunchdebt.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "planillas_letras")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlanillaLetra {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(length = 36, updatable = false, nullable = false)
    private String id;

    @Column(unique = true, nullable = false, length = 50)
    private String numero;

    @Column(name = "fecha_envio", nullable = false)
    private LocalDate fechaEnvio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "entidad_financiera_id", nullable = false)
    private EntidadFinanciera entidadFinanciera;

    @Column(name = "total_letras")
    private int totalLetras = 0;

    @Column(name = "importe_total", precision = 12, scale = 2)
    private BigDecimal importeTotal = BigDecimal.ZERO;

    @Column(length = 20)
    private String estado = "Pendiente";

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
