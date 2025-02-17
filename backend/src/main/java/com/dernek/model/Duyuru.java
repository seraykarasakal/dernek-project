package com.dernek.model;

import jakarta.persistence.*;

@Entity
@Table(name = "duyurular") // Duyurular için tablo adı
public class Duyuru {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String baslik; 

    @Column(nullable = false)
    private String icerik;

    @Column(name = "gecerlilik_tarihi")
    private String gecerlilikTarihi;

    @Column(name = "resim_url") 
    private String resimUrl;

    // Getter - Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBaslik() { return baslik; }
    public void setBaslik(String baslik) { this.baslik = baslik; }

    public String getIcerik() { return icerik; }
    public void setIcerik(String icerik) { this.icerik = icerik; }

    public String getGecerlilikTarihi() { return gecerlilikTarihi; }
    public void setGecerlilikTarihi(String gecerlilikTarihi) { this.gecerlilikTarihi = gecerlilikTarihi; }

    public String getResimUrl() { return resimUrl; }
    public void setResimUrl(String resimUrl) { this.resimUrl = resimUrl; }
}
