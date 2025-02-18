// package com.dernek.model;

// import jakarta.persistence.*;

// @Entity
// @Table(name = "duyurular") 
// public class Duyuru {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(nullable = false)
//     private String baslik; 
//     @Column(nullable = false)
//     private String icerik;

//     @Column(name = "gecerlilik_tarihi")
//     private String gecerlilikTarihi;

//     @Column(name = "resim_url") 
//     private String resimUrl; // Base64 veya Dosya Yolu

//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }

//     public String getBaslik() { return baslik; }
//     public void setBaslik(String baslik) { this.baslik = baslik; }

//     public String getIcerik() { return icerik; }
//     public void setIcerik(String icerik) { this.icerik = icerik; }

//     public String getGecerlilikTarihi() { return gecerlilikTarihi; }
//     public void setGecerlilikTarihi(String gecerlilikTarihi) { this.gecerlilikTarihi = gecerlilikTarihi; }

//     public String getResimUrl() { return resimUrl; }
//     public void setResimUrl(String resimUrl) { this.resimUrl = resimUrl; }
// }

package com.dernek.model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("DUYURU") // Veritabanında "ETKINLIK_TIPI" sütununda "DUYURU" yazacak
public class Duyuru extends Etkinlik {

    @Column(name = "resim_url")
    private String resimUrl;

    public String getResimUrl() {
        return resimUrl;
    }

    public void setResimUrl(String resimUrl) {
        this.resimUrl = resimUrl;
    }
}
