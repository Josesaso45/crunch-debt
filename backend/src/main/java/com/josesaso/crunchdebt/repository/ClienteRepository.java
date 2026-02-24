package com.josesaso.crunchdebt.repository;

import com.josesaso.crunchdebt.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, String> {}
