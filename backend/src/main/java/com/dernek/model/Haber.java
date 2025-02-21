

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
