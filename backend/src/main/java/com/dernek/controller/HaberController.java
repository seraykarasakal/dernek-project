package com.dernek.controller;
 
import com.dernek.model.Haber;
import com.dernek.repository.HaberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;
 
@RestController
@RequestMapping("/api/haberler")
@CrossOrigin(origins = "*")
public class HaberController {
 
    @Autowired
    private HaberRepository haberRepository;
 
    
    @GetMapping
    public List<Haber> getHaberler() {
        return haberRepository.findAll();
    }
 
    
    @PostMapping
    public Haber yeniHaberEkle(@RequestBody Haber haber) {
        return haberRepository.save(haber);
    }
 

    @GetMapping("/{id}")
    public Haber getHaberById(@PathVariable Long id) {
        return haberRepository.findById(id).orElse(null);
    }
 
    @PutMapping("/{id}")
    public Haber updateHaber(@PathVariable Long id, @RequestBody Haber haberDetay) {
        Haber haber = haberRepository.findById(id).orElse(null);
        if (haber != null) {
            haber.setKonu(haberDetay.getKonu());
            haber.setIcerik(haberDetay.getIcerik());
            haber.setGecerlilikTarihi(haberDetay.getGecerlilikTarihi());
            return haberRepository.save(haber);
        }
        return null;
    }
 
    
    @DeleteMapping("/{id}")
    public void deleteHaber(@PathVariable Long id) {
        haberRepository.deleteById(id);
    }
}