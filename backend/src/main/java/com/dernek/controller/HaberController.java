package com.dernek.controller;
 
import com.dernek.model.Haber;
import com.dernek.repository.HaberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;
 
import java.util.List;
import java.util.Optional;
 
 
@RestController
@RequestMapping("/api/haberler")
@CrossOrigin(origins = "http://localhost:5173")
public class HaberController {
 
    @Autowired
    private HaberRepository haberRepository;
 
    //Tüm haberleri getir
    @GetMapping
    public List<Haber> getHaberler() {
        return haberRepository.findAll();
    }

    @PostMapping
public ResponseEntity<Haber> yeniHaberEkle(@RequestBody Haber haber) {
    try {
        System.out.println("Gelen Haber Linki: " + haber.getLink()); 

        Haber kaydedilenHaber = haberRepository.save(haber);
        return ResponseEntity.ok(kaydedilenHaber);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

    // Belirli bir haberi getir
    @GetMapping("/{id}")
    public Haber getHaberById(@PathVariable Long id) {
        return haberRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Haber> updateHaber(@PathVariable Long id, @RequestBody Haber guncelHaber) {
        Optional<Haber> haberOpt = haberRepository.findById(id);
    
        if (haberOpt.isPresent()) {
            Haber haber = haberOpt.get();
            haber.setKonu(guncelHaber.getKonu());
            haber.setIcerik(guncelHaber.getIcerik());
            haber.setGecerlilikTarihi(guncelHaber.getGecerlilikTarihi());
            haber.setLink(guncelHaber.getLink());  

            haberRepository.save(haber);
            return ResponseEntity.ok(haber);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHaber(@PathVariable Long id) {
        if (!haberRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Hata: Silinmek istenen haber bulunamadı!");
        }
       
        try {
            haberRepository.deleteById(id);
            return ResponseEntity.ok("Haber başarıyla silindi.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Hata: Haber silinirken bir sorun oluştu! " + e.getMessage());
        }
    }
}