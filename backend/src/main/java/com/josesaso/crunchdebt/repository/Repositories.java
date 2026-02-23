package com.josesaso.crunchdebt.repository;

import com.josesaso.crunchdebt.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendedorRepository extends JpaRepository<Vendedor, String> {}

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, String> {}

@Repository
public interface EntidadFinancieraRepository extends JpaRepository<EntidadFinanciera, String> {}

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, String> {}

@Repository
public interface FacturaRepository extends JpaRepository<Factura, String> {}

@Repository
public interface LetraRepository extends JpaRepository<Letra, String> {}

@Repository
public interface PlanillaLetraRepository extends JpaRepository<PlanillaLetra, String> {}

@Repository
public interface PlanillaLetraDetalleRepository extends JpaRepository<PlanillaLetraDetalle, String> {}

@Repository
public interface PagoRepository extends JpaRepository<Pago, String> {}
