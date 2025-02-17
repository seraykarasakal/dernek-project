import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function AdminDuyurular() {
    const [duyurular, setDuyurular] = useState([]);
    const [hata, setHata] = useState(null);
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [seciliDuyuru, setSeciliDuyuru] = useState(null);

    // Duyuruları Fetch Et
    useEffect(() => {
        fetch("http://localhost:9090/api/duyurular")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Bağlantı hatası");
                }
                return response.json();
            })
            .then((data) => setDuyurular(data))
            .catch((error) => setHata(error.message));
    }, []);

    // Güncelleme Modalını Aç
    const handleShow = (duyuru) => {
        setSeciliDuyuru(duyuru);
        setShow(true);
    };

    // Güncelleme Modalını Kapat
    const handleClose = () => {
        setShow(false);
        setSeciliDuyuru(null);
    };

    // Güncelleme İşlemi
    // const handleUpdate = (e) => {
    //     e.preventDefault();
    //     if (!seciliDuyuru) return;

    //     fetch(`http://localhost:9090/api/duyurular/${seciliDuyuru.id}`, {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(seciliDuyuru),
    //     })
    //         .then((response) => response.json())
    //         .then((updatedDuyuru) => {
    //             setDuyurular(duyurular.map((duyuru) => (duyuru.id === updatedDuyuru.id ? updatedDuyuru : duyuru)));
    //             handleClose();
    //         })
    //         .catch((error) => setHata(error.message));
    // };
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!seciliDuyuru) return;

        fetch(`http://localhost:9090/api/duyurular/${seciliDuyuru.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                baslik: seciliDuyuru.baslik,
                icerik: seciliDuyuru.icerik,
                gecerlilikTarihi: seciliDuyuru.gecerlilikTarihi,
                resimUrl: seciliDuyuru.resimUrl, // Eğer değiştirilmişse
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Hata: ${response.status}`);
                }
                return response.json();
            })
            .then((updatedDuyuru) => {
                setDuyurular(duyurular.map((duyuru) => (duyuru.id === updatedDuyuru.id ? updatedDuyuru : duyuru)));
                handleClose();
            })
            .catch((error) => setHata(`Güncelleme hatası: ${error.message}`));
    };

    // Silme Modalını Açma
    const handleShowDelete = (duyuru) => {
        setSeciliDuyuru(duyuru);
        setShowDelete(true);
    };

    // Silme Modalını Kapatma
    const handleCloseDelete = () => {
        setShowDelete(false);
        setSeciliDuyuru(null);
    };

    // Silme İşlemi
    const handleDelete = () => {
        if (!seciliDuyuru) return;

        fetch(`http://localhost:9090/api/duyurular/${seciliDuyuru.id}`, {
            method: "DELETE",
        })
            .then(() => {
                setDuyurular(duyurular.filter((duyuru) => duyuru.id !== seciliDuyuru.id));
                handleCloseDelete();
            })
            .catch((error) => setHata(error.message));
    };

    return (
        <div className="container mt-3">
            <h2>Duyurular</h2>
            {hata && <p style={{ color: "red" }}>Hata: {hata}</p>}
            <ul className="list-group">
                {duyurular.map((duyuru) => (
                    <li key={duyuru.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {duyuru.baslik} - {duyuru.icerik}
                        <div>
                            <Button variant="primary" onClick={() => handleShow(duyuru)}>
                                Güncelle
                            </Button>{" "}
                            <Button variant="danger" onClick={() => handleShowDelete(duyuru)}>
                                Sil
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Güncelleme Modalı */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Duyuru Güncelle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {seciliDuyuru && (
                        <Form onSubmit={handleUpdate}>
                            <Form.Group className="mb-3">
                                <Form.Label>Başlık</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={seciliDuyuru.baslik}
                                    onChange={(e) => setSeciliDuyuru({ ...seciliDuyuru, baslik: e.target.value })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>İçerik</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={seciliDuyuru.icerik}
                                    onChange={(e) => setSeciliDuyuru({ ...seciliDuyuru, icerik: e.target.value })}
                                    required
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
                    <Modal.Title>Duyuruyu Sil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bu duyuruyu silmek istediğinizden emin misiniz?</p>
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

export default AdminDuyurular;
