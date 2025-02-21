import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Form, Button } from "react-bootstrap";

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
    const buttons = [
        { label: "Haberler", variant: "primary", link: "/admin/haberler" },
        { label: "Duyurular", variant: "success", link: "/admin/duyurular" },
    ];
    return (
        <>
            <Header title="Admin Panel" subTitle="Haber Ekle" buttons={buttons} />

            <div className="container mt-3">
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

                    <button type="submit" className="btn btn-primary">
                        Ekle
                    </button>
                </form>
            </div>
        </>
    );
    // return (
    //     <>
    //         <Header title="Admin Panel" subTitle="Haber Ekle" buttons={buttons} />
    //         <div className="container d-flex justify-content-center align-items-center">
    //             <div className=" shadow-lg" style={{ width: "100%", maxWidth: "600px", borderRadius: "15px", padding: "20px", border: "none" }}>
    //                 <h2 className="text-center mb-4" style={{ fontWeight: "700", color: "#333" }}>
    //                     Yeni Haber Ekle
    //                 </h2>
    //                 {mesaj && <p className="alert alert-info text-center">{mesaj}</p>}

    //                 <Form onSubmit={handleSubmit}>
    //                     <Form.Group className="mb-3">
    //                         <Form.Label style={{ fontWeight: "600" }}>Konu:</Form.Label>
    //                         <Form.Control
    //                             type="text"
    //                             value={konu}
    //                             onChange={(e) => setKonu(e.target.value)}
    //                             placeholder="Haber başlığını giriniz"
    //                             required
    //                             style={{ borderRadius: "10px" }}
    //                         />
    //                     </Form.Group>

    //                     <Form.Group className="mb-3">
    //                         <Form.Label style={{ fontWeight: "600" }}>İçerik:</Form.Label>
    //                         <Form.Control
    //                             as="textarea"
    //                             rows={4}
    //                             value={icerik}
    //                             onChange={(e) => setIcerik(e.target.value)}
    //                             placeholder="Haber içeriğini giriniz"
    //                             required
    //                             style={{ borderRadius: "10px", resize: "none" }}
    //                         />
    //                     </Form.Group>

    //                     <Form.Group className="mb-3">
    //                         <Form.Label style={{ fontWeight: "600" }}>Geçerlilik Tarihi:</Form.Label>
    //                         <Form.Control
    //                             type="date"
    //                             value={gecerlilikTarihi}
    //                             onChange={(e) => setGecerlilikTarihi(e.target.value)}
    //                             required
    //                             style={{ borderRadius: "10px" }}
    //                         />
    //                     </Form.Group>

    //                     <Button
    //                         type="submit"
    //                         variant="success"
    //                         className="w-100"
    //                         style={{
    //                             borderRadius: "30px",
    //                             fontWeight: "600",
    //                             padding: "10px 0",
    //                             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    //                         }}
    //                     >
    //                         <i className="bi bi-plus-circle"></i> Haber Ekle
    //                     </Button>
    //                 </Form>
    //             </div>
    //         </div>
    //     </>
    // );
}

export default AdminHaberEkle;
