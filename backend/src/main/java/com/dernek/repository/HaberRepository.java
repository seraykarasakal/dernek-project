package com.dernek.repository;
 
import com.dernek.model.Haber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
public interface HaberRepository extends JpaRepository<Haber, Long> {
}