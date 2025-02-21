import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

function UserDashboard() {
    const [haberler, setHaberler] = useState([]);
    const [duyurular, setDuyurular] = useState([]);
    const [seciliEtkinlik, setSeciliEtkinlik] = useState(null);
    const [show, setShow] = useState(false);

    // Haberler ve Duyurular için API'den verileri çek
    useEffect(() => {
        fetch("http://localhost:9090/api/haberler")
            .then((response) => response.json())
            .then((data) => setHaberler(data))
            .catch((error) => console.error("Haberler alınırken hata oluştu", error));

        fetch("http://localhost:9090/api/duyurular")
            .then((response) => response.json())
            .then((data) => setDuyurular(data))
            .catch((error) => console.error("Duyurular alınırken hata oluştu", error));
    }, []);

    // Modal Açma Fonksiyonu
    const handleShow = (etkinlik) => {
        setSeciliEtkinlik(etkinlik);
        setShow(true);
    };

    // Modal Kapatma Fonksiyonu
    const handleClose = () => {
        setShow(false);
        setSeciliEtkinlik(null);
    };

    return (
        <div className="container mt-3">
            <h2>Haberler ve Duyurular</h2>

            {/* Haberler Listesi */}
            <h3>Haberler</h3>
            <ul className="list-group">
                {haberler.map((haber) => (
                    <li key={haber.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{haber.konu}</span>
                        <Button variant="info" onClick={() => handleShow(haber)}>
                            Detay
                        </Button>
                    </li>
                ))}
            </ul>

            {/* Duyurular Listesi */}
            <h3 className="mt-4">Duyurular</h3>
            <ul className="list-group">
                {duyurular.map((duyuru) => (
                    <li key={duyuru.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{duyuru.konu}</span>
                        <Button variant="info" onClick={() => handleShow(duyuru)}>
                            Detay
                        </Button>
                    </li>
                ))}
            </ul>

            {/* Modal (Haber veya Duyuru Detayı) */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{seciliEtkinlik?.konu}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <strong>İçerik:</strong> {seciliEtkinlik?.icerik}
                    </p>
                    {seciliEtkinlik?.gecerlilikTarihi && (
                        <p>
                            <strong>Geçerlilik Tarihi:</strong> {seciliEtkinlik?.gecerlilikTarihi}
                        </p>
                    )}

                    {seciliEtkinlik?.resimUrl && (
                        <p>
                            <img
                                src={`http://localhost:9090/api/duyurular/${seciliEtkinlik?.resimUrl}`}
                                alt="Duyuru Detayı"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
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
    );
}

export default UserDashboard;
