import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

function AdminDuyuruEkle() {
    const [baslik, setBaslik] = useState("");
    const [icerik, setIcerik] = useState("");
    const [gecerlilikTarihi, setGecerlilikTarihi] = useState(""); // Geçerlilik Tarihi Eklendi
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:9090/api/duyurular", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ baslik, icerik, gecerlilikTarihi }), // Tarih de gönderiliyor
        })
            .then((response) => response.json())
            .then(() => {
                navigate("/admin/duyurular");
            })
            .catch((error) => console.error("Ekleme hatası:", error));
    };

    return (
        <div className="container mt-3">
            <h2>Yeni Duyuru Ekle</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Başlık</Form.Label>
                    <Form.Control type="text" value={baslik} onChange={(e) => setBaslik(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>İçerik</Form.Label>
                    <Form.Control as="textarea" rows={3} value={icerik} onChange={(e) => setIcerik(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Geçerlilik Tarihi</Form.Label>
                    <Form.Control type="date" value={gecerlilikTarihi} onChange={(e) => setGecerlilikTarihi(e.target.value)} required />
                </Form.Group>

                <Button variant="success" type="submit">
                    Ekle
                </Button>
            </Form>
        </div>
    );
}

export default AdminDuyuruEkle;
