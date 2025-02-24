
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
