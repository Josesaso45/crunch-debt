package com.josesaso.crunchdebt.repository;

import com.josesaso.crunchdebt.model.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacturaRepository extends JpaRepository<Factura, String> {}
