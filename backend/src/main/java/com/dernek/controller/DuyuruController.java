// package com.dernek.controller;

import com.dernek.model.Duyuru;
import com.dernek.repository.DuyuruRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/duyurular")
@CrossOrigin(origins = "http://localhost:5173")
public class DuyuruController {

    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private DuyuruRepository duyuruRepository;

    // Tüm duyuruları getir
    @GetMapping
    public List<Duyuru> getDuyurular() {
        return duyuruRepository.findAll();
    }

    // Yeni duyuru ekle (resimli)
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Duyuru> yeniDuyuruEkle(
            @RequestParam("baslik") String baslik,
            @RequestParam("icerik") String icerik,
            @RequestParam("gecerlilikTarihi") String gecerlilikTarihi,
            @RequestParam(value = "resim", required = false) MultipartFile resim) {

        String resimUrl = null;

        if (resim != null && !resim.isEmpty()) {
            try {
                String dosyaAdi = UUID.randomUUID().toString() + "_" + resim.getOriginalFilename();
                Path dosyaYolu = Paths.get(UPLOAD_DIR, dosyaAdi);
                Files.createDirectories(dosyaYolu.getParent());
                Files.write(dosyaYolu, resim.getBytes());
                resimUrl = "/api/duyurular/resimler/" + dosyaAdi; // URL olarak kaydediyoruz
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        Duyuru duyuru = new Duyuru();
        duyuru.setBaslik(baslik);
        duyuru.setIcerik(icerik);
        duyuru.setGecerlilikTarihi(gecerlilikTarihi);
        duyuru.setResimUrl(resimUrl);

        Duyuru kaydedilenDuyuru = duyuruRepository.save(duyuru);
        return ResponseEntity.ok(kaydedilenDuyuru);
    }

    // Belirli bir duyuruyu getir
    @GetMapping("/{id}")
    public ResponseEntity<Duyuru> getDuyuruById(@PathVariable Long id) {
        Optional<Duyuru> duyuru = duyuruRepository.findById(id);
        return duyuru.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Duyuru güncelle
    @PutMapping("/{id}")
    public ResponseEntity<Duyuru> updateDuyuru(@PathVariable Long id, @RequestBody Duyuru guncelDuyuru) {
        Optional<Duyuru> duyuruOpt = duyuruRepository.findById(id);

        if (duyuruOpt.isPresent()) {
            Duyuru duyuru = duyuruOpt.get();
            duyuru.setBaslik(guncelDuyuru.getBaslik());
            duyuru.setIcerik(guncelDuyuru.getIcerik());
            duyuru.setGecerlilikTarihi(guncelDuyuru.getGecerlilikTarihi());

            duyuruRepository.save(duyuru);
            return ResponseEntity.ok(duyuru);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Duyuru sil
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDuyuru(@PathVariable Long id) {
        if (duyuruRepository.existsById(id)) {
            duyuruRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Resmi GET ile almak için
    @GetMapping("/resimler/{dosyaAdi}")
    public ResponseEntity<byte[]> getResim(@PathVariable String dosyaAdi) {
        try {
            Path dosyaYolu = Paths.get(UPLOAD_DIR, dosyaAdi);
            byte[] resimBytes = Files.readAllBytes(dosyaYolu);
            return ResponseEntity.ok().body(resimBytes);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
