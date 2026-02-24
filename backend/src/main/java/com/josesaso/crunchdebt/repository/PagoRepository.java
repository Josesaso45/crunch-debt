package com.josesaso.crunchdebt.repository;

import com.josesaso.crunchdebt.model.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PagoRepository extends JpaRepository<Pago, String> {}
