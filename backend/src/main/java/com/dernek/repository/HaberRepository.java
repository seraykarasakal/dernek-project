package com.dernek.repository;
 
import com.dernek.model.Haber;
import org.springframework.data.jpa.repository.JpaRepository;
 
public interface HaberRepository extends JpaRepository<Haber, Long> {
}