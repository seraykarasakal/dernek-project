package com.dernek.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.dernek.model.Etkinlik;

@Repository
public interface EtkinlikRepository extends JpaRepository<Etkinlik, Long> {
}
