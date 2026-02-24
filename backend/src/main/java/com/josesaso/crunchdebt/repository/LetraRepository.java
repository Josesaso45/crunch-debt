package com.josesaso.crunchdebt.repository;

import com.josesaso.crunchdebt.model.Letra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LetraRepository extends JpaRepository<Letra, String> {}
