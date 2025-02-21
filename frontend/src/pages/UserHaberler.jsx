import { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";
function UserHaberler() {
    // Custom Hook'u kullanarak veriyi çekiyoruz
    const { data: haberler, loading, error } = useFetch("http://localhost:9090/api/haberler");
    const [seciliHaber, setSeciliHaber] = useState(null);
    const [show, setShow] = useState(false);

    // Modal Açma Fonksiyonu
    const handleShow = (haber) => {
        setSeciliHaber(haber);
        setShow(true);
    };

    // Modal Kapatma Fonksiyonu
    const handleClose = () => {
        setShow(false);
        setSeciliHaber(null);
    };

    // Header için butonlar
    const buttons = [{ label: "Duyurular", variant: "success", link: "/user/duyurular" }];

    // Eğer veri yükleniyorsa veya hata varsa gösterelim
    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>Hata: {error}</div>;
    console.log("Haberler:", haberler);
    console.log("Loading:", loading);
    console.log("Error:", error);

    return (
        <>
            <Header title="Haberler" buttons={buttons} />
            <div className="container mt-4">
                <div className="row">
                    {haberler.map((haber) => (
                        <div className="col-md-6 col-lg-4 mb-4" key={haber.id}>
                            <Card className="shadow-sm h-100" style={{ borderRadius: "10px" }}>
                                <Card.Body>
                                    <Card.Title>{haber.konu}</Card.Title>
                                    <Card.Text style={{ maxHeight: "100px", overflow: "hidden" }}>{haber.icerik}</Card.Text>
                                    <Card.Text className="text-muted">{haber.gecerlilikTarihi}</Card.Text>
                                    <Button variant="outline-primary" onClick={() => handleShow(haber)}>
                                        Detay
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Modal (Haber Detayı) */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{seciliHaber?.konu}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            <strong>İçerik:</strong> {seciliHaber?.icerik}
                        </p>
                        {seciliHaber?.gecerlilikTarihi && (
                            <p>
                                <strong>Geçerlilik Tarihi:</strong> {seciliHaber?.gecerlilikTarihi}
                            </p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Kapat
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default UserHaberler;
