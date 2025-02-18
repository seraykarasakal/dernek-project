package com.dernek.model;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE) // Tek tablo kullanacağız
@DiscriminatorColumn(name = "ETKINLIK_TIPI", discriminatorType = DiscriminatorType.STRING)
@Table(name = "etkinlikler") // Veriler "etkinlikler" tablosunda tutulacak
public abstract class Etkinlik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String konu;

    @Column(nullable = false)
    private String icerik;

    @Column(name = "gecerlilik_tarihi")
    private String gecerlilikTarihi;

    // Getter - Setter Metodları
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getKonu() { return konu; }
    public void setKonu(String konu) { this.konu = konu; }

    public String getIcerik() { return icerik; }
    public void setIcerik(String icerik) { this.icerik = icerik; }

    public String getGecerlilikTarihi() { return gecerlilikTarihi; }
    public void setGecerlilikTarihi(String gecerlilikTarihi) { this.gecerlilikTarihi = gecerlilikTarihi; }
}
