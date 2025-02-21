
package com.dernek.controller;

import com.dernek.model.Duyuru;
import com.dernek.repository.DuyuruRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.tika.Tika;

import java.nio.file.Path;
import java.io.File;
import org.springframework.http.MediaType;
import org.springframework.core.io.Resource;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/duyurular")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})

public class DuyuruController {

    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private DuyuruRepository duyuruRepository;

    //Tüm duyuruları getir
     @GetMapping
     public List<Duyuru> getDuyurular() {
         return duyuruRepository.findAll();
    }
    @GetMapping("/{id}")
    public Duyuru getDuyuruById(@PathVariable Long id) {
        return duyuruRepository.findById(id).orElse(null);
    }
    @PutMapping("/{id}")
public ResponseEntity<Duyuru> updateDuyuru(@PathVariable Long id, @RequestBody Duyuru guncelDuyuru) {
    Optional<Duyuru> duyuruOpt = duyuruRepository.findById(id);

    if (duyuruOpt.isPresent()) {
        Duyuru duyuru = duyuruOpt.get();
        duyuru.setKonu(guncelDuyuru.getKonu());
        duyuru.setIcerik(guncelDuyuru.getIcerik());
        duyuru.setGecerlilikTarihi(guncelDuyuru.getGecerlilikTarihi());

        // Eğer yeni bir resim gelirse, eskiyi silip yenisini ekle
        if (guncelDuyuru.getResimUrl() != null && !guncelDuyuru.getResimUrl().isEmpty() 
            && !guncelDuyuru.getResimUrl().equals(duyuru.getResimUrl())) {

            // Eski dosyayı sil
            if (duyuru.getResimUrl() != null) {
                File eskiDosya = new File(duyuru.getResimUrl());
                if (eskiDosya.exists()) {
                    eskiDosya.delete();
                }
            }

            // Yeni resmi kaydet
            try {
                byte[] imageBytes = Base64.getDecoder().decode(guncelDuyuru.getResimUrl());
                String fileName = System.currentTimeMillis() + ".png";
                String filePath = "uploads/" + fileName;

                // uploads klasörü yoksa oluştur
                File uploadDir = new File("uploads/");
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                // Dosyayı kaydet
                try (OutputStream os = new FileOutputStream(filePath)) {
                    os.write(imageBytes);
                }

                duyuru.setResimUrl(filePath);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(null);
            }
        }

        duyuruRepository.save(duyuru);
        return ResponseEntity.ok(duyuru);
    } else {
        return ResponseEntity.notFound().build();
    }
}

    @GetMapping("/uploads/{fileName}")
    public ResponseEntity<Resource> getResim(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get("uploads/" + fileName);
            Resource resource = new UrlResource(filePath.toUri());
    
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                throw new RuntimeException("Dosya bulunamadı!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
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