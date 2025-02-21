import { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import Header from "../components/Header";

function UserDuyurular() {
    const [duyurular, setDuyurular] = useState([]);
    const [seciliDuyuru, setSeciliDuyuru] = useState(null);
    const [show, setShow] = useState(false);

    // Duyurular için API'den verileri çek
    useEffect(() => {
        fetch("http://localhost:9090/api/duyurular")
            .then((response) => response.json())
            .then((data) => setDuyurular(data))
            .catch((error) => console.error("Duyurular alınırken hata oluştu", error));
    }, []);

    // Modal Açma Fonksiyonu
    const handleShow = (duyuru) => {
        setSeciliDuyuru(duyuru);
        setShow(true);
    };

    // Modal Kapatma Fonksiyonu
    const handleClose = () => {
        setShow(false);
        setSeciliDuyuru(null);
    };
    const buttons = [{ label: "Haberler", variant: "primary", link: "/user/haberler" }];

    return (
        <>
            <Header title="Duyurular" buttons={buttons} />
            <div className="container mt-4">
                <div className="row">
                    {duyurular.map((duyuru) => (
                        <div className="col-md-6 col-lg-4 mb-4" key={duyuru.id}>
                            <Card className="shadow-sm h-100" style={{ borderRadius: "10px" }}>
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:9090/api/duyurular/uploads/${duyuru.resimUrl.split("/").pop()}`}
                                    alt="Duyuru Resmi"
                                    style={{
                                        height: "200px",
                                        objectFit: "cover",
                                        borderTopLeftRadius: "10px",
                                        borderTopRightRadius: "10px",
                                    }}
                                />
                                <Card.Body>
                                    <Card.Title>{duyuru.konu}</Card.Title>
                                    <Card.Text style={{ maxHeight: "100px", overflow: "hidden" }}>{duyuru.icerik}</Card.Text>
                                    <Card.Text className="text-muted">{duyuru.gecerlilikTarihi}</Card.Text>
                                    <Button variant="success" onClick={() => handleShow(duyuru)}>
                                        Detay
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Modal (Duyuru Detayı) */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{seciliDuyuru?.konu}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            <strong>İçerik:</strong> {seciliDuyuru?.icerik}
                        </p>
                        {seciliDuyuru?.gecerlilikTarihi && (
                            <p>
                                <strong>Geçerlilik Tarihi:</strong> {seciliDuyuru?.gecerlilikTarihi}
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

export default UserDuyurular;
