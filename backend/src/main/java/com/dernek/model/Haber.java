// package com.dernek.model;
 
// import jakarta.persistence.*;
 
// @Entity
// @Table(name = "haberler")
// public class Haber {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
 
//     @Column(nullable = false)
//     private String konu;
 
//     @Column(nullable = false)
//     private String icerik;
 
//     @Column(name = "gecerlilik_tarihi")
//     private String gecerlilikTarihi;
 
//     @Column(name = "haber_linki")  
//     private String link;

//     // Getter - Setter
//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }
 
//     public String getKonu() { return konu; }
//     public void setKonu(String konu) { this.konu = konu; }
 
//     public String getIcerik() { return icerik; }
//     public void setIcerik(String icerik) { this.icerik = icerik; }
 
//     public String getGecerlilikTarihi() { return gecerlilikTarihi; }
//     public void setGecerlilikTarihi(String gecerlilikTarihi) { this.gecerlilikTarihi = gecerlilikTarihi; }

//     public String getLink() { return link; }
//     public void setLink(String link) { this.link = link; }

// }

package com.dernek.model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("HABER") // Veritabanında "ETKINLIK_TIPI" sütununda "HABER" yazacak
public class Haber extends Etkinlik {

    @Column(name = "haber_linki")
    private String link;

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
