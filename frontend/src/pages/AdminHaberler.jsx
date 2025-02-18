import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function AdminHaberler() {
    const [haberler, setHaberler] = useState([]);
    const [hata, setHata] = useState(null);
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [seciliHaber, setSeciliHaber] = useState(null);

    // Haberleri Fetch Et
    useEffect(() => {
        fetch("http://localhost:9090/api/haberler")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Bağlantı hatası");
                }
                return response.json();
            })
            .then((data) => setHaberler(data))
            .catch((error) => setHata(error.message));
    }, []);

    // Modal Açma Fonksiyonu (Güncelleme)
    const handleShow = (haber) => {
        setSeciliHaber(haber);
        setShow(true);
    };

    // Modal Kapatma Fonksiyonu (Güncelleme)
    const handleClose = () => {
        setShow(false);
        setSeciliHaber(null);
    };

    // Güncelleme İşlemi
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!seciliHaber) return;

        fetch(`http://localhost:9090/api/haberler/${seciliHaber.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(seciliHaber),
        })
            .then((response) => response.json())
            .then((updatedHaber) => {
                setHaberler(haberler.map((haber) => (haber.id === updatedHaber.id ? updatedHaber : haber)));
                handleClose();
            })
            .catch((error) => setHata(error.message));
    };

    // Silme Modalını Açma
    const handleShowDelete = (haber) => {
        setSeciliHaber(haber);
        setShowDelete(true);
    };

    // Silme Modalını Kapatma
    const handleCloseDelete = () => {
        setShowDelete(false);
        setSeciliHaber(null);
    };

    // Silme İşlemi
    const handleDelete = () => {
        if (!seciliHaber) return;

        fetch(`http://localhost:9090/api/haberler/${seciliHaber.id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Haber silinemedi.");
                }
                setHaberler(haberler.filter((haber) => haber.id !== seciliHaber.id));
                handleCloseDelete();
            })
            .catch((error) => setHata(error.message));
    };

    return (
        <div className="container mt-3">
            <h2>Haberler</h2>
            {hata && <p style={{ color: "red" }}>Hata: {hata}</p>}
            <ul className="list-group">
                {/* {haberler.map((haber) => (
                    <li key={haber.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {haber.konu} - {haber.icerik}
                        <div>
                            <Button variant="primary" onClick={() => handleShow(haber)}>
                                Güncelle
                            </Button>{" "}
                            <Button variant="danger" onClick={() => handleShowDelete(haber)}>
                                Sil
                            </Button>
                        </div>
                    </li>
                ))} */}
                {haberler.map((haber) => (
                    <li key={haber.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{haber.konu}</strong> -<strong>{haber.icerik}</strong> -<strong>{haber.gecerlilikTarihi}</strong> - {haber.link}
                            <br />
                            {haber.link && (
                                <div>
                                    <a href={haber.link} target="_blank" rel="noopener noreferrer">
                                        Haberi Oku
                                    </a>
                                </div>
                            )}
                        </div>
                        <div>
                            <Button variant="primary" onClick={() => handleShow(haber)}>
                                Güncelle
                            </Button>{" "}
                            <Button variant="danger" onClick={() => handleShowDelete(haber)}>
                                Sil
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Güncelleme Modalı */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Haber Güncelle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {seciliHaber && (
                        <Form onSubmit={handleUpdate}>
                            <Form.Group className="mb-3">
                                <Form.Label>Konu</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={seciliHaber.konu}
                                    onChange={(e) => setSeciliHaber({ ...seciliHaber, konu: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>İçerik</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={seciliHaber.icerik}
                                    onChange={(e) => setSeciliHaber({ ...seciliHaber, icerik: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Geçerlilik Tarihi</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={seciliHaber.gecerlilikTarihi}
                                    onChange={(e) =>
                                        setSeciliHaber({
                                            ...seciliHaber,
                                            gecerlilikTarihi: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Haber Linki</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={seciliHaber.link}
                                    onChange={(e) => setSeciliHaber({ ...seciliHaber, link: e.target.value })}
                                    placeholder="https://example.com/haber"
                                />
                            </Form.Group>
                            <Button variant="success" type="submit">
                                Güncelle
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>

            {/* Silme Onay Modalı */}
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Haberi Sil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bu haberi silmek istediğinizden emin misiniz?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        İptal
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Sil
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AdminHaberler;
