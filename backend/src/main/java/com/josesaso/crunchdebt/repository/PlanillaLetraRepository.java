package com.josesaso.crunchdebt.repository;

import com.josesaso.crunchdebt.model.PlanillaLetra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanillaLetraRepository extends JpaRepository<PlanillaLetra, String> {}
