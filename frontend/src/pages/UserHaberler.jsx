import { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import Header from "../components/Header";

function UserHaberler() {
    const [haberler, setHaberler] = useState([]);
    const [seciliHaber, setSeciliHaber] = useState(null);
    const [show, setShow] = useState(false);

    // Haberler için API'den verileri çek
    useEffect(() => {
        fetch("http://localhost:9090/api/haberler")
            .then((response) => response.json())
            .then((data) => setHaberler(data))
            .catch((error) => console.error("Haberler alınırken hata oluştu", error));
    }, []);

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
    const buttons = [{ label: "Duyurular", variant: "success", link: "/user/duyurular" }];
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
                                    <Button variant="primary" onClick={() => handleShow(haber)}>
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
