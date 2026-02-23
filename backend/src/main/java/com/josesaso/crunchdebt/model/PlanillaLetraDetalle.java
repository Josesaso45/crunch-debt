package com.josesaso.crunchdebt.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "planillas_letras_detalle", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"planilla_id", "letra_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlanillaLetraDetalle {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(length = 36, updatable = false, nullable = false)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "planilla_id", nullable = false)
    private PlanillaLetra planilla;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "letra_id", nullable = false)
    private Letra letra;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
