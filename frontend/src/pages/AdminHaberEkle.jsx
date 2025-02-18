import { useState } from "react";
import { Link } from "react-router-dom";

function AdminHaberEkle() {
    const [konu, setKonu] = useState("");
    const [icerik, setIcerik] = useState("");
    const [gecerlilikTarihi, setGecerlilikTarihi] = useState("");
    const [link, setHaberLinki] = useState("");
    const [mesaj, setMesaj] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const yeniHaber = {
            konu,
            icerik,
            gecerlilikTarihi,
            link,
        };

        try {
            const response = await fetch("http://localhost:9090/api/haberler", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ konu, icerik, gecerlilikTarihi, link }), // Link de gönderiliyor
            });

            if (response.ok) {
                setMesaj(" Haber başarıyla eklendi!");
                setKonu("");
                setIcerik("");
                setGecerlilikTarihi("");
                setHaberLinki("");
            } else {
                setMesaj(" Haber eklenirken hata oluştu.");
            }
        } catch (error) {
            setMesaj(" Sunucu hatası: " + error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2> Yeni Haber Ekle</h2>
            {mesaj && <p className="alert alert-info">{mesaj}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Konu:</label>
                    <input type="text" className="form-control" value={konu} onChange={(e) => setKonu(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">İçerik:</label>
                    <textarea className="form-control" value={icerik} onChange={(e) => setIcerik(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Geçerlilik Tarihi:</label>
                    <input type="date" className="form-control" value={gecerlilikTarihi} onChange={(e) => setGecerlilikTarihi(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Haber Linki:</label>
                    <input type="text" className="form-control" value={link} onChange={(e) => setHaberLinki(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">
                    Haber Ekle
                </button>
            </form>
        </div>
    );
}

export default AdminHaberEkle;
