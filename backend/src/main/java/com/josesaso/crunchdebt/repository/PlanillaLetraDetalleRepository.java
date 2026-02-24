package com.josesaso.crunchdebt.repository;

import com.josesaso.crunchdebt.model.PlanillaLetraDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanillaLetraDetalleRepository extends JpaRepository<PlanillaLetraDetalle, String> {}
