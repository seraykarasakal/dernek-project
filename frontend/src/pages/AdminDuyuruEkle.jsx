import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

function AdminDuyuruEkle() {
    const [konu, setKonu] = useState("");
    const [icerik, setIcerik] = useState("");
    const [gecerlilikTarihi, setGecerlilikTarihi] = useState("");
    const [resim, setResim] = useState(null);
    const navigate = useNavigate();

    // Resmi Base64 formatına çeviren fonksiyon
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]); // Base64 string al
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let base64Image = "";
        if (resim) {
            base64Image = await convertToBase64(resim);
        }

        const duyuruData = {
            konu: konu,
            icerik: icerik,
            gecerlilikTarihi: gecerlilikTarihi,
            resimUrl: base64Image, // Base64 formatında resim
        };

        try {
            const response = await fetch("http://localhost:9090/api/duyurular/ekle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(duyuruData),
            });

            if (!response.ok) {
                throw new Error("Duyuru eklenemedi.");
            }

            const data = await response.json();
            console.log("Başarı:", data);
            navigate("/admin/duyurular");
        } catch (error) {
            console.error("Ekleme hatası:", error);
        }
    };

    return (
        <div className="container mt-3">
            <h2>Yeni Duyuru Ekle</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Konu</Form.Label>
                    <Form.Control type="text" value={konu} onChange={(e) => setKonu(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>İçerik</Form.Label>
                    <Form.Control as="textarea" rows={3} value={icerik} onChange={(e) => setIcerik(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Geçerlilik Tarihi</Form.Label>
                    <Form.Control type="date" value={gecerlilikTarihi} onChange={(e) => setGecerlilikTarihi(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Resim Seç </Form.Label>
                    <Form.Control type="file" accept="image/jpeg, image/png, image/webp" onChange={(e) => setResim(e.target.files[0])} required />
                </Form.Group>
                <Button variant="success" type="submit">
                    Ekle
                </Button>
            </Form>
        </div>
    );
}

export default AdminDuyuruEkle;
