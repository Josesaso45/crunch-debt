package com.josesaso.crunchdebt.repository;

import com.josesaso.crunchdebt.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, String> {}
