
package com.dernek.controller;

import com.dernek.model.Duyuru;
import com.dernek.repository.DuyuruRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.tika.Tika;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

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

    @PutMapping("/{id}")
public ResponseEntity<Duyuru> updateDuyuru(@PathVariable Long id, @RequestBody Duyuru guncelDuyuru) {
    Optional<Duyuru> duyuruOpt = duyuruRepository.findById(id);

    if (duyuruOpt.isPresent()) {
        Duyuru duyuru = duyuruOpt.get();
        duyuru.setBaslik(guncelDuyuru.getBaslik());
        duyuru.setIcerik(guncelDuyuru.getIcerik());
        duyuru.setGecerlilikTarihi(guncelDuyuru.getGecerlilikTarihi());
        duyuru.setResimUrl(guncelDuyuru.getResimUrl()); // Eğer güncellenmesi gerekiyorsa

        duyuruRepository.save(duyuru);
        return ResponseEntity.ok(duyuru);
    } else {
        return ResponseEntity.notFound().build();
    }
}

@DeleteMapping("/{id}")
public ResponseEntity<String> deleteDuyuru(@PathVariable Long id) {
    if (!duyuruRepository.existsById(id)) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Hata: Silinmek istenen duyuru bulunamadı!");
    }

    try {
        duyuruRepository.deleteById(id);
        return ResponseEntity.ok("Duyuru başarıyla silindi.");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Hata: Duyuru silinirken bir sorun oluştu! " + e.getMessage());
    }
}
    @PostMapping("/ekle")
    public ResponseEntity<?> yeniDuyuruEkle(@RequestBody Duyuru duyuru) {
        try {
            if (duyuru.getResimUrl() != null && !duyuru.getResimUrl().isEmpty()) {
                // Base64 verisini dosya sistemine kaydet
                byte[] imageBytes = Base64.getDecoder().decode(duyuru.getResimUrl());

                // Dosyanın MIME türünü belirle
                Tika tika = new Tika();
                String mimeType = tika.detect(imageBytes);
                String extension;

                switch (mimeType) {
                    case "image/jpeg":
                        extension = ".jpg";
                        break;
                    case "image/png":
                        extension = ".png";
                        break;
                    case "image/webp":
                        extension = ".webp";
                        break;
                    default:
                        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                            .body("{\"error\": \"Desteklenmeyen dosya türü: " + mimeType + "\"}");
                }

                // Benzersiz dosya adı oluştur
                String fileName = System.currentTimeMillis() + extension;
                String filePath = UPLOAD_DIR + fileName;

                // uploads klasörü yoksa oluştur
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                // Dosyayı kaydet
                try (OutputStream os = new FileOutputStream(filePath)) {
                    os.write(imageBytes);
                }

                // Duyuru nesnesine dosya yolunu kaydet
                duyuru.setResimUrl(filePath);
            }

            duyuruRepository.save(duyuru);
            return ResponseEntity.ok("{\"message\": \"Duyuru başarıyla eklendi\"}");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Duyuru eklenirken hata oluştu: " + e.getMessage() + "\"}");
        }
    }
}
